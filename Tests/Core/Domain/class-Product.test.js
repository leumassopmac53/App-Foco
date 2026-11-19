import DomainError from '#errors/Domain-error.js'

import test from 'node:test'
import assert from 'node:assert/strict'
import Product from '#domain/Product.js'

test('class Product', t => {
  t.test('create a Product instance', t => {
    const product = new Product({
      id: 'product-001',
      name: 'Notebook',
      description: 'Notebook para estudos',
      category: 'Eletrônicos'
    })
  })

  t.test('reject non-object arguments', t => {
    assert.throws(() => new Product('invalid'), DomainError)
  })

  t.test('reject id longer than 100 characters', t => {
    assert.throws(
      () => new Product({
        id: 'a'.repeat(200),
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      }),
      DomainError
    )
  })

  t.test('reject name longer than 100 characters', t => {
    assert.throws(
      () => new Product({
        id: 'product-001',
        name: 'a'.repeat(200),
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      }),
      DomainError
    )
  })

  t.test('reject description longer than 100 characters', t => {
    assert.throws(
      () => new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'a'.repeat(200),
        category: 'Eletrônicos'
      }),
      DomainError
    )
  })

  t.test('reject category longer than 100 characters', t => {
    assert.throws(
      () => new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'a'.repeat(200)
      }),
      DomainError
    )
  })
})

test('methods of Product', t => {
  t.test('setDescription should return true', t => {
    const product = new Product({
      id: 'product-001',
      name: 'Notebook',
      description: 'Notebook para estudos',
      category: 'Eletrônicos'
    })

    assert.equal(product.setDescription('Notebook para trabalho'), true)
  })

  t.test('setName should return true', t => {
    const product = new Product({
      id: 'product-001',
      name: 'Notebook',
      description: 'Notebook para estudos',
      category: 'Eletrônicos'
    })

    assert.equal(product.setName('Desktop'), true)
  })

  t.test('setCategory should return true', t => {
    const product = new Product({
      id: 'product-001',
      name: 'Notebook',
      description: 'Notebook para estudos',
      category: 'Eletrônicos'
    })

    assert.equal(product.setCategory('Informática'), true)
  })

  t.test('setDescription should return false for length greater than 200', t => {
    const product = new Product({
      id: 'product-001',
      name: 'Notebook',
      description: 'Notebook para estudos',
      category: 'Eletrônicos'
    })

    assert.equal(product.setDescription('a'.repeat(201)), false)
  })

  t.test('setName should return false for length greater than 200', t => {
    const product = new Product({
      id: 'product-001',
      name: 'Notebook',
      description: 'Notebook para estudos',
      category: 'Eletrônicos'
    })

    assert.equal(product.setName('a'.repeat(201)), false)
  })

  t.test('setCategory should return false for length greater than 200', t => {
    const product = new Product({
      id: 'product-001',
      name: 'Notebook',
      description: 'Notebook para estudos',
      category: 'Eletrônicos'
    })

    assert.equal(product.setCategory('a'.repeat(201)), false)
  })
})