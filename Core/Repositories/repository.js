import RepositoryError from '#errors/Repository-error.js'

export default class Repository {
  async getBalance(){
    
  }
  
  async setBalance(){
    
  }
  
  async add(task) {
    throw new RepositoryError("Method 'add()' must be implemented.")
  }

  async save(task) {
    throw new RepositoryError("Method 'save()' must be implemented.")
  }

  async findById(id) {
    throw new RepositoryError("Method 'findById()' must be implemented.")
  }

  async findAll() {
    throw new RepositoryError("Method 'findAll()' must be implemented.")
  }

  async delete(id) {
    throw new RepositoryError("Method 'delete()' must be implemented.")
  }
}
