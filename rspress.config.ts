//rspress.config.ts
import * as path from "node:path";
import { defineConfig } from "rspress/config";
import { pluginGoogleAnalytics } from "rsbuild-plugin-google-analytics";

import { loadEnv } from '@rsbuild/core';

const { publicVars } = loadEnv();

export default defineConfig({
  // Load .env variables

  root: path.join(__dirname, "docs"),
  title: "SKAYA - Best Software & Web Development Company | Custom Web Solutions",
  description: "Leading software development company specializing in custom web development, mobile apps, AI/ML solutions, SaaS platforms, and Web3 blockchain development. Expert full-stack developers delivering scalable enterprise solutions.",
  icon: "/logo.png",
  lang: "en",
  logo: {
    light: "/logo/light.png",
    dark: "/logo/dark.png",
  },
  head: [
    // Primary SEO Meta Tags
    ['meta', { name: 'description', content: 'Leading software development company specializing in custom web development, mobile apps, AI/ML solutions, SaaS platforms, and Web3 blockchain development. Expert full-stack developers delivering scalable enterprise solutions.' }],
    ['meta', { name: 'keywords', content: 'software development company, web development company, custom software development, mobile app development, AI development, machine learning solutions, SaaS development, Web3 development, blockchain development, full-stack development, React development, Next.js development, enterprise software solutions, custom web applications, progressive web apps, API development, cloud solutions, DevOps services, UI/UX design, frontend development, backend development, database design, microservices architecture, scalable web solutions, agile development, software consulting, digital transformation, e-commerce development, CMS development, web application development, mobile-first design, responsive web design, cross-platform development, software engineering services, technology consulting, startup development, MVP development, product development, software outsourcing, offshore development' }],
    ['meta', { name: 'author', content: 'SKAYA' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'language', content: 'English' }],
    ['meta', { name: 'revisit-after', content: '7 days' }],
    ['meta', { name: 'distribution', content: 'global' }],
    ['meta', { name: 'rating', content: 'general' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://skaya.org' }],
    ['meta', { property: 'og:site_name', content: 'SKAYA' }],
    ['meta', { property: 'og:title', content: 'SKAYA - Best Software & Web Development Company | Custom Solutions' }],
    ['meta', { property: 'og:description', content: 'Leading software development company specializing in custom web development, mobile apps, AI/ML solutions, SaaS platforms, and Web3 blockchain development. Expert full-stack developers delivering scalable enterprise solutions.' }],
    ['meta', { property: 'og:image', content: 'https://skaya.org/logo.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: 'https://skaya.org' }],
    ['meta', { name: 'twitter:title', content: 'SKAYA - Best Software & Web Development Company' }],
    ['meta', { name: 'twitter:description', content: 'Leading software development company specializing in custom web development, mobile apps, AI/ML solutions, SaaS platforms, and Web3 blockchain development.' }],
    ['meta', { name: 'twitter:image', content: 'https://skaya.org/logo.png' }],
    ['meta', { name: 'twitter:creator', content: '@skaya_org' }],
    ['meta', { name: 'twitter:site', content: '@skaya_org' }],
    
    // Geo Tags
    ['meta', { name: 'geo.region', content: 'US' }],
    ['meta', { name: 'geo.placename', content: 'United States' }],
    
    // Business/Organization
    ['meta', { property: 'business:contact_data:street_address', content: '' }],
    ['meta', { property: 'business:contact_data:locality', content: '' }],
    ['meta', { property: 'business:contact_data:region', content: '' }],
    ['meta', { property: 'business:contact_data:postal_code', content: '' }],
    ['meta', { property: 'business:contact_data:country_name', content: 'United States' }],
    
    // Additional SEO
    ['link', { rel: 'canonical', href: 'https://skaya.org' }],
    ['link', { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    
    // Structured Data
    ['script', { src: '/seo-structured-data.js', defer: '' }],
  ],
  builderConfig: {
    source: {
      define: publicVars,
    },
    plugins: [
      pluginGoogleAnalytics({
        id: 'G-K63YSJ39VC',
      }),
    ],
  },
  locales: [
    {
      lang: "en",
      label: "English",
      title: "SKAYA",
      description: "Dynamic Site Generator",
    },
    // {
    //   lang: "zh",
    //   label: "简体中文",
    //   title: "SKAYA",
    //   description: "静态网站生成器",
    // },
  ],

  themeConfig: {
    // 🌍 Language-specific config
    locales: [
      {
        lang: "en",
        nav: [
          {
            // @ts-ignore
            text: "Guide",
            link: "/guide/getting-started",
            activeMatch: "/guide/getting-started",
          },
          {
            // @ts-ignore
            text: "Blogs",
            link: "/blogs/index",
            activeMatch: "/blogs/index",
          },
          {
            // @ts-ignore
            text: "Resources",
            items: [
              { text: "Team", link: "/about" },
              { text: "Support", link: "/support" },
              { text: "Faq", link: "/faq" },
              {
                text: "Our App",
                items: [
                  { text: "WEB3", link: "https://blockchain.skaya.org/" },
                  { text: "AI", link: "https://www.npmjs.com/package/skaya/" },
                ],
              },
            ],
          },
        ],
        sidebar: {
          "/guide/": [
            { text: "What is Skaya?", link: "/guide/getting-started" },
            { text: "UI Examples", link: "/guide/examples" },
            {
              text: "React SDK",
              collapsed: true,
              items: [
                {
                  text: "Introduction",
                  link: "/guide/React-sdk/Introduction",
                },
                {
                  text: "Quickstart",
                  link: "/guide/React-sdk/quickstart",
                },
                {
                  text: "Styling",
                  link: "/guide/React-sdk/styling",
                },
                {
                  dividerType: "dashed",
                },
                {
                  text: "Pwa Components",
                  collapsed: true,
                  items: [
                    {
                      text: "Geolocation",
                      link: "/guide/React-sdk/pwa-components/GeoLocation",
                    },
                    {
                      text: "Bluetooth",
                      link: "/guide/React-sdk/pwa-components/Bluetooth",
                    },
                    {
                      text: "Audio Player",
                      link: "/guide/React-sdk/pwa-components/ComingSoon",
                    },
                    {
                      text: "Contact picker",
                      link: "/guide/React-sdk/pwa-components/ComingSoon",
                    },
                  ],
                },
              ],
            },
            {
              text: "Cli SDK",
              collapsed: true,
              items: [
                { text: "Introduction", link: "/guide/Cli-sdk/Introduction" },
                { text: "QuickStart", link: "/guide/Cli-sdk/quickstart" },
                { text: "Commands Refrence", link: "/guide/Cli-sdk/commands" },
                { text: "Get API Key", link: "/guide/Cli-sdk/api" },
                {
                  dividerType: "dashed",
                },
                {
                  text: "Init",
                  collapsed: true,
                  items: [
                    {
                      text: "Nextjs",
                      link: "/guide/Cli-sdk/init/Nextjs",
                    },
                    {
                      text: "Reactjs",
                      link: "/guide/Cli-sdk/init/Reactjs",
                    },
                    {
                      text: "Skayajs",
                      link: "/guide/Cli-sdk/init/Skayajs",
                    },
                  ],
                },
                {
                  text: "Create",
                  collapsed: true,
                  items: [
                    {
                      text: "Component",
                      link: "/guide/Cli-sdk/Create/Component",
                    },
                    {
                      text: "Pages",
                      link: "/guide/Cli-sdk/Create/Page",
                    },
                    {
                      text: "Api",
                      link: "/guide/Cli-sdk/Create/Api",
                    },
                  ],
                },
                {
                  text: "Update",
                  collapsed: true,
                  items: [
                    {
                      text: "Component",
                      link: "/guide/Cli-sdk/Update/Component",
                    },
                    {
                      text: "Pages",
                      link: "/guide/Cli-sdk/Update/Page",
                    },
                    {
                      text: "Api",
                      link: "/guide/Cli-sdk/Update/Api",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      // {
      //   lang: "zh",
      //   outlineTitle: "大纲",
      //   nav: [
      //     {
      //       // @ts-ignore
      //       text: "首页",
      //       link: "/zh/",
      //     },
      //     {
      //       // @ts-ignore
      //       text: "指南",
      //       items: [
      //         { text: "快速开始", link: "/zh/guide/getting-started" },
      //         { text: "支持", link: "/zh/support" },
      //         {
      //           text: "分组",
      //           items: [
      //             { text: "个人", link: "http://example.com/" },
      //             { text: "公司", link: "http://example.com/" },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      //   sidebar: {
      //     "/zh/guide/": [
      //       {
      //         text: "快速开始",
      //         items: [
      //           { text: "介绍", link: "/zh/guide/getting-started" },
      //           { text: "快速上手", link: "/zh/guide/quickstart" },
      //         ],
      //       },
      //       {
      //         text: "进阶",
      //         items: [
      //           "/zh/guide/advanced/customization",
      //           "/zh/guide/advanced/markdown",
      //         ],
      //       },
      //     ],
      //   },
      // },
    ],
    footer: {
      message:
        '<div class="rspress-footer-custom"><p style="text-align: center; margin: 0; padding: 20px;">© 2026 Skaya. All rights reserved. Built with ❤️ by SKAYA</p><p style="text-align: center; margin: 10px 0 0 0; font-size: 14px;"><a href="#" style="margin: 0 15px; text-decoration: none;">Privacy Policy</a><a href="#" style="margin: 0 15px; text-decoration: none;">Terms of Service</a></p></div>',
    },
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/skaya-org",
      },
      {
        icon: "x",
        mode: "link",
        content: "https://twitter.com/skaya_org",
      },
      {
        icon: "discord",
        mode: "link",
        content: "https://discord.gg/skaya-org",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  globalStyles: path.join(__dirname, "src/index.css"),
  build: {
    cleanUrls: true, // or 'without-extension'
  },
},
);