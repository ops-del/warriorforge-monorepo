import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { label: "Solutions", to: "/automations" },
  { label: "Order", to: "/automations" },
  { label: "Stories", to: "/#success" },
  { label: "Contact", to: "/contact" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition hover:text-brand.purple ${
    isActive ? "text-brand.purple" : "text-slate-600"
  }`;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-brand.slate"
        >
          AI Automation Agency
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/automations"
            className="rounded-full border border-brand.blue/30 px-4 py-2 text-sm font-semibold text-brand.blue hover:bg-brand.blue/10 transition"
          >
            Browse Automations
          </Link>
          <a
            href={
              import.meta.env.VITE_CALENDLY_URL ??
              "https://calendly.com/warriorforge/book"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand.purple px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand.purple/30 hover:bg-purple-600 transition"
          >
            Book a Call
          </a>
          <Link
            to="/admin/login"
            className="rounded-full bg-brand.blue px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand.blue/30 hover:bg-blue-600 transition"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-brand.purple"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/30 bg-white/95 backdrop-blur">
          <nav className="flex flex-col px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                to="/automations"
                className="block text-center rounded-full border border-brand.blue/30 px-4 py-2 text-sm font-semibold text-brand.blue hover:bg-brand.blue/10 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Automations
              </Link>
              <a
                href={
                  import.meta.env.VITE_CALENDLY_URL ??
                  "https://calendly.com/warriorforge/book"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center rounded-full bg-brand.purple px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Call
              </a>
              <Link
                to="/admin/login"
                className="block text-center rounded-full bg-brand.blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
