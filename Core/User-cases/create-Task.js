import Task from '#domain/Task.js'

export default function createTask(t){
  try {
    const task = new Task(t)

    return task
  }
  catch(erro){
    if(erro.name === 'DomainError'){
      return erro.message
    }

    console.log(erro.name, 'my error')
    throw erro
  }
}