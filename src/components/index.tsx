// src/pages/Home.tsx
import { usePageData } from "rspress/runtime";
import React from "react";

export default function HomePage() {
  const { page } = usePageData();
  const fm = page.frontmatter as any;
  const { hero, features } = fm;

  return (
    <div className="space-y-16 py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      {hero && (
        <section className="text-center space-y-6 flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-12">
          <div className="md:w-1/2 text-left">
            {hero.name && <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">{hero.name}</h1>}
            {hero.text && <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">{hero.text}</p>}
            {hero.tagline && <p className="mt-2 text-md text-gray-500">{hero.tagline}</p>}

            {hero.actions && hero.actions.length > 0 && (
              <div className="flex justify-start gap-4 mt-8">
                {hero.actions.map((action: any, i: number) => (
                  <a
                    key={i}
                    href={action.link}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 ${
                      action.theme === "brand"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {action.text}
                  </a>
                ))}
              </div>
            )}
          </div>

          {hero.image && (
            <div className="md:w-1/2 flex justify-center">
              <img src={hero.image.src} alt={hero.image.alt} className="w-full max-w-md h-auto animate-float" />
            </div>
          )}
        </section>
      )}

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {features.map((feature: any, i: number) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center space-y-4 bg-white dark:bg-gray-800 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="text-4xl text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.details}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}