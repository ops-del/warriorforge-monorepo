export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
      
      <div className="space-y-6 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">1. Information We Collect</h2>
          <p>
            WarriorForge Automations ("we," "our," or "us") collects information you provide directly when you:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Fill out demo forms or contact forms</li>
            <li>Place an order for automation services</li>
            <li>Create an admin account</li>
            <li>Communicate with us via email or phone</li>
          </ul>
          <p className="mt-4">
            Information collected may include: name, email address, phone number, company name, website URL, business type, and any additional notes or context you provide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Provide, maintain, and improve our automation services</li>
            <li>Process your orders and communicate with you about your project</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Analyze usage trends to improve user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information only:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>With service providers who assist in our operations (e.g., email delivery, hosting)</li>
            <li>When required by law or to protect our rights</li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">5. Cookies and Tracking</h2>
          <p>
            Our website may use cookies and similar tracking technologies to enhance user experience and analyze traffic. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. To exercise these rights, contact us at ops@warriorforgeai.com.
          </p>
          <p className="mt-4">
            <strong>GDPR Compliance:</strong> If you are located in the European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR), including the right to data portability and the right to lodge a complaint with a supervisory authority.
          </p>
          <p className="mt-4">
            <strong>CCPA Compliance:</strong> If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and the right to opt out of the sale of your personal information (note: we do not sell personal information).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> <a href="mailto:ops@warriorforgeai.com" className="text-brand.blue underline">ops@warriorforgeai.com</a>
          </p>
        </section>

        <p className="mt-8 text-sm text-slate-500">
          <strong>Last Updated:</strong> December 4, 2025
        </p>
      </div>
    </div>
  );
}
