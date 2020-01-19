import gql from 'graphql-tag'

export default gql`query ServiceByOwnerAndRepo($owner: Username!, $repo: Alias!) {
  allOwners(condition: { username: $owner }) {
    nodes {
      services(condition:{ name: $repo}) {
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
              readme
              tag
              state
              configuration
            }
          }
        }
      }
    }
  }
}`
