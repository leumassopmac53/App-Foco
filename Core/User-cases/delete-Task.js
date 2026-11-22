import Task from '#domain/Task.js'
import Repository from '#repository/repository-Task.js'

export default async function deleteTask(id) {
  try {
    return await Repository.delete(id)
  }
  catch (error) {
    switch (error.name) {
      case 'DomainError':
        return {
          ok: false,
          message: error.message,
          name: error.name
        };

      case 'RepositoryError':
        return {
          ok: false,
          message: error.message,
          name: error.name
        };

      default:
        throw error
    }
  }
}