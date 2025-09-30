import { usePageData } from "rspress/runtime";

export default function AboutPage() {
  const { page } = usePageData();
  const fm = page.frontmatter as any;
  const { hero, aboutData } = fm;

  return (
    <div className="space-y-16  text-gray-800 dark:text-gray-200">
      {/* Hero */}
      {hero && (
        <section className="text-center space-y-4">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {hero.tagline}
          </p>
        </section>
      )}

      {/* Header */}
      {aboutData?.header && (
        <section className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {aboutData.header.subtitle}
          </p>
          <h2 className="text-3xl font-bold">{aboutData.header.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {aboutData.header.description}
          </p>
        </section>
      )}

      {/* Logo Carousel */}
      {aboutData?.logoCarousel?.length > 0 && (
        <section className="overflow-x-auto py-4">
          <div className="flex gap-6 justify-center flex-wrap">
            {aboutData.logoCarousel.map((logo: string, i: number) => (
              <span
                key={i}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
              >
                {logo}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Stats */}
      {aboutData?.stats?.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {aboutData.stats.map((stat: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-800"
            >
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-lg font-semibold">{stat.label}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Values */}
      {aboutData?.values && (
        <section className="space-y-6 py-24">
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {aboutData.values.subtitle}
            </p>
            <h2 className="text-2xl font-bold">{aboutData.values.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {aboutData.values.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.values.items.map((val: any, i: number) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex gap-3 bg-gray-50 dark:bg-gray-800"
              >
                <span className="text-2xl">{val.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold">{val.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Team */}
      {aboutData?.team && (
        <section className="space-y-6 py-24">
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {aboutData.team.subtitle}
            </p>
            <h2 className="text-2xl font-bold">{aboutData.team.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {aboutData.team.description}
            </p>
          </div>

          {/* Core Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.team.coreMembers.map((member: any, i: number) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Contributors */}
          {aboutData.team.contributors && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">
                {aboutData.team.contributors.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {aboutData.team.contributors.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutData.team.contributors.members.map((m: any, i: number) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-800"
                  >
                    <h4 className="font-semibold">{m.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {m.contribution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      )}

      {/* Join Us */}
      {aboutData?.joinUs && (
        <section className="text-center space-y-4 py-24">
          <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {aboutData.joinUs.subtitle}
          </p>
          <h2 className="text-2xl font-bold">{aboutData.joinUs.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {aboutData.joinUs.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {aboutData.joinUs.links.map((link: any, i: number) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                {link.text}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}