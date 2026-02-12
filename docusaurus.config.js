// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const config = {
  title: 'DarkTree',
  tagline: 'Mapping the DarkTaxa',
  url: 'https://insect-darktree.github.io', // Your website URL
  baseUrl: '/',
  projectName: 'insect-darktree.github.io',
  organizationName: 'insect-darktree',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',
  // TODO We should eventually fix broken links and throw if any are found
  // onBrokenLinks: 'throw',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs', // Main documentation
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs', // This makes docs appear at /docs/
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tree',
        path: 'tree',
        routeBasePath: 'tree',
        sidebarPath: require.resolve('./sidebarsGettingStarted.js'),
        exclude: ['README.md'],
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'involved',
        path: 'involved',
        routeBasePath: 'involved',
        sidebarPath: require.resolve('./sidebarsGettingStarted.js'),
        exclude: ['README.md'],
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'blog',
        path: 'blog',
        routeBasePath: 'blog',
        sidebarPath: require.resolve('./sidebarsGettingStarted.js'),
        exclude: ['README.md'],
        // ... other options
      },
    ],
  ],
  themeConfig: {
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'DarkTree',
        logo: {
          alt: 'DarkTree Logo',
          src: 'img/Temp_logo.jpg',
        },
        items: [          
          {
            to: 'docs',
            position: 'left',
            label: 'Project',
          },
          {
            to: '/tree/tree',
            position: 'left',
            label: 'Explore tree',
            activeBaseRegex: `/tree/`
          },
          {
            to: '/involved/get_involved',
            position: 'left',
            label: 'Get involved',
            activeBaseRegex: `/get_involved/`
          },
          {
            to: 'members',
            position: 'left',
            label: 'People',
          },
          {
            to: '/blog/news',
            position: 'left',
            label: 'News',
            activeBaseRegex: `/news/`
          },
          {
            href: 'https://github.com/insect-darktree',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // algolia: {
      //   // The application ID provided by Algolia
      //   appId: 'GMDMVF6JJU',
  
      //   // Public API key: it is safe to commit it
      //   apiKey: '893a4c3bf8a2be3d557fca8a80ab4471',
  
      //   indexName: 'DarkTree',
  
      //   // Optional: see doc section below
      //   contextualSearch: true,
  
      //   // Optional: Algolia search parameters
      //   searchParameters: {},
  
      //   // Optional: path for search page that enabled by default (`false` to disable it)
      //   searchPagePath: 'search',
  
      //   // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      //   insights: false,
  
      //   //... other Algolia params
      // },
      footer: {
        style: 'dark',
        // links: [
        //   {
        //     title: 'Documentation',
        //     items: [
        //       {
        //         label: 'DarkTree',
        //         to: '/docs/DarkTree',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Links',
        //     items: [
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/DarkTree',
        //       },
        //       {
        //         to: 'devteam',
        //         label: "Meet the Developers",
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="/devteam"> DarkTree Research and Development Team</a> <br>
        Built via <a href="https://docusaurus.io">Docusaurus.io</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash']
      },
    },
};

module.exports = config;
