// src/pages/Home.tsx
import { usePageData } from "rspress/runtime";
import React from "react";

export default function HomePage() {
  const { page } = usePageData();
  const fm = page.frontmatter as any;
  const { hero, features } = fm;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      {hero && (
        <section className="text-center space-y-4">
          {hero.name && <h1 className="text-4xl md:text-5xl font-bold">{hero.name}</h1>}
          {hero.text && <p className="text-lg text-gray-700 dark:text-gray-300">{hero.text}</p>}
          {hero.tagline && <p className="text-sm text-gray-500">{hero.tagline}</p>}

          {hero.actions && hero.actions.length > 0 && (
            <div className="flex justify-center gap-4 mt-4">
              {hero.actions.map((action: any, i: number) => (
                <a
                  key={i}
                  href={action.link}
                  className={`px-6 py-2 rounded font-semibold ${
                    action.theme === "brand"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {action.text}
                </a>
              ))}
            </div>
          )}

          {hero.image && (
            <div className="mt-6">
              <img src={hero.image.src} alt={hero.image.alt} className="mx-auto h-32 md:h-40" />
            </div>
          )}
        </section>
      )}

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature: any, i: number) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 flex flex-col items-start space-y-2 hover:shadow-md transition"
            >
              <div className="text-2xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.details}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
