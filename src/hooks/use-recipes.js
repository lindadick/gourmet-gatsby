import { graphql, useStaticQuery } from "gatsby"

const useRecipes = () => {
  const data = useStaticQuery(graphql`
    query {
      mysqlRecipe(fields: {}) {
        id
      }
      allMysqlRecipe {
        edges {
          node {
            fields {
              slug
            }
            id
            cooktime
            instructions
            title
          }
        }
      }
    }
  `)

  return data.allMysqlRecipe.edges
}

export default useRecipes
