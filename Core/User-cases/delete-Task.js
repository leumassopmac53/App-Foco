import TaskRepository from '#repository/repository-Task.js'
import Task from '#domain/Task.js'

export default async function deleteATask(id) {
  try {
    const taskId = TaskRepository.findById(id)

    const task = new Task(taskId)

    TaskRepository.delete(task.id)

    return {ok: true, message: '', name: ''}
  }
  catch (erro){
    switch(erro.name){
      case 'DomainError':
        return {ok: false, message: erro.message, name: erro.name}
        break
        
      case 'RepositoryError':
        return {ok: false, message: erro.message, name: erro.name}
        break
        
    }
  }
}

