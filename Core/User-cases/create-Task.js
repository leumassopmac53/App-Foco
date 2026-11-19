import Task from '#domain/Task.js'

export default function createTask(task){
  try {
    const task = new Task(task)
  }
  catch(erro){
    if(erro.name === 'DomainError'){
      return erro.message
    }

    throw erro
  }
}