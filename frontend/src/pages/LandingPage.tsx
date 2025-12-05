import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Automation } from "../types/Automation";
import { formatCurrency } from "../types/Automation";

const steps = [
  {
    title: "Audit",
    description:
      "We map your funnel, KPIs, and hand-offs in a 45-minute strategy session.",
  },
  {
    title: "Blueprint",
    description:
      "You get a clear system design with prompts, guardrails, and integrations outlined.",
  },
  {
    title: "Build",
    description:
      "Our engineers implement, QA, and connect tooling across your stack in 24–72 hours.",
  },
  {
    title: "Hand-off",
    description:
      "We train your team, document SOPs, and monitor performance with optional maintenance.",
  },
];

const niches = [
  "Real Estate",
  "E-Commerce",
  "Local Service Brands",
  "Coaches & Programs",
  "Agencies",
  "Enterprise Teams",
];

const testimonials = [
  {
    quote: "WarriorForge installed our lead capture system in 48 hours. We're now converting 40% more inbound inquiries into booked calls.",
    author: "Sarah Chen",
    role: "VP Operations, Apex Realty",
  },
  {
    quote: "Luma handles our tier-1 support tickets like a veteran agent. Our team now focuses on complex issues while response times dropped from 6 hours to 3 minutes.",
    author: "Marcus Webb",
    role: "Head of CS, CloudScale SaaS",
  },
  {
    quote: "The appointment setter automation paid for itself in week one. We went from 12 calls/week to 47 without hiring a single SDR.",
    author: "Jennifer Torres",
    role: "Founder, Peak Performance Coaching",
  },
];

const faqs = [
  {
    q: "How fast can we go live?",
    a: "Most ready-to-deploy automations launch within 3 business days once assets and access are provided.",
  },
  {
    q: "What tools do you integrate with?",
    a: "We connect CRMs, help desks, calendars, VoIP, payment links, and more. Zapier/Make or custom APIs are supported.",
  },
  {
    q: "Do you customize the prompts and tone?",
    a: "Yes. We ingest your brand voice, offers, and objection handling so the agent sounds like your best rep.",
  },
  {
    q: "Is training included?",
    a: "Every deployment ships with bite-sized Loom trainings, SOPs, and live enablement for your team.",
  },
  {
    q: "Can we request something bespoke?",
    a: "Absolutely. Our custom automation track pairs you with a solutions architect to scope whatever you need.",
  },
];

export default function LandingPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => {
    api
      .getAutomations()
      .then(setAutomations)
      .catch((error) => console.error(error));
  }, []);

  const featured = useMemo(
    () => automations.filter((item) => item.isFeatured).slice(0, 3),
    [automations]
  );

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-white shadow-card">
        <div
          className="absolute inset-0 hero-gradient opacity-60"
          aria-hidden
        />
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">
              WarriorForge Automations
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Forge a 24/7 Revenue Machine — Installed in 72 Hours
            </h1>
            <p className="max-w-3xl text-lg text-slate-200 md:text-xl">
              AI systems that capture every lead, book qualified calls, and automate support — so your team focuses on closing deals, not chasing prospects.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Fast deployment (24–72h)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ROI-driven results</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-slate-900 sm:flex-row">
              <Link
                to="/demo/lead-capture"
                className="rounded-full bg-white px-8 py-4 text-center text-base font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition-colors"
              >
                Try Live Demo — Free
              </Link>
              <Link
                to="/automations"
                className="rounded-full border-2 border-white px-8 py-4 text-center text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Explore Automations
              </Link>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="hidden md:block">
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <img 
                src="/hero-forge.svg" 
                alt="AI Automation Forge" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div 
                className="hidden w-full h-full bg-gradient-to-br from-brand.purple via-brand.blue to-cyan-500 items-center justify-center"
                style={{ display: 'none' }}
              >
                <svg className="w-48 h-48 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA Section */}
      <section className="rounded-3xl bg-gradient-to-r from-brand.blue to-brand.purple p-8 text-white shadow-card flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="mb-6 text-lg max-w-xl text-center">
          Choose the automation package that fits your business. No hidden fees,
          no long-term contracts—just results. Book a call to get a custom quote
          or view our pricing options.
        </p>
        <div className="flex gap-4">
          <Link
            to="/pricing"
            className="rounded-full bg-white text-brand.blue px-6 py-3 font-semibold shadow-lg"
          >
            View Pricing
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-white px-6 py-3 font-semibold text-white"
          >
            Book a Call
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/80">
          Questions? Email{" "}
          <a href="mailto:ops@warriorforgeai.com" className="underline">
            ops@warriorforgeai.com
          </a>
        </p>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-brand.blue">
              Featured Systems
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Ready-to-deploy automations proven across industries
            </h2>
          </div>
          <Link
            to="/automations"
            className="text-sm font-semibold text-brand.blue"
          >
            View catalog →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((automation) => (
            <div key={automation.id} className="card-surface rounded-2xl p-6">
              <p className="text-sm font-semibold text-brand.purple">
                {automation.nicheTags.split(",").slice(0, 2).join(" · ")}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {automation.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {automation.shortDescription}
              </p>
              <div className="mt-4 text-lg font-semibold text-slate-900">
                {formatCurrency(automation.setupPrice)} setup
              </div>
              <p className="text-sm text-slate-500">
                {automation.monthlyPrice
                  ? `${formatCurrency(automation.monthlyPrice)} monthly`
                  : "One-time implementation"}
              </p>
              <Link
                to={`/automations/${automation.id}`}
                className="mt-6 inline-flex items-center text-sm font-semibold text-brand.blue"
              >
                View details →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl bg-white/90 p-8 shadow-card md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase text-brand.blue">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Done-with-you deployment
          </h2>
          <p className="mt-4 text-slate-600">
            We combine automation architects, prompt engineers, and full-stack
            devs to design systems that match your brand voice and sales
            process. All you do is approve.
          </p>
        </div>
        <div className="grid gap-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="text-xs font-semibold uppercase text-brand.blue">
                Step {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-3xl bg-slate-900 px-8 py-12 text-white shadow-card"
        id="success"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase text-slate-200">
              Who it’s for
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Built for revenue teams
            </h2>
            <p className="mt-4 text-slate-200">
              Whether you run a high-volume sales floor or a lean operations
              team, we plug AI into the exact touchpoints that move the needle:
              lead capture, follow-up, CS, reviews, and fulfillment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {niches.map((niche) => (
              <div
                key={niche}
                className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm font-semibold"
              >
                {niche}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="rounded-3xl bg-white p-8 shadow-card">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase text-brand.blue">Proven Results</p>
          <h2 className="text-3xl font-semibold text-slate-900">What Our Clients Say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-slate-700 italic mb-4">"{testimonial.quote}"</p>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">{testimonial.author}</p>
                <p className="text-sm text-slate-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase text-brand.blue">FAQ</p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Answers you need before you automate
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
            >
              <h3 className="text-lg font-semibold text-slate-900">{faq.q}</h3>
              <p className="text-sm text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Luma Section */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-brand.blue to-brand.purple p-8 text-white shadow-card">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase text-slate-200 mb-2">
            Forge Intelligence
          </p>
          <h2 className="text-3xl font-bold mb-4">
            Meet Luma — Your Battle AI
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-200">
            Luma is the AI brain behind WarriorForge Automations. She analyzes
            your niche, your offer, and your current bottlenecks — then forges a
            custom automation path built to capture more leads, book more calls,
            and eliminate repetitive tasks.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 mt-8">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
            <h3 className="text-xl font-bold mb-2">⚔️ Strategic</h3>
            <p className="text-sm text-slate-200">
              Luma maps your funnel, identifies bottlenecks, and designs the
              exact automation system you need — no guesswork.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
            <h3 className="text-xl font-bold mb-2">🔥 Relentless</h3>
            <p className="text-sm text-slate-200">
              She orchestrates every workflow: deciding who gets followed up,
              when they're contacted, and how they're moved toward a sale.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
            <h3 className="text-xl font-bold mb-2">🎯 Results-Driven</h3>
            <p className="text-sm text-slate-200">
              Inside every system we install, Luma is the intelligence ensuring
              leads don't fall through the cracks and revenue stays on track.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            to="/demo/lead-capture"
            className="inline-block rounded-full bg-white text-brand.blue px-6 py-3 font-semibold shadow-lg"
          >
            Talk to Luma in the Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
