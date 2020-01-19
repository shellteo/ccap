import gql from 'graphql-tag'

export default gql`query {
  allServiceCategories(condition: { type: SERVICE }, orderBy: TITLE_ASC) {
    totalCount
    nodes {
      title
      uuid
    }
  }
}`
