import gql from 'graphql-tag'

export default gql`query SearchServices($searchTerm: String!) {
  searchServices(searchTerms: $searchTerm, first: 25) {
    totalCount
    pageInfo {
      endCursor
    }
    edges {
      node {
        name
        alias
        description
        category
        topics
        owner {
          username
        }
      }
    }
  }
}`
