import { describe, it } from 'node:test'
import assert from 'node:assert'
import Task from '#domain/Task.js'
import createATask from '#user-cases/create-Task.js'

describe('Use Case Suite: Create a Task', () => {
  const task_valid = {
    id: 'Test-createATask',
    title: 'Test',
    points: 10,
    completed: false
  }

  it('create a Task', async () => {
    const task = await createATask(task_valid)
  })

  it('create a Task invalid: parameter is a string', async () => {
    const task = await createATask('invalid-string-parameter')

    assert.equal("Not an object", task.message)
  })

  it('create a Task invalid: type invalid id', async () => {
    const task = await createATask({ ...task_valid, id: 12 })

    assert.equal('Invalid property type: id', task.message)
  })

  it('create a Task invalid: type invalid title', async () => {
    const task = await createATask({ ...task_valid, title: 10 })

    assert.equal('Invalid property type: title', task.message)
  })

  it('create a Task invalid: type invalid points', async () => {
    const task = await createATask({ ...task_valid, points: '10' })

    assert.equal('Invalid property type: points', task.message)
  })

  it('create a Task invalid: type invalid completed', async () => {
    const task = await createATask({ ...task_valid, completed: 0 })

    assert.equal('Invalid property type: completed', task.message)
  })

  it('create a Task invalid: id too large', async () => {
    const task = await createATask({ ...task_valid, id: 'a'.repeat(1000) })

    assert.equal('Property length is too large: id', task.message)
  })

  it('create a Task invalid: title too large', async () => {
    const task = await createATask({ ...task_valid, title: 'Test '.repeat(1000) })

    assert.equal('Property length is too large: title', task.message)
  })

  it('create a Task invalid: points too large', async () => {
    const task = await createATask({ ...task_valid, points: 999999999 })

    assert.equal('Property length is too large: points', task.message)
  })
})
