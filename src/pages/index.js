import React from "react"
import { Link } from "gatsby"

import useRecipes from "../hooks/use-recipes"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default () => {
  const recipes = useRecipes()
  console.log(recipes[0])

  return (
    <Layout>
      <SEO title="Home" />
      <h2>Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.node.id}>
            <Link to={recipe.node.fields.slug}>{recipe.node.title}</Link>
          </li>
        ))}
      </ul>
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
    </Layout>
  )
}
