import gql from 'graphql-tag'

export default gql`query getServiceRepository($uuid: UUID) {
  getServiceRepository(serviceUuid: $uuid) {
    service
    ownerName
    repoName
  }
}`
