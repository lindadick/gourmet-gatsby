import { graphql, useStaticQuery } from 'gatsby';

const useRecipes = () => {
  const data = useStaticQuery(graphql`
    query {
      allMysqlRecipe {
          nodes {
              cooktime
              cuisine
              deleted
              id
              ingredient_hash
              instructions
              last_modified
              link
              modifications
              mysqlId
              preptime
              rating
              recipe_hash
              source
              title
              yield_unit
              yields
          }
      }
    }
  `);

  return data.allMysqlRecipe.nodes;
};

export default useRecipes;
