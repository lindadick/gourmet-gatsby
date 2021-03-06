require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: `/gourmet`,
  siteMetadata: {
    title: `Gourmet Gatsby`,
    description: `This will eventually be a Gatsby-based frontend for viewing a Gourmet (https://github.com/thinkle/gourmet) database.`,
    author: `Linda Dick`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: process.env.MYSQL_HOSTNAME,
          port: process.env.MYSQL_PORT,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
        },
        queries: [
          {
            statement: "SELECT * FROM recipe ORDER BY title ASC",
            idFieldName: "id",
            name: "recipe",
          },
          {
            statement: "SELECT * FROM ingredients ORDER BY position ASC",
            idFieldName: "id",
            name: "ingredient",
            parentName: "recipe",
            foreignKey: "recipe_id",
            cardinality: "OneToMany",
          },
          {
            statement: "SELECT * FROM categories ORDER BY category ASC",
            idFieldName: "id",
            name: "category",
            parentName: "recipe",
            foreignKey: "recipe_id",
            cardinality: "OneToMany",
          },
        ],
      },
    }, // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
