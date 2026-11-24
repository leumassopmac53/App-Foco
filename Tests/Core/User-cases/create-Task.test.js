
import { describe, it } from 'node:test'
import assert from 'node:assert'
import createATask from '#use-cases/create-Task.js'
import Repository from '#repository'

let bank = {}

const repository = new Repository()

repository.add = task => {
  bank[task.id] = task
}

describe('Use Case Suite: Create a Task', () => {
  const task_valid = {
    id: 'Test-createATask',
    title: 'Test',
    points: 10,
    completed: false
  }

  it('create a Task', async () => {
    const task = await createATask(task_valid, repository)

    assert.ok(task.ok)
  })

  it('create a Task invalid: parameter', async () => {
    const paramaters = [
      null,
      [],
      'string',
      10,
    ]

    for(let p of paramaters){
      const task = await createATask(p, repository)

      assert.equal('Not an Object', task.message)
    }
  })

  it('create a Task invalid: type invalid id', async () => {
    const task = await createATask({ ...task_valid, id: 12 }, repository)

    assert.equal('Invalid property type: id', task.message)
  })

  it('create a Task invalid: type invalid title', async () => {
    const task = await createATask({ ...task_valid, title: 10 }, repository)

    assert.equal('Invalid property type: title', task.message)
  })

  it('create a Task invalid: type invalid points', async () => {
    const task = await createATask({ ...task_valid, points: '10' }, repository)

    assert.equal('Invalid property type: points', task.message)
  })

  it('create a Task invalid: type invalid completed', async () => {
    const task = await createATask({ ...task_valid, completed: 0 }, repository)

    assert.equal('Invalid property type: completed', task.message)
  })

  it('create a Task invalid: id too large', async () => {
    const task = await createATask({ ...task_valid, id: 'a'.repeat(1000) }, repository)

    assert.equal('Property length is too large: id', task.message)
  })

  it('create a Task invalid: title too large', async () => {
    const task = await createATask({ ...task_valid, title: 'Test '.repeat(1000) }, repository)

    assert.equal('Property length is too large: title', task.message)
  })

  it('create a Task invalid: points too large', async () => {
    const task = await createATask({ ...task_valid, points: 999999999 }, repository)

    assert.equal('Property length is too large: points', task.message)
  })
})
