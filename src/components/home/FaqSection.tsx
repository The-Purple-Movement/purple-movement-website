import { faqs } from "@/content/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "./FaqAccordion";
import { QuestionForm } from "./QuestionForm";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-pm-surface-alt py-16 sm:py-24">
      <div className="pm-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions people ask before joining" />
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={faqs} />
          <div id="ask" className="mt-12">
            <h3 className="sr-only">Ask a question</h3>
            <QuestionForm />
          </div>
        </div>
      </div>
    </section>
  );
}
