"use client";

import { useEffect } from "react";

export default function IubendaScript() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://embeds.iubenda.com/widgets/59f67d90-853d-4b23-97ed-2b6fcc3694ee.js";
        script.async = true;
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); };
    }, []);

    return null;
}
