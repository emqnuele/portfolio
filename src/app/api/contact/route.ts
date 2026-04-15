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
        text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
