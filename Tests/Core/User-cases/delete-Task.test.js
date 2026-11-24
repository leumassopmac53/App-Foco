import { describe, it } from 'node:test'
import assert from 'node:assert'
import deleteATask from '#use-cases/delete-Task.js'
import Repository from '#repository'

let bank = {}

const repository = new Repository()

repository.delete = async id => {
  const task = bank[ id ]

  if (task) {
    delete bank[ id ]

    return { ok: true, message: 'deleted' }
  }

  return { ok: false, message: 'not found' }
}

describe('use case: delete a Task', () => {
  it('should delete a Task', async () => {
    bank.JS = {
      id: 'JS',
      title: 'JS',
      completed: true,
      points: 15
    }

    const result = await deleteATask('JS', repository)

    console.log(result.message)
    
    assert.ok(result.ok)
  })

  it('should not delete a Task that does not exist', async () => {
    const result = await deleteATask('HTML', repository)

    assert.equal(result.ok, false)
  })
})