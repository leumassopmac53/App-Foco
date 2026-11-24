import { describe, it } from 'node:test'
import assert from 'node:assert'
import createAProduct from '#use-cases/create-Product.js'
import Repository from '#repository'

let bank = {}

const repository = new Repository()

repository.add = Product => {
  bank[Product.id] = Product
}

describe('Use Case Suite: Create a Product', () => {
  const product_valid = {
    id: 'Test-createAProduct',
    name: 'Test',
    points: 10,
    description: 'a test for use case: create a product',
    category: 'test'
  }

  it('create a Product', async () => {
    const product = await createAProduct(product_valid, repository)

    assert.ok(product.ok)
  })

  it('create a Product invalid: parameter is a string', async () => {
    const product = await createAProduct('invalid-string-parameter', repository)

    assert.equal('Not an object', product.message)
  })

  it('create a Product invalid: type invalid id', async () => {
    const product = await createAProduct({ ...product_valid, id: 12 }, repository)

    assert.equal('Invalid property type: id', product.message)
  })

  it('create a Product invalid: type invalid name', async () => {
    const product = await createAProduct({ ...product_valid, name: 10 }, repository)

    assert.equal('Invalid property type: name', product.message)
  })

  it('create a Product invalid: type invalid points', async () => {
    const product = await createAProduct({ ...product_valid, points: '10' }, repository)

    assert.equal('Invalid property type: points', product.message)
  })

  it('create a Product invalid: type invalid description', async () => {
    const product = await createAProduct({ ...product_valid, description: 0 }, repository)

    assert.equal('Invalid property type: description', product.message)
  })

  it('create a Product invalid: id too large', async () => {
    const product = await createAProduct({ ...product_valid, id: 'a'.repeat(1000) }, repository)

    assert.equal('Property length is too large: id', product.message)
  })

  it('create a Product invalid: name too large', async () => {
    const product = await createAProduct({ ...product_valid, name: 'Test '.repeat(1000) }, repository)

    assert.equal('Property length is too large: name', product.message)
  })

  it('create a Product invalid: points out of scope', async () => {
    const product = await createAProduct({ ...product_valid, points: 999999999 }, repository)

    assert.equal('Property value out of scope: points', product.message)
  })

  it('create a Product invalid: description too large', async () => {
    const product = await createAProduct({ ...product_valid, description: 'des'.repeat(1000) }, repository)

    assert.equal('Property length is too large: description', product.message)
  })

  it('create a Product invalid: category too large', async () => {
    const product = await createAProduct({ ...product_valid, category: 'cate'.repeat(1000) }, repository)

    assert.equal('Property length is too large: category', product.message)
  })
})
