// rspress.config.ts
import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "SKAYA",
  icon: "/logo.png",
  lang: "en",
  logo: {
    light: "/logo/light.png",
    dark: "/logo/dark.png",
  },

  locales: [
    {
      lang: "en",
      label: "English",
      title: "SKAYA",
      description: "Static Site Generator",
    },
    {
      lang: "hi",
      label: "हिन्दी",
      title: "SKAYA",
      description: "स्थैतिक साइट जेनरेटर",
    },
  ],

themeConfig: {
  locales: [
    {
      lang: "en",
      nav: [
        {
          // @ts-ignore
          text: "Blogs",
          link: "/blogs",
          activeMatch: "/blogs",
        },
        {
          // @ts-ignore
          text: "Resources",
          items: [
            { text: "Team", link: "/about" },
            { text: "Support", link: "/support" },
            { text: "Faq", link: "/Faq" },
          ],
        },
      ],
      label: ""
    },
    {
      lang: "hi",
      outlineTitle: "सामग्री",
      // Reuse the same nav as English
      nav: [
        {
          // @ts-ignore
          text: "Blogs",
          link: "/blogs",
          activeMatch: "/blogs",
        },
        {
          // @ts-ignore
          text: "Resources",
          items: [
            { text: "Team", link: "/about" },
            { text: "Support", link: "/support" },
            { text: "Faq", link: "/Faq" },
          ],
        },
      ],
      label: ""
    },
  ],
  footer: {
    message:
      '<p class="mt-10">This is a footer with a <a href="https://example.com">link</a> and <strong>bold text</strong></p>',
  },
  socialLinks: [
    {
      icon: "instagram",
      mode: "link",
      content: "https://instagram.com/instagram",
    },
    {
      icon: "x",
      mode: "link",
      content: "https://twitter.com/your-profile",
    },
    {
      icon: "facebook",
      mode: "link",
      content: "https://facebook.com/your-invite",
    },
  ],
},

  globalStyles: path.join(__dirname, "src/index.css"),
});
