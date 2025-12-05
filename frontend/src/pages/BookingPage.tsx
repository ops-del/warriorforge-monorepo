import CalendlyEmbed from "../components/common/CalendlyEmbed";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Book Your Strategy Session
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Let's discuss how AI automations can transform your business. Choose a time that works for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <svg className="h-12 w-12 text-brand.blue mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="font-semibold text-slate-900 mb-2">45-Minute Deep Dive</h3>
            <p className="text-sm text-slate-600">
              We analyze your funnel, KPIs, and automation opportunities
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <svg className="h-12 w-12 text-brand.purple mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="font-semibold text-slate-900 mb-2">Custom Blueprint</h3>
            <p className="text-sm text-slate-600">
              You'll receive a tailored automation roadmap within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <svg className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="font-semibold text-slate-900 mb-2">Fast Deployment</h3>
            <p className="text-sm text-slate-600">
              Go live in 24–72 hours once you approve the plan
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <CalendlyEmbed />
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-600">
            Questions before booking?{" "}
            <a href="mailto:ops@warriorforgeai.com" className="text-brand.blue hover:underline">
              Email us
            </a>{" "}
            or{" "}
            <a href="/contact" className="text-brand.blue hover:underline">
              send a message
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
