import test from 'node:test'
import assert from 'node:assert'
import Task from '#domain/Task.js'
import createATask from '#user-cases/create-Task.js'

test('user-case: Create a Task', t => {
  const task_valid = {
    id: 'Test-createATask',
    title: 'Test',
    points: 10,
    completed: false
  }

  t.test('create a Task', () => {
    const task = createATask(task_valid)

    assert.ok(task instanceof Task)
  })

  t.test('create a Task invalid: parameter is a string', () => {
    const task = createATask('invalid-string-parameter')

    assert.equal("not's Object", task)
  })

  t.test('create a Task invalid: type invalid id', () => {
    const task = createATask({...task_valid, id: 12})

    assert.equal('type of property invalid', task)
  })

  t.test('create a Task invalid: type invalid title', () => {
    const task = createATask({...task_valid, title: 10})

    assert.equal('type of property invalid', task)
  })

  t.test('create a Task invalid: type invalid points', () => {
    const task = createATask({...task_valid, points: '10'})

    assert.equal('type of property invalid', task)
  })

  t.test('create a Task invalid: type invalid completed', () => {
    const task = createATask({...task_valid, completed: 0})

    assert.equal('type of property invalid', task)
  })

  t.test('create a Task invalid: id too large', () => {
    const task = createATask({ ...task_valid, id: 'a'.repeat(1000) })

    assert.equal('type of property invalid', task)
  })

  t.test('create a Task invalid: title too large', () => {
    const task = createATask({ ...task_valid, title: 'Test '.repeat(1000) })

    assert.equal('type of property invalid', task)
  })

  t.test('create a Task invalid: points too large', () => {
    const task = createATask({ ...task_valid, points: 999999999 })

    assert.equal('type of property invalid', task)
  })
})
