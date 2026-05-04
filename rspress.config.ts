//rspress.config.ts
import * as path from "node:path";
import { defineConfig } from "rspress/config";

import { loadEnv } from '@rsbuild/core';

const { publicVars } = loadEnv();

export default defineConfig({
  // Load .env variables

  root: path.join(__dirname, "docs"),
  title: "SKAYA",
  description: "Build modern web applications with SKAYA - A powerful SDK for React, Next.js, and more",
  icon: "/logo.png",
  lang: "en",
  logo: {
    light: "/logo/light.png",
    dark: "/logo/dark.png",
  },
  head: [
    // Open Graph meta tags for social media sharing
    ['meta', { property: 'og:title', content: 'SKAYA - Modern Web Development SDK' }],
    ['meta', { property: 'og:description', content: 'Build modern web applications with SKAYA - A powerful SDK for React, Next.js, and more' }],
    ['meta', { property: 'og:image', content: 'https://skaya.org/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://skaya.org' }],
    // Twitter Card meta tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'SKAYA - Modern Web Development SDK' }],
    ['meta', { name: 'twitter:description', content: 'Build modern web applications with SKAYA - A powerful SDK for React, Next.js, and more' }],
    ['meta', { name: 'twitter:image', content: 'https://skaya.org/logo.png' }],
    // Additional meta tags
    ['meta', { name: 'description', content: 'Build modern web applications with SKAYA - A powerful SDK for React, Next.js, and more' }],
    ['link', { rel: 'canonical', href: 'https://skaya.org' }],
  ],
  builderConfig: {
    source: {
      define: publicVars,
    },
  },
  locales: [
    {
      lang: "en",
      label: "English",
      title: "SKAYA",
      description: "Static Site Generator",
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