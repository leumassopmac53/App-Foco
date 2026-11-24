import Product from '#domain/Product.js'

export default async function deleteProduct(id, repository) {
  try {
    return await repository.delete(id)
  }
  catch (error) {
    switch (error.name) {
      case 'DomainError':
        return {
          ok: false,
          message: error.message,
          name: error.name
        }

      case 'RepositoryError':
        return {
          ok: false,
          message: error.message,
          name: error.name
        }

      default:
        throw error
    }
  }
}