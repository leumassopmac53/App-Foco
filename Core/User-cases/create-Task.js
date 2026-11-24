import Task from '#domain/Task.js'

export default async function createTask(t, repository){
  try {
    const task = new Task(t)

    const {id, title, points, completed} = task
    
    await repository.add({
      id, title, points, completed
    })

    return {ok: true, message: '', name: ''}
  }
  catch(erro){
    switch(erro.name){
      case 'DomainError':
        return {ok: false, message: erro.message, name: erro.name}
        break
        
      case 'RepositoryError':
        return {ok: false, message: erro.message, name: erro.name}
        break

      default:
        throw erro
        break
    }
  }
}