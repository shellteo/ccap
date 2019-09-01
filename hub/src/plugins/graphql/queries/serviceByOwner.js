import gql from 'graphql-tag'

export default gql`query ServiceByOwner($owner: Username!) {
  allOwners(condition: { username: $owner }, first: 1) {
    nodes {
      username
      name
      services {
        totalCount
        nodes {
          uuid
          name
          alias
          description
          topics
          public
          owner {
            username
          }
          serviceTags {
            nodes {
              tag
              state
            }
          }
        }
      }
    }
  }
}`
