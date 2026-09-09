"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
        <SectionHeading
          index="02.2"
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          subtitle="Lo que más me preguntan antes de empezar"
        />

        <div>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 50}>
                <div className="border-t border-line last:border-b">
                  <button
                    className="group flex w-full items-center gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-mono text-xs text-primary">0{i + 1}</span>
                    <h3 className="flex-1 font-display text-lg font-medium tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                      {faq.question}
                    </h3>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-primary text-primary"
                          : "border-line-strong text-muted"
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
                      <p className="pb-6 pl-10 text-sm leading-relaxed text-muted sm:pl-12 md:text-base">
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