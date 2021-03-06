module.exports = {
  siteMetadata: {
    title: "Complete Intro to React v6",
    subtitle: "& Intermediate React v3",
    description:
      "Brian Holt breaks down React into the most low level principles so that you can understand your whole stack, from front to back",
    keywords: [
      "react",
      "react.js",
      "frontend masters",
      "parcel",
      "javascript",
      "brian holt",
      "js",
      "front end",
      "tailwind",
    ],
  },
  pathPrefix: "/complete-intro-to-react-v6",
  plugins: [
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/lessons`,
        name: "markdown-pages",
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false,
            },
          },
        ],
      },
    },
  ],
};
