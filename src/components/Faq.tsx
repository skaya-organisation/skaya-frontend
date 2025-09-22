import React from "react";

interface FaqItem {
  question: string;
  answer: string;
  tags?: string[];
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

interface FaqProps {
  sections: FaqSection[];
}

export const Faq: React.FC<FaqProps> = ({ sections }) => {
  return (
    <div className="">
      {sections.map((section, i) => (
        <div key={i} className="">
          <h2>{section.title}</h2>
          {section.items.map((item, idx) => (
            <div key={idx} className="faq-item">
              <h4>{item.question}</h4>
              <div dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
