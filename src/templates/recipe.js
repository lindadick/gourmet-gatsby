import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import format from "date-fns/format"
import addSeconds from "date-fns/addSeconds"
import startOfDay from "date-fns/startOfDay"
export default ({ data }) => {
  const {
    title,
    cuisine,
    cooktime,
    preptime,
    yields,
    yield_unit,
    instructions,
    modifications,
    ingredients,
    categories,
    source,
    link,
    rating,
  } = data.mysqlRecipe

  return (
    <Layout>
      <h2>{title}</h2>
      <ul>
        <li>Preparation time: {formatMinutes(preptime)}</li>
        <li>Cook time: {formatMinutes(cooktime)}</li>
        <li>
          Yield: {yields} {yield_unit}
        </li>
        <li>
          {categories.length > 1 ? "Categories: " : "Category: "}
          {categories
            .map(cat => {
              return cat.category
            })
            .join(", ")}
        </li>
        <li>Cuisine: {cuisine}</li>
        <li>Rating: {rating}/10</li>
      </ul>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map(ingredient => {
          return ingredient.deleted ? null : (
            <li>
              {ingredient.amount} {ingredient.unit} {ingredient.item}{" "}
              {ingredient.optional ? " (optional)" : ""}
            </li>
          )
        })}
      </ul>
      {/* <p
        dangerouslySetInnerHTML={{ __html: newlineToBR(ingredients) }}
      /> */}
      <h3>Instructions</h3>
      <p dangerouslySetInnerHTML={{ __html: newlineToBR(instructions) }} />
      {modifications ? (
        <>
          <h3>Notes</h3>
          <p dangerouslySetInnerHTML={{ __html: newlineToBR(modifications) }} />
        </>
      ) : null}
      <h3>Source</h3>
      {link ? (
        <p>
          {source}:{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </p>
      ) : (
        <p>{source}</p>
      )}
    </Layout>
  )
}

function newlineToBR(text) {
  return text.replace(/\n/g, "<br/>")
}

function formatMinutes(seconds) {
  return format(addSeconds(startOfDay(new Date()), seconds), "m") + " minutes"
}

export const query = graphql`
  query($slug: String!) {
    mysqlRecipe(fields: { slug: { eq: $slug } }) {
      title
      cuisine
      cooktime
      preptime
      yields
      yield_unit
      instructions
      modifications
      source
      link
      rating
      ingredients {
        item
        optional
        unit
        amount
        rangeamount
        deleted
      }
      categories {
        category
      }
    }
  }
`
