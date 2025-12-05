import nodemailer from "nodemailer";
import { Automation, DemoLead, Order } from "@prisma/client";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendNewOrderEmail(order: Order, automation: Automation) {
  const subject = `New Automation Order: ${automation.name} - ${order.businessName}`;
  const segments = [
    `Automation: ${automation.name}`,
    `Business: ${order.businessName}`,
    `Contact: ${order.contactName}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Website: ${order.website ?? "n/a"}`,
    `Business Type: ${order.businessType}`,
    `Maintenance: ${order.wantsMaintenance ? "Yes" : "No"}`,
    `Submitted: ${new Date(order.createdAt).toLocaleString()}`,
    `Notes:\n${order.notes ?? "None"}`,
  ];

  await transporter.sendMail({
    to: env.ADMIN_EMAIL,
    from: env.SMTP_USER,
    subject,
    text: segments.join("\n"),
  });
}

export async function sendDemoLeadEmail(lead: DemoLead) {
  const subject = `New Demo Lead: ${lead.automationName} - ${
    lead.company ?? lead.name
  }`;
  const segments = [
    `Automation: ${lead.automationName} (${lead.automationSlug})`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone ?? "n/a"}`,
    `Company: ${lead.company ?? "n/a"}`,
    `Website: ${lead.website ?? "n/a"}`,
    `Notes:\n${lead.notes ?? "None"}`,
    `Submitted: ${new Date(lead.createdAt).toLocaleString()}`,
  ];

  // Send notification to admin
  await transporter.sendMail({
    to: env.ADMIN_EMAIL,
    from: env.SMTP_USER,
    subject,
    text: segments.join("\n"),
  });

  // Send auto-responder to lead
  await sendDemoLeadAutoResponder(lead);
}

export async function sendDemoLeadAutoResponder(lead: DemoLead) {
  const subject = `Thanks for trying ${lead.automationName} - WarriorForge Automations`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">WarriorForge Automations</h1>
      </div>
      
      <div style="padding: 30px; background: #f9fafb;">
        <h2 style="color: #1e293b;">Hi ${lead.name}! 👋</h2>
        
        <p style="color: #475569; line-height: 1.6;">
          Thanks for testing <strong>${lead.automationName}</strong>! We received your demo request and our team will review your submission shortly.
        </p>
        
        <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">What happens next?</h3>
          <ul style="color: #475569; line-height: 1.8;">
            <li>Our team will analyze your use case within 24 hours</li>
            <li>We'll send you a custom implementation plan</li>
            <li>If it's a good fit, we can deploy in 24–72 hours</li>
          </ul>
        </div>
        
        <p style="color: #475569; line-height: 1.6;">
          Want to explore more? Check out our other <a href="https://warriorforgeai.com/automations" style="color: #667eea; text-decoration: none;">AI automations</a> or <a href="https://calendly.com/warriorforge/book" style="color: #667eea; text-decoration: none;">book a strategy call</a>.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 14px; margin: 5px 0;">
            Questions? Reply to this email or reach us at <a href="mailto:ops@warriorforgeai.com" style="color: #667eea; text-decoration: none;">ops@warriorforgeai.com</a>
          </p>
        </div>
      </div>
      
      <div style="background: #1e293b; padding: 20px; text-align: center;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} WarriorForge Automations. All rights reserved.
        </p>
      </div>
    </div>
  `;

  const text = `
Hi ${lead.name}!

Thanks for testing ${lead.automationName}! We received your demo request and our team will review your submission shortly.

What happens next?
- Our team will analyze your use case within 24 hours
- We'll send you a custom implementation plan
- If it's a good fit, we can deploy in 24–72 hours

Want to explore more? Check out our other AI automations at https://warriorforgeai.com/automations or book a strategy call at https://calendly.com/warriorforge/book.

Questions? Reply to this email or reach us at ops@warriorforgeai.com

---
© ${new Date().getFullYear()} WarriorForge Automations. All rights reserved.
  `;

  await transporter.sendMail({
    to: lead.email,
    from: env.SMTP_USER,
    subject,
    html,
    text,
  });
}

