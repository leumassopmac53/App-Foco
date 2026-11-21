import Task from '#domain/Task.js'
import TaskRepository from '#repository/repository-Task.js'

export default async function createTask(t){
  try {
    const task = new Task(t)

    const {id, title, points, completed} = task
    
    await TaskRepository.add({
      id, title, points, completed
    })

    return {ok: true, message: '', name: ''}
  }
  catch(erro){
    switch(erro.name){
      case 'DomainError':
        return {ok: true, message: erro.message, name: erro.name}
        break
        
      case 'RepositoryError':
        return {ok: true, message: erro.message, name: erro.name}
        break

      default:
        throw erro
        break
    }
  }
}