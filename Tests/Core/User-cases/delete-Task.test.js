import { describe, it } from 'node:test'
import assert from 'node:assert'
import deleteATask from '#use-cases/create-Task.js'
import repositoryTask from '#repository/repository-Task.js'

let bank = {}

repositoryTask.delete = id => {
  const task = bank[ id ]

  if (task) {
    delete bank[ id ]

    return { ok: true, message: 'deleted' }
  }

  return { ok: false, message: 'not found' }
}

describe('use case: delete a Task', () => {
  it('should delete a Task', () => {
    bank.JS = {
      id: 'JS',
      title: 'JS',
      completed: true,
      points: 15
    }

    assert.ok(repositoryTask.delete('JS').ok)
  })

  it('should not delete a Task that does not exist', () => {
    const result = repositoryTask.delete('HTML')

    assert.equal(result.ok, false)
  })
})