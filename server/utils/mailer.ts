import nodemailer, { type Transporter } from "nodemailer";

import env from "~/lib/env";

let sharedTransporter: Transporter | null = null;

function getFromAddress(): string {
  const name = env.SMTP_FROM_NAME?.trim();
  const email = env.SMTP_FROM_EMAIL?.trim();
  if (name && email)
    return `${name} <${email}>`;
  if (email)
    return email;
  return `${env.SMTP_USER}`;
}

export function getTransporter(): Transporter {
  if (sharedTransporter)
    return sharedTransporter;

  const port = Number.parseInt(env.SMTP_PORT, 10);
  const secure = env.SMTP_SECURE.toLowerCase() === "true";

  sharedTransporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });

  return sharedTransporter;
}

export async function sendMail(options: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}) {
  const transporter = getTransporter();
  const from = options.from ?? getFromAddress();

  const info = await transporter.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  // For Ethereal preview URL
  const previewUrl = (nodemailer as any).getTestMessageUrl?.(info) as
    | string
    | false
    | undefined;

  return { info, previewUrl } as const;
}
