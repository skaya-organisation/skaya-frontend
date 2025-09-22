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
        outlineTitle: "On This Page",
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
            link: "/blogs",
            activeMatch: "/blogs",
          },
          {
             // @ts-ignore
            text: "Info",
            activeMatch: "/guide/",
            items: [
              { text: "Getting Started", link: "/guide/getting-started" },
              { text: "Support", link: "/support" },
              {
                text: "Group",
                items: [
                  { text: "WEB3", link: "http://blockchain.skaya.com/" },
                  { text: "AI", link: "http://app.skaya.org/" },
                ],
              },
            ],
          },
        ],
        sidebar: {
          "/guide/": [
            {
              text: "Getting Started",
              items: [
                { text: "Introduction", link: "/guide/getting-started" },
                { text: "QuickStart", link: "/guide/quickstart" },
              ],
            },
            {
              text: "Advanced",
              items: [
                { text: "Geolocation", link: "/guide/pwa-components/GeoLocation" },
                { text: "Bluetooth", link: "/guide/bluetooth" },
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

     socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/web-infra-dev/rspress",
      },
      {
        icon: "x", 
        mode: "link",
        content: "https://twitter.com/your-profile",
      },
      {
        icon: "discord", 
        mode: "link",
        content: "https://discord.gg/your-invite",
      },
    ],
  },
  resolve: {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
},
 globalStyles: path.join(__dirname, 'src/index.css')
});
