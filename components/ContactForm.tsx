"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-black">Full Name</span>
          <input required name="name" type="text" autoComplete="name" placeholder="Your name" className="contact-input" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-black">Email Address</span>
          <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className="contact-input" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-black">Phone Number</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+92 ..." className="contact-input" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-black">Subject</span>
          <input required name="subject" type="text" placeholder="How can we help?" className="contact-input" />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-brand-black">Message</span>
        <textarea required name="message" rows={6} placeholder="Write your message here..." className="contact-input resize-y" />
      </label>

      <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-red px-8 text-base font-semibold text-white transition hover:bg-brand-red-dark focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2">
        Send Message
      </button>

      {submitted && (
        <p role="status" className="rounded-xl border border-green-700/20 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Thank you. Your message has been received.
        </p>
      )}
    </form>
  );
}
