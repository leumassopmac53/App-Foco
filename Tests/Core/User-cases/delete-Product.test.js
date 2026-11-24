import { describe, it } from 'node:test'
import assert from 'node:assert'
import deleteAProduct from '#use-cases/delete-Product.js'
import Repository from '#repository'

let bank = {}

const repository = new Repository()

repository.delete = async id => {
  const product = bank[ id ]

  if (product) {
    delete bank[ id ]

    return { ok: true, message: 'deleted' }
  }

  return { ok: false, message: 'not found' }
}

describe('use case: delete a Product', () => {
  it('should delete a Product', async () => {
    bank.JS = {
      id: 'JS',
      name: 'JS',
      description: 'JavaScript',
      points: 15,
      category: 'programming'
    }

    const result = await deleteAProduct('JS', repository)

    console.log(result.message)

    assert.ok(result.ok)
  })

  it('should not delete a Product that does not exist', async () => {
    const result = await deleteAProduct('HTML', repository)

    assert.equal(result.ok, false)
  })
})