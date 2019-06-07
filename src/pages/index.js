import React from "react"
import { Link } from "gatsby"

import useRecipes from '../hooks/use-recipes';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default () => {
  const recipes = useRecipes();

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Gourmet Gatsby</h1>
      <h2>Recipes</h2>
      <ul>
        {
          recipes.map(recipe => (
            <li>{recipe.title}</li>
          ))
        }
      </ul>
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
}
