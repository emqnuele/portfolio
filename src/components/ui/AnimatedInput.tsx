"use client";

import {
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
    CSSProperties,
} from "react";

interface AnimatedInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
    required?: boolean;
    className?: string;
    padding?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    "aria-label"?: string;
}

interface CharUnit {
    id: number;
    char: string;
    intensity: number;
}

interface CaretRect {
    x: number;
    y: number;
    h: number;
}

// common-prefix / common-suffix diff. preserves ids for untouched chars so
// react doesn't remount them and css enter animations don't replay.
function reconcile(
    prev: CharUnit[],
    next: string,
    intensity: number,
    genId: () => number
): CharUnit[] {
    const prevLen = prev.length;
    const nextLen = next.length;

    let i = 0;
    while (i < prevLen && i < nextLen && prev[i].char === next[i]) i++;

    let j = 0;
    while (
        j < prevLen - i &&
        j < nextLen - i &&
        prev[prevLen - 1 - j].char === next[nextLen - 1 - j]
    ) j++;

    const before = prev.slice(0, i);
    const after = prev.slice(prevLen - j);
    const middle: CharUnit[] = [];
    for (let k = i; k < nextLen - j; k++) {
        middle.push({ id: genId(), char: next[k], intensity });
    }

    return [...before, ...middle, ...after];
}

// we use offsetLeft/offsetTop rather than getBoundingClientRect so that the
// char's entry transform (translateY) does NOT shift the measurement — layout
// position only, visual position is handled by transitions on the caret itself.
function computeCaretRect(
    overlay: HTMLElement,
    chars: CharUnit[],
    caretIndex: number
): CaretRect {
    const cs = getComputedStyle(overlay);
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padT = parseFloat(cs.paddingTop) || 0;
    const spans = overlay.querySelectorAll<HTMLElement>("[data-char]");

    if (spans.length === 0) {
        return { x: padL, y: padT, h: lh };
    }

    const idx = Math.max(0, Math.min(caretIndex, chars.length));

    if (idx === 0) {
        const first = spans[0];
        return { x: first.offsetLeft, y: first.offsetTop, h: first.offsetHeight || lh };
    }

    if (idx >= chars.length) {
        const last = spans[chars.length - 1];
        if (chars[chars.length - 1].char === "\n") {
            return {
                x: padL,
                y: last.offsetTop + (last.offsetHeight || lh),
                h: last.offsetHeight || lh,
            };
        }
        return {
            x: last.offsetLeft + last.offsetWidth,
            y: last.offsetTop,
            h: last.offsetHeight || lh,
        };
    }

    // caret sits immediately before a newline → place it at the right-edge of
    // the previous char, on that line, rather than at the newline's own box.
    if (chars[idx].char === "\n") {
        const prev = spans[idx - 1];
        if (chars[idx - 1].char === "\n") {
            return {
                x: padL,
                y: prev.offsetTop + (prev.offsetHeight || lh),
                h: prev.offsetHeight || lh,
            };
        }
        return {
            x: prev.offsetLeft + prev.offsetWidth,
            y: prev.offsetTop,
            h: prev.offsetHeight || lh,
        };
    }

    const target = spans[idx];
    return { x: target.offsetLeft, y: target.offsetTop, h: target.offsetHeight || lh };
}

export default function AnimatedInput({
    value,
    onChange,
    placeholder,
    multiline = false,
    rows = 4,
    type = "text",
    required,
    className,
    padding = "px-4 py-3.5",
    onFocus,
    onBlur,
    "aria-label": ariaLabel,
}: AnimatedInputProps) {
    const MAX_TEXTAREA_ROWS = 10;

    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const lastKeyTimeRef = useRef<number>(0);
    const typingPulseRef = useRef<number | null>(null);
    const rapidTimerRef = useRef<number | null>(null);
    const lastMeasureRef = useRef<number>(0);
    const prevLenRef = useRef<number>(0);
    // per-instance id counter. survives hmr since the ref stays with the
    // component fiber; a module-level counter resets on module reload and
    // collides with ids already held in state.
    const idCounterRef = useRef(0);
    const genId = useCallback(() => ++idCounterRef.current, []);

    const [chars, setChars] = useState<CharUnit[]>(() =>
        Array.from(value).map((c) => ({ id: ++idCounterRef.current, char: c, intensity: 0 }))
    );
    const [focused, setFocused] = useState(false);
    const [caretIndex, setCaretIndex] = useState(0);
    const [caretRect, setCaretRect] = useState<CaretRect>({ x: 0, y: 0, h: 0 });
    const [caretIdle, setCaretIdle] = useState(true);
    const [blinkOn, setBlinkOn] = useState(true);
    const [instantMove, setInstantMove] = useState(false);
    const prevCaretYRef = useRef<number>(0);

    useEffect(() => {
        setChars((prev) => {
            const prevStr = prev.map((c) => c.char).join("");
            if (prevStr === value) return prev;
            return reconcile(prev, value, 0, genId);
        });
    }, [value, genId]);

    const measureIntensity = useCallback(() => {
        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        const prev = lastKeyTimeRef.current;
        lastKeyTimeRef.current = now;
        if (prev === 0) return 0.45;
        const dt = now - prev;
        if (dt < 70) return 1;
        if (dt < 120) return 0.8;
        if (dt < 200) return 0.6;
        if (dt < 320) return 0.4;
        return 0.22;
    }, []);

    const pingTyping = useCallback(() => {
        setCaretIdle(false);
        if (typingPulseRef.current) window.clearTimeout(typingPulseRef.current);
        typingPulseRef.current = window.setTimeout(() => {
            setCaretIdle(true);
        }, 520);
    }, []);

    useEffect(() => {
        return () => {
            if (typingPulseRef.current) window.clearTimeout(typingPulseRef.current);
            if (rapidTimerRef.current) window.clearTimeout(rapidTimerRef.current);
        };
    }, []);

    // apple-style blink: solid while typing and briefly after, then regular
    // fade in/out at ~530ms intervals. the css transition on opacity gives the
    // smooth (not hard on/off) feel.
    useEffect(() => {
        if (!focused || !caretIdle) {
            setBlinkOn(true);
            return;
        }
        setBlinkOn(true);
        let visible = true;
        const id = window.setInterval(() => {
            visible = !visible;
            setBlinkOn(visible);
        }, 530);
        return () => window.clearInterval(id);
    }, [focused, caretIdle]);

    const handleChange = (next: string, caret: number) => {
        const intensity = measureIntensity();
        setChars((p) => reconcile(p, next, intensity, genId));
        setCaretIndex(caret);
        pingTyping();
        onChange(next);
    };

    const syncScroll = useCallback(() => {
        const ctrl = multiline ? textareaRef.current : inputRef.current;
        const ov = overlayRef.current;
        if (!ctrl || !ov) return;
        ov.scrollLeft = ctrl.scrollLeft;
        ov.scrollTop = ctrl.scrollTop;
    }, [multiline]);

    const updateCaret = useCallback(() => {
        const ctrl = multiline ? textareaRef.current : inputRef.current;
        if (!ctrl) return;
        const pos = ctrl.selectionStart ?? 0;
        setCaretIndex(pos);
        pingTyping();
    }, [multiline, pingTyping]);

    // catch selection changes that onSelect misses (ios safari, arrow-key cases).
    useEffect(() => {
        if (typeof document === "undefined") return;
        const handler = () => {
            const ctrl = multiline ? textareaRef.current : inputRef.current;
            if (!ctrl || document.activeElement !== ctrl) return;
            updateCaret();
        };
        document.addEventListener("selectionchange", handler);
        return () => document.removeEventListener("selectionchange", handler);
    }, [multiline, updateCaret]);

    useLayoutEffect(() => {
        syncScroll();
        const overlay = overlayRef.current;
        if (!overlay) return;
        const rect = computeCaretRect(overlay, chars, caretIndex);

        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        const dt = now - lastMeasureRef.current;
        lastMeasureRef.current = now;
        const rapid = dt > 0 && dt < 75;
        const shrinking = chars.length < prevLenRef.current;
        prevLenRef.current = chars.length;

        // snap instantly only when: (a) line change (diagonal slide looks wrong)
        // or (b) rapid shrink = hold-delete (cursor would otherwise trail far
        // behind the real caret, looking broken). forward typing always glides
        // smoothly — apple-style lag, not a teleport.
        const yJumped = Math.abs(rect.y - prevCaretYRef.current) > 2;

        if (yJumped || (rapid && shrinking)) {
            setInstantMove(true);
            if (rapidTimerRef.current) window.clearTimeout(rapidTimerRef.current);
            rapidTimerRef.current = window.setTimeout(() => {
                setInstantMove(false);
            }, 130);
        }

        prevCaretYRef.current = rect.y;
        setCaretRect(rect);
    }, [chars, caretIndex, syncScroll]);

    useLayoutEffect(() => {
        if (!multiline) return;

        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";

        const styles = window.getComputedStyle(textarea);
        const lineHeight = parseFloat(styles.lineHeight) || 20;
        const paddingTop = parseFloat(styles.paddingTop) || 0;
        const paddingBottom = parseFloat(styles.paddingBottom) || 0;
        const minHeight = rows * lineHeight + paddingTop + paddingBottom;
        const maxHeight =
            MAX_TEXTAREA_ROWS * lineHeight + paddingTop + paddingBottom;
        const targetHeight = Math.min(
            Math.max(textarea.scrollHeight, minHeight),
            maxHeight
        );

        textarea.style.height = `${targetHeight}px`;
        textarea.style.overflowY =
            textarea.scrollHeight > maxHeight ? "auto" : "hidden";

        syncScroll();
    }, [value, multiline, rows, syncScroll]);

    const focus = () => (multiline ? textareaRef : inputRef).current?.focus();

    const nativeClass = `ai-native relative z-10 block w-full bg-transparent outline-none resize-none font-[inherit] text-[inherit] leading-[inherit] ${padding}`;

    const overlayStyle: CSSProperties = multiline
        ? {
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              overflow: "hidden",
          }
        : { whiteSpace: "pre", overflow: "hidden" };

    const caretOn = focused && caretRect.h > 0 && blinkOn;

    return (
        <div
            className={`group/ai relative cursor-text overflow-hidden ${className ?? ""}`}
            onClick={focus}
        >
            <div
                ref={overlayRef}
                aria-hidden="true"
                className={`absolute inset-0 z-20 pointer-events-none select-none ${padding}`}
                style={{
                    ...overlayStyle,
                    scrollbarWidth: "none",
                }}
            >
                <span
                    className={`ai-caret${instantMove ? " ai-caret--instant" : ""}`}
                    style={
                        {
                            width: 2,
                            height: caretRect.h,
                            opacity: caretOn ? 1 : 0,
                            "--aic-x": `${caretRect.x}px`,
                            "--aic-y": `${caretRect.y}px`,
                        } as CSSProperties
                    }
                />

                {chars.length === 0 && placeholder ? (
                    <span className="text-zinc-600">{placeholder}</span>
                ) : (
                    chars.map((c) => {
                        const isWs = c.char === " " || c.char === "\n" || c.char === "\t";

                        if (isWs) {
                            // inherit white-space from parent so pre-wrap can
                            // hang the space at line-end instead of pushing it
                            // to the start of the next line.
                            return (
                                <span
                                    key={c.id}
                                    data-char
                                    className="ai-ws"
                                    style={{ display: "inline" }}
                                >
                                    {c.char}
                                </span>
                            );
                        }

                        const blurPx = (1.8 + c.intensity * 6.5).toFixed(2);
                        const yOff = (0.035 + c.intensity * 0.13).toFixed(3);
                        const dur = Math.round(460 + c.intensity * 320);

                        return (
                            <span
                                key={c.id}
                                data-char
                                className="ai-char"
                                style={
                                    {
                                        "--ai-blur": `${blurPx}px`,
                                        "--ai-yoff": `${yOff}em`,
                                        "--ai-dur": `${dur}ms`,
                                    } as CSSProperties
                                }
                            >
                                {c.char}
                            </span>
                        );
                    })
                )}
            </div>

            {multiline ? (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) =>
                        handleChange(e.target.value, e.target.selectionStart ?? 0)
                    }
                    onFocus={() => {
                        setFocused(true);
                        onFocus?.();
                        updateCaret();
                    }}
                    onBlur={() => {
                        setFocused(false);
                        onBlur?.();
                    }}
                    onScroll={syncScroll}
                    onKeyDown={pingTyping}
                    onKeyUp={updateCaret}
                    onSelect={updateCaret}
                    onMouseUp={updateCaret}
                    required={required}
                    rows={rows}
                    aria-label={ariaLabel}
                    className={`${nativeClass} ai-textarea-minimal-scroll`}
                    style={{
                        color: "transparent",
                        caretColor: "transparent",
                        WebkitTextFillColor: "transparent",
                    }}
                />
            ) : (
                <input
                    ref={inputRef}
                    // email/number/etc don't expose selectionStart per the html
                    // spec, so we render as text and re-add the semantics via
                    // inputMode / autoComplete / pattern.
                    type={type === "email" || type === "number" ? "text" : type}
                    inputMode={
                        type === "email"
                            ? "email"
                            : type === "number"
                            ? "numeric"
                            : undefined
                    }
                    autoComplete={type === "email" ? "email" : undefined}
                    pattern={
                        type === "email"
                            ? "[^@\\s]+@[^@\\s]+\\.[^@\\s]+"
                            : undefined
                    }
                    value={value}
                    onChange={(e) =>
                        handleChange(e.target.value, e.target.selectionStart ?? 0)
                    }
                    onFocus={() => {
                        setFocused(true);
                        onFocus?.();
                        updateCaret();
                    }}
                    onBlur={() => {
                        setFocused(false);
                        onBlur?.();
                    }}
                    onScroll={syncScroll}
                    onKeyDown={pingTyping}
                    onKeyUp={updateCaret}
                    onSelect={updateCaret}
                    onMouseUp={updateCaret}
                    required={required}
                    aria-label={ariaLabel}
                    className={nativeClass}
                    style={{
                        color: "transparent",
                        caretColor: "transparent",
                        WebkitTextFillColor: "transparent",
                    }}
                />
            )}
        </div>
    );
}
