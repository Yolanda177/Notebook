module.exports = {
  plugins: [
    "vuepress-plugin-zooming",
    {
      // 支持点击缩放的图片元素的选择器
      selector: "img",
      // 进入一个页面后，经过一定延迟后使页面中的图片支持缩放
      delay: 1000,

      // medium-zoom 的 options
      // 默认值: {}
      options: {
        bgColor: "black",
        zIndex: 10000
      }
    },
    "vuepress-plugin-smooth-scroll",
    "vuepress-plugin-table-of-contents"
  ],
  base: "/Notebook/",
  title: "Yolanda",
  description: "每天学习一点点",
  head: [["link", { rel: "icon", href: "/images/mylogo.jpg" }]],
  themeConfig: {
    nav: [
      { text: "📝日常记录", link: "/dailyRecord/" },
      {
        text: "开发者",
        items: [
          { text: "💻大前端", link: "/frontend-web/" },
          { text: "🤔复盘", link: "/rethink/" },
          {
            text: "️️🧘算法修炼",
            items: [
              { text: "计算机基础", link: "/algorithm/computerBasics" },
              { text: "数据结构", link: "/algorithm/dataStructure" },
              { text: "算法分类", link: "/algorithm/algorithm" },
              { text: "数据库", link: "/dataBase/index" }
            ]
          },
          { text: "☁️运维", link: "/devops/" },
          { text: "🚬测试", link: "/test/" },
          { text: "🌍GIS", link: "/gis/" },
          { text: "️️🖱️软件", link: "/software/" },
          { text: "️️🐛网络工程", link: "/network/" },
          { text: "🚗C#", link: "/csharp/" },
          { text: "🎮Unity", link: "/unity/" }
        ]
      },
      { text: "设计", items: [{ text: "🖌️UI", link: "/design/" }] },
      { text: "🏷书签整理", link: "/bookmark/" },
      { text: "✔️编码规范&协同开发", link: "/lint/" },
      {
        text: "📖知识脑图",
        link:
          "http://shooterblog.site/Learn-JS-Demo/%E5%89%8D%E7%AB%AF%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1/index.html"
      },
      {
        text: "🔧个人博客",
        link: "https://jecyu.github.io/blog/"
      },
      {
        text: "🔗Github",
        items: [
          {
            text: "Yolanda github",
            link: "https://github.com/Yolanda177"
          },
          {
            text: "英语学习",
            link: "https://jecyu.github.io/language-learning/"
          },
          {
            text: "前端自动化测试",
            link: "https://jecyu.github.io/Fe-Auto-Testing/"
          }
        ]
      }
    ],
    // sidebar: "auto",
    sidebar: {
      "/dailyRecord/": [
        {
          title: "日常记录",
          collapsable: true,
          children: ["2020", "2018", "table", ""]
        },
        {
          title: "TechnologyDevelopment",
          collapsable: false,
          children: ["TechnologyDevelopment"]
        }
      ],
      "/lint/": [
        {
          title: "代码审查",
          collapsable: true,
          children: ["codeReview"]
        },
        {
          title: "编码规范",
          collapsable: true,
          children: ["", "es6", "vue"]
        },
        {
          title: "协同开发",
          collapsable: true,
          children: ["gitBase", "gitWorkFlow", "collaborative", "gitCommit"]
        }
      ],
      "/bookmark/": [
        {
          title: "网站书签整理",
          collapsable: false,
          children: ["", "backend", "TOOL", "network"]
        }
      ],
      "/design/": [
        {
          title: "设计",
          collapsable: false,
          children: ["layout", "animate"]
        }
      ],
      "/devops/": [
        {
          title: "运维",
          collapsable: false,
          children: ["linux", "window", "mac", "docker"]
        }
      ],
      "/software/": [
        {
          title: "软件",
          collapsable: false,
          children: ["excel", "ps"]
        }
      ],
      "/frontend-web/": [
        {
          title: "前端",
          collapsable: false,
          children: [
            "browser",
            "css",
            "javascript",
            "es6",
            "react",
            "vue",
            "webpack",
            "",
            "modulization",
            "architecture",
            "authentication",
            "chrome",
            "noJQ",
            "performance",
            "npm",
            "lodash",
            "babel",
            "rollup",
            "docker",
            "security",
            "file",
            "interview",
            "interview2"
          ]
        }
      ],
      "/rethink/": [
        {
          title: "思维",
          collapsable: false,
          children: [""]
        }
      ],
      "/network/": [
        {
          title: "网络",
          collapsable: false,
          children: ["", "http"]
        }
      ],
      "/algorithm/": [
        {
          title: "算法",
          collapsable: false,
          children: [
            "computerBasics",
            "c",
            "dataStructure",
            "algorithm",
            "patterns"
          ]
        }
      ],
      "/dataBase/": [
        {
          title: "数据库",
          collapsable: false,
          children: ["", "mysql"]
        }
      ],

      "/gis/": [
        {
          title: "GIS",
          collapsable: false,
          children: [
            "",
            "layer",
            "handleFile",
            "learn",
            "openLayers",
            "arcGIS API for JavaScript"
          ]
        }
      ],
      "/csharp/": [
        {
          title: "C#",
          collapsable: false,
          children: [""]
        }
      ],
      "/unity/": [
        {
          title: "Unity",
          collapsable: false,
          children: [""]
        }
      ]
    },
    lastUpdated: "Last Updated",
    sidebarDepth: 4
  }
};
