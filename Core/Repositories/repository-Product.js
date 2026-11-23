import RepositoryError from '#errors/Repository-error.js'

export default class ProductRepository {
  static async add(task) {
    throw new RepositoryError("Method 'add()' must be implemented.")
  }

  static async save(task) {
    throw new RepositoryError("Method 'save()' must be implemented.")
  }

  static async findById(id) {
    throw new RepositoryError("Method 'findById()' must be implemented.")
  }

  static async findAll() {
    throw new RepositoryError("Method 'findAll()' must be implemented.")
  }

  static async delete(id) {
    throw new RepositoryError("Method 'delete()' must be implemented.")
  }
}
