import { usePageData } from "rspress/runtime";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const { page } = usePageData();
  const fm = page.frontmatter as any;

  const { hero, faqSections } = fm;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {hero && (
        <section className="text-center space-y-4">
          {hero.name && (
            <h1 className="text-3xl md:text-4xl font-bold">{hero.name}</h1>
          )}
          {hero.text && (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {hero.text}
            </p>
          )}
          {hero.tagline && (
            <p className="text-sm text-gray-500">{hero.tagline}</p>
          )}
        </section>
      )}

      {/* FAQ Sections */}
      {faqSections?.length > 0 &&
        faqSections.map((section: any, i: number) => (
          <FAQSection key={i} title={section.title} items={section.items} />
        ))}
    </div>
  );
}

function FAQSection({
  title,
  items,
}: {
  title: string;
  items: { question: string; answer: string; tags?: string[] }[];
}) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="space-y-4">
        {items.map((faq, i) => (
          <FAQItem key={i} {...faq} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  tags,
}: {
  question: string;
  answer: string;
  tags?: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 transition hover:shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-lg font-medium">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {open && (
        <div className="mt-3 text-gray-700 dark:text-gray-300 text-sm faq-answer">
          <div dangerouslySetInnerHTML={{ __html: answer }} />
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
