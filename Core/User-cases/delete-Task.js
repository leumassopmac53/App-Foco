import Task from '#domain/Task.js'

export default async function deleteTask(id, repository) {
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