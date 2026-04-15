import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
        from: "Portfolio Contact <contact@emqnuele.dev>",
        to: "hey@emanuelefaraci.com",
        replyTo: email,
        subject: `New message from ${name}`,
        html: `
            <div style="font-family: monospace; background: #0a0a0a; color: #ededed; padding: 32px; border-radius: 12px; max-width: 600px;">
                <p style="color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 24px;">Portfolio Contact Form</p>
                <h2 style="color: #ffffff; font-size: 22px; margin: 0 0 8px;">${name}</h2>
                <p style="color: #52525b; font-size: 13px; margin: 0 0 32px;">${email}</p>
                <hr style="border: none; border-top: 1px solid #27272a; margin: 0 0 32px;" />
                <p style="color: #d4d4d8; font-size: 15px; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
                <hr style="border: none; border-top: 1px solid #27272a; margin: 32px 0 16px;" />
                <p style="color: #3f3f46; font-size: 11px; margin: 0;">Sent via emqnuele.dev contact form</p>
            </div>
        `,
    });

    if (error) {
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
