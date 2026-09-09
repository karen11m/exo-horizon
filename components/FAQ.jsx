"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          subtitle="Resuelve tus dudas antes de dar el primer paso"
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 60}>
                <div
                  className={`glass overflow-hidden rounded-2xl transition-colors ${
                    isOpen ? "border-primary/50" : ""
                  }`}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <h3 className="font-display text-base font-bold md:text-lg">
                      {faq.question}
                    </h3>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-lg transition-transform duration-300 ${
                        isOpen ? "rotate-45 border-primary text-primary" : "text-muted"
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}