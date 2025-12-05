import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">WarriorForge Automations</h3>
            <p className="text-sm text-slate-600 mb-4">
              AI systems that capture leads, book calls, and automate support — deployed in 24–72 hours.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure & SSL Protected</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/automations" className="hover:text-brand.blue">Automations</Link></li>
              <li><Link to="/pricing" className="hover:text-brand.blue">Pricing</Link></li>
              <li><Link to="/demo/lead-capture" className="hover:text-brand.blue">Live Demo</Link></li>
              <li><Link to="/contact" className="hover:text-brand.blue">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/privacy" className="hover:text-brand.blue">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand.blue">Terms of Service</Link></li>
              <li><span className="text-slate-400">GDPR Compliant</span></li>
              <li><span className="text-slate-400">CCPA Compliant</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="mailto:ops@warriorforgeai.com" className="hover:text-brand.blue">
                  ops@warriorforgeai.com
                </a>
              </li>
              <li>
                <a
                  href={import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/warriorforge/book"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand.blue"
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} WarriorForge Automations. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs">Built with ⚔️ by WarriorForge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
