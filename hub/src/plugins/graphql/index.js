import Index from './queries/index.gql'
import Service from './queries/service'
import ServiceByOwnerAndRepo from './queries/serviceByOwnerAndRepo'
import ServiceByOwner from './queries/serviceByOwner'
import Search from './queries/search'
import User from './queries/user.gql'
import AllServiceCategories from './queries/allServiceCategories'
import ServiceRepository from './queries/getServiceRepository'

export const IndexQuery = Index
export const ServiceQuery = Service
export const ServiceByOwnerAndRepoQuery = ServiceByOwnerAndRepo
export const ServiceByOwnerQuery = ServiceByOwner
export const SearchQuery = Search
export const UserQuery = User
export const AllServiceCategoriesQuery = AllServiceCategories
export const ServiceRepositoryQuery = ServiceRepository

const queries = {
  Index,
  Service,
  ServiceByOwnerAndRepo,
  ServiceByOwner,
  Search,
  User,
  AllServiceCategories,
  ServiceRepository
}

export default queries
