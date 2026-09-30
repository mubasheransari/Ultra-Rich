"use client";

import { useState } from "react";

type Job = {
  title: string;
  qualifications: string[];
  skills: string[];
  responsibilities: string[];
  requirements?: string[];
  employmentType?: string;
  deadline?: string;
};

const JOBS: Job[] = [
  {
    title: "Social Media Executive - Karachi",
    qualifications: [
      "Bachelor's degree in Marketing, Media Sciences, Communications, Business Administration, or a related field.",
      "1-2 years of experience in social media management, community management, or customer engagement.",
    ],
    skills: [
      "Excellent written and verbal communication skills in English.",
      "Strong understanding of social media platforms and community management best practices.",
      "Experience managing customer interactions and online comments.",
      "Proficiency in content scheduling and publishing across Instagram, Facebook, TikTok, LinkedIn, and YouTube.",
      "Ability to create reels, short form videos, and engaging social media content.",
      "Basic working knowledge of Canva, Photoshop, design tools.",
      "Strong photography and videography skills.",
      "Strong awareness of digital trends and platform updates.",
    ],
    responsibilities: [
      "Manage Mezan Tea's social media communities.",
      "Respond to comments, messages, reviews, and customer queries in a timely manner.",
      "Monitor conversations, trends, and consumer sentiment.",
      "Plan and execute engagement campaigns and interactive activities.",
      "Coordinate with internal teams to address customer feedback and support campaign execution.",
      "Track community performance and provide actionable insights.",
      "Manage online reputation and escalate critical issues when required.",
    ],
    employmentType: "Permanent",
    deadline: "June 25, 2026",
  },
  {
    title: "Commercial Finance Lead - Karachi",
    qualifications: [],
    responsibilities: [
      "Assist CFO in developing and executing Commercial Strategy",
      "Manage pricing & margins",
      "Develop and manage distributors' commercials and ROI",
      "Assess and monitor trade spend & ROI",
      "Manage and monitor commercial credit",
      "Assist in budgeting and forecasting",
      "Develop Business Analytics and Dashboards",
      "Work closely with cross-functional teams",
    ],
    requirements: [
      "CA part qualified, ACCA, or ICMA qualified",
      "3-5 years of relevant experience",
      "Strong commercial acumen, communication and negotiation skills with good analytical bent of mind and strategic thinking",
    ],
    skills: [],
    deadline: "20 July 2026",
  },
  {
    title: "Tax and Compliance Lead - Karachi",
    qualifications: [],
    responsibilities: [
      "Manage direct & indirect tax compliance",
      "Lead tax planning & risk management",
      "Manage tax audits & regulatory liaison",
      "Ensure proper deduction of withholding tax and monitor statutory compliance",
      "Manage tax refunds, exemptions & tax credits",
      "Develop tax policies, SOPs & internal controls",
      "Lead tax process automation",
    ],
    requirements: [
      "CA Part Qualified, ACCA or ICMA",
      "5-8 years of relevant tax experience, preferably with a reputable taxation firm",
      "Independently represented before tax authorities",
      "Strong analytical, problem-solving, negotiation and communication skills",
    ],
    skills: [],
    deadline: "20 July 2026",
  },
];

export default function CareerAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-8 divide-y divide-white/25 border-y border-white/25 text-left">
      {JOBS.map((job, i) => (
        <div key={job.title}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-4 text-left font-display text-lg font-semibold not-italic"
          >
            {job.title}
            <span
              className={`text-sm transition-transform ${open === i ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>

          {open === i && (
            <div className="animate-fade-in space-y-5 pb-6 text-sm leading-relaxed text-white/90">
              {job.qualifications.length > 0 && (
                <div>
                  <p className="font-semibold not-italic">Qualifications</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {job.qualifications.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.skills.length > 0 && (
                <div>
                  <p className="font-semibold not-italic">Knowledge and Skills</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {job.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="font-semibold not-italic">Key Responsibilities</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {job.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <p className="font-semibold not-italic">Requirements</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {job.requirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.employmentType && (
                <p>
                  <span className="font-semibold not-italic">Employment Type:</span>{" "}
                  {job.employmentType}
                </p>
              )}
              {job.deadline && (
                <p>
                  <span className="font-semibold not-italic">Deadline:</span>{" "}
                  {job.deadline}
                </p>
              )}
              <p className="border-t border-white/15 pt-4 text-white/80">
                Interested candidates can send their CV to{" "}
                <a
                  href="mailto:teacareers@mezangrp.com"
                  className="font-semibold text-brand-gold underline underline-offset-2"
                >
                  teacareers@mezangrp.com
                </a>{" "}
                and mention the position in the subject line of the email.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
