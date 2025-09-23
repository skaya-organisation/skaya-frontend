import { usePageData } from "rspress/runtime";
import { Mail, Phone, MessageSquare, Code, Briefcase } from "lucide-react";
import { JSX } from "react";
const iconMap: Record<string, JSX.Element> = {
  Mail: <Mail className="w-5 h-5 text-blue-600" />,
  Phone: <Phone className="w-5 h-5 text-green-600" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-teal-600" />,
  Code: <Code className="w-5 h-5 text-purple-600" />,
  Briefcase: <Briefcase className="w-5 h-5 text-gray-700" />,
};

export default function SupportPage() {
  const { page } = usePageData();
  const fm = page.frontmatter as any;

  const { title: pageTitle, supportOptions, resources, contactMethods } = fm;

  return (
    <div className="space-y-10">
      {/* Support Options */}
      {supportOptions?.items?.length > 0 && (
        <section className="space-y-6">
          {supportOptions.majorTitle && (
            <h2 className="text-2xl font-semibold mb-4">{supportOptions.majorTitle}</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportOptions.items.map((opt: any, i: number) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 shadow hover:shadow-md transition mt-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  {iconMap[opt.icon] || null}
                  <h3 className="text-xl font-bold">{opt.title}</h3>
                </div>
                <p className="text-gray-600">{opt.description}</p>
                <a
                  href={opt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                >
                  {opt.cta}
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Resources */}
      {resources?.items?.length > 0 && (
        <section className="space-y-6">
          {resources.majorTitle && (
            <h2 className="text-2xl font-semibold mb-4">{resources.majorTitle}</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.items.map((res: any, i: number) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 shadow hover:shadow-md transition mt-6"
              >
                <h3 className="text-lg font-bold">{res.title}</h3>
                <p className="text-gray-600">{res.description}</p>
                <a
                  href={res.link}
                  className="inline-block mt-3 px-4 py-2 rounded-lg bg-gray-700 text-white text-sm hover:bg-gray-800 transition"
                >
                  {res.cta}
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Methods */}
      {contactMethods?.items?.length > 0 && (
        <section className="space-y-6">
          {contactMethods.majorTitle && (
            <h2 className="text-2xl font-semibold mb-4">{contactMethods.majorTitle}</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.items.map((c: any, i: number) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 shadow hover:shadow-md transition mt-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  {iconMap[c.icon] || null}
                  <h3 className="text-lg font-bold">{c.title}</h3>
                </div>
                <p className="text-gray-600">{c.description}</p>
                <p className="text-sm text-gray-500">{c.contact}</p>
                <a
                  href={c.link}
                  className="inline-block mt-3 px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
