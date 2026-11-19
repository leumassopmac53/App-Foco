import test from 'node:test'
import assert from 'node:assert'
import Task from '#domain/Task.js'

test('user-case: Create a Task',t =>{
  const task_valid = {
    id: 'Test-createATask',
    name: 'Test',
    category: 'descritiva',
    description: 'Descrição'
  }
  
  t.test('create a Task',()=>{
    const task = new Task(task_valid)

    assert.equal(Task, task)
  })

  t.test('creata a ')
})