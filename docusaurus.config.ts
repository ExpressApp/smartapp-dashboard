import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'Dashboard SmartApp Documentation',
  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',
  staticDirectories: ['docs/assets'],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Dashboard SmartApp',
      logo: {
        alt: 'dashboard',
        src: '/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/ExpressApp/smartapp-dashboard',
          label: 'Frontend repo',
          position: 'right',
        },
        {
          href: 'https://confluence.ccsteam.ru/spaces/EI/pages/415468920/Test+SmartApp',
          label: 'Backend API',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Tutorial',
          items: [
            {
              label: 'Подготовка к запуску SmartApp',
              to: '/preparing-to-launch',
            },
            {
              label: 'Dashboard SmartApp',
              to: '/',
            },
            {
              label: 'Экраны SmartApp',
              to: '/category/экраны-smartapp',
            },
            {
              label: 'SmartApp-UI & Темная тема',
              to: '/smartapp-ui',
            },
            {
              label: 'Оффлайн-режим',
              to: '/offline-mode',
            },
            {
              label: 'Кеширование',
              to: '/category/кеширование',
            },
            {
              label: 'Интернационализация',
              to: '/internationalization',
            },
            {
              label: 'Шифрование кеша SmartApp',
              to: '/cache-encryption',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'SmartApp UI Storybook',
              href: 'https://smartapp-ui.rndteam.ccstest.ru/?path=/story/reactcomponentlibrary-actionmodal--action-modal-component',
            },
            {
              label: 'SmartApp SDK руководство разработчика',
              href: 'https://docs.express.ms/smartapps/developer-guide/smartapp-sdk/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'react-slick',
              href: 'https://react-slick.neostack.com/',
            },
            {
              label: 'react-beautiful-dnd',
              href: 'https://www.npmjs.com/package/react-beautiful-dnd',
            },
            {
              label: 'react-dnd',
              href: 'https://react-dnd.github.io/react-dnd/about',
            },
            {
              label: '@expressms/smartapp-ui',
              href: 'https://www.npmjs.com/package/@expressms/smartapp-ui',
            },
            {
              label: '@expressms/smartapp-sdk',
              href: 'https://www.npmjs.com/package/@expressms/smartapp-sdk',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dashboard SmartApp, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
