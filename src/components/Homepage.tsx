import { usePageData } from "rspress/runtime";
import { Link } from "rspress/theme";
import { useState, useEffect } from "react";

const getGithubUser = async (username:String) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error(`GitHub user not found: ${username}`);
  }
  return response.json();
};

export default function HomePage() {
  const { page } = usePageData();
  const fm = page.frontmatter as any;
  const { heroItems, featuredItems, video, frontendApp, community } = fm;

  type GithubUser = {
    username: string;
    avatar: string;
    url: string;
  };

  const [githubUsers, setGithubUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (community?.githubUsernames) {
      const fetchUsers = async () => {
        const users = await Promise.all(
          community.githubUsernames.map(async (username: String) => {
            try {
              const user = await getGithubUser(username);
              return {
                username: user.login,
                avatar: user.avatar_url,
                url: user.html_url,
              };
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );
        setGithubUsers(users.filter(Boolean));
        setLoading(false);
      };
      fetchUsers();
    }
  }, [community?.githubUsernames]);

  return (
    <div className="space-y-24 py-16">
      {/* Hero Section */}
      {heroItems && (
        <section className="flex flex-col-reverse items-center justify-between gap-12 text-center md:flex-row md:gap-24 md:text-left">
          {/* Hero Text */}
          <div className="flex-1 space-y-6">
            {heroItems.name && (
              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
                {heroItems.name}
              </h1>
            )}
            {heroItems.text && (
              <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400 md:text-xl">
                {heroItems.text}
              </p>
            )}
            {heroItems.tagline && (
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {heroItems.tagline}
              </p>
            )}

            {/* Actions */}
            {heroItems.actions && (
              <div className="flex flex-wrap justify-center gap-4 pt-4 md:justify-start">
                {heroItems.actions.map(
                  (
                    action: { theme: string; text: string; link: string },
                    i: number
                  ) => (
                    <Link
                      key={i}
                      href={action.link}
                      className={`rounded-full px-6 py-3 font-semibold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${
                        action.theme === "brand"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {action.text}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {/* Hero Image */}
          {heroItems.image && heroItems.image.src && (
            <div className="flex flex-1 justify-center">
              <img
                src={heroItems.image.src}
                alt={heroItems.image.alt || "Hero"}
                className="w-52 h-52 animate-pulse rounded-full object-cover shadow-2xl transition-all duration-500 ease-in-out hover:animate-none md:h-80 md:w-80"
              />
            </div>
          )}
        </section>
      )}

      

      {/* Featured Items */}
      {featuredItems?.length > 0 && (
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map(
            (
              item: { title: string; details: string; icon: string },
              i: number
            ) => (
              <div
                key={i}
                className="transform rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-start gap-5">
                  <span className="text-4xl text-blue-600">{item.icon}</span>
                  <div>
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.details}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </section>
      )}

      

      {/* Video Section */}
      {video && video.src && (
        <section className="flex flex-col items-center justify-center gap-12 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            {frontendApp.hero}
          </h2>
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl">
            <video
              src={video.src}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </section>
      )}

      

      {/* Frontend App & Help Section */}
      {frontendApp && (
        <section className="space-y-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* UI Kit */}
            <div className="flex flex-col items-start rounded-3xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 text-2xl font-bold">{frontendApp.uiKit.title}</h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {frontendApp.uiKit.description}
              </p>
            </div>
            {/* Core Website Libraries */}
            <div className="flex flex-col items-start rounded-3xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-2 text-2xl font-bold">{frontendApp.core.title}</h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {frontendApp.core.description}
              </p>
            </div>
          </div>
          {/* Help Section */}
          {frontendApp.help && (
            <div className="space-y-8 text-center">
              <h3 className="text-3xl font-bold">{frontendApp.help.title}</h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Demo */}
                <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 text-xl font-bold">{frontendApp.help.demo.title}</h4>
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    {frontendApp.help.demo.text}
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-blue-600 hover:text-blue-700">
                    {frontendApp.help.demo.link}
                  </Link>
                </div>
                {/* Support */}
                <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 text-xl font-bold">{frontendApp.help.support.title}</h4>
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    {frontendApp.help.support.text}
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-blue-600 hover:text-blue-700">
                    {frontendApp.help.support.link}
                  </Link>
                </div>
                {/* FAQs */}
                <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <h4 className="mb-2 text-xl font-bold">{frontendApp.help.faq.title}</h4>
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    {frontendApp.help.faq.text}
                  </p>
                  <Link href="#" className="mt-4 font-semibold text-blue-600 hover:text-blue-700">
                    {frontendApp.help.faq.link}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      

      {/* Community Section */}
      {community && (
        <section className="space-y-8 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">{community.heading} <span className="text-blue-600">Community</span></h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{community.description}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href={community.instagram.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-medium transition-all duration-300 hover:border-blue-600 dark:border-gray-700 dark:hover:border-blue-600"
            >
              <i className="i-ri-instagram-fill text-2xl" />
              <span>{community.instagram.label}</span>
            </Link>
            <Link
              href={community.linkedin.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-medium transition-all duration-300 hover:border-blue-600 dark:border-gray-700 dark:hover:border-blue-600"
            >
              <i className="i-ri-linkedin-box-fill text-2xl" />
              <span>{community.linkedin.label}</span>
            </Link>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold mt-8">Core Contributors</h4>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {loading ? (
                <p>Loading contributors...</p>
              ) : (
                githubUsers.map((user) => (
                  <a
                    key={user.username}
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex transform flex-col items-center gap-2 transition-transform duration-300 hover:scale-110"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-16 w-16 rounded-full border-2 border-transparent transition-all duration-300 hover:border-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      @{user.username}
                    </span>
                  </a>
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}