import { usePageData } from "rspress/runtime";
import { Mail, Phone, MessageSquare, Code, Briefcase } from "lucide-react";
import { JSX } from "react";
const iconMap: Record<string, JSX.Element> = {
  Mail: <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  Phone: <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
  Code: <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  Briefcase: <Briefcase className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
};

export default function SupportPage() {
  const { page } = usePageData();
  const fm = page.frontmatter as any;

  const { title: pageTitle, supportOptions, resources, contactMethods } = fm;

  return (
    <div className="space-y-10  text-gray-800 dark:text-gray-200">
      {/* Support Options */}
      {supportOptions?.items?.length > 0 && (
        <section className="space-y-6">
          {supportOptions.majorTitle && (
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{supportOptions.majorTitle}</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportOptions.items.map((opt: any, i: number) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition mt-6 bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  {iconMap[opt.icon] || null}
                  <h3 className="text-xl font-bold">{opt.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{opt.description}</p>
                <a
                  href={opt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-700 text-white text-sm hover:bg-blue-700 dark:hover:bg-blue-800 transition"
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{resources.majorTitle}</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.items.map((res: any, i: number) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition mt-6 bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="text-lg font-bold">{res.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{res.description}</p>
                <a
                  href={res.link}
                  className="inline-block mt-3 px-4 py-2 rounded-lg bg-gray-700 dark:bg-gray-600 text-white text-sm hover:bg-gray-800 dark:hover:bg-gray-700 transition"
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{contactMethods.majorTitle}</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.items.map((c: any, i: number) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition mt-6 bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  {iconMap[c.icon] || null}
                  <h3 className="text-lg font-bold">{c.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{c.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{c.contact}</p>
                <a
                  href={c.link}
                  className="inline-block mt-3 px-4 py-2 rounded-lg bg-green-600 dark:bg-green-700 text-white text-sm hover:bg-green-700 dark:hover:bg-green-800 transition"
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