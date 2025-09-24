import { usePageData } from "rspress/runtime";
import { useState } from "react";

export default function RealEstateHomePage() {
  const { page } = usePageData();
  const fm = page?.frontmatter as any;

  if (!fm || !fm.tabs || fm.tabs.length === 0) {
    return <div>Loading...</div>; // or fallback UI
  }

  const [activeTab, setActiveTab] = useState(fm.tabs[0].key);
  const activeTabData = fm.tabs.find((t: any) => t.key === activeTab);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const phone = "1234567890";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl min-h-[50vh] mx-auto mt-8 mb-16 flex flex-col md:flex-row items-center gap-8 px-6">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold">{activeTabData.hero.title}</h1>
          <p className="text-gray-700 dark:text-gray-300">
            {activeTabData.hero.description}
          </p>
          <div className="flex gap-4">
            {activeTabData.hero.cta.map((cta: any, i: number) => (
              <a
                key={i}
                href={cta.link}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                {cta.text}
              </a>
            ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src={activeTabData.hero.image.src}
            alt={activeTabData.hero.image.alt}
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex border-b-2 border-gray-200 dark:border-gray-700">
          {fm.tabs.map((tab: any) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 -mb-0.5 font-semibold ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {activeTabData.listings?.map((item: any, i: number) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.price}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.beds} | {item.baths} | {item.sqft} sqft
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      {fm.whyChooseUs?.items?.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
              {fm.whyChooseUs.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {fm.whyChooseUs.items.map((item: any, i: number) => (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agents */}
      {fm.agents?.items?.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
              {fm.agents.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {fm.agents.items.map((agent: any, i: number) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
                >
                  {agent.image && (
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-blue-600">{agent.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {agent.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

     {/* Testimonials */}
      {fm.testimonials?.items?.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
              {fm.testimonials.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {fm.testimonials.items.map((t: any, i: number) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition"
                >
                  {t.image && (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-4 border-blue-600"
                    />
                  )}
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    “{t.feedback}”
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Contact Form */}
      {fm.contactForm && (
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              {fm.contactForm.title}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder={fm.contactForm.namePlaceholder}
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
              />
              <input
                type="email"
                name="email"
                placeholder={fm.contactForm.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
              />
              <textarea
                name="message"
                placeholder={fm.contactForm.messagePlaceholder}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                rows={4}
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                {fm.contactForm.buttonText}
              </button>
            </form>
          </div>
        </section>
      )}

 
    </div>
  );
}
