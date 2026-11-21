import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import Product from '#domain/Product.js'
import DomainError from '#errors/Domain-error.js'

describe('Domain: Product Suite', () => {
  describe('class Product', () => {
    it('create a Product instance', () => {
      const product = new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      })
      assert.ok(product)
    })

    it('reject non-object arguments', () => {
      assert.throws(() => new Product('invalid'), DomainError)
    })

    it('reject id longer than 100 characters', () => {
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

    it('reject name longer than 100 characters', () => {
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

    it('reject description longer than 150 characters', () => {
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

    it('reject category longer than 20 characters', () => {
      assert.throws(
        () => new Product({
          id: 'product-001',
          name: 'Notebook',
          description: 'Notebook para estudos',
          category: 'a'.repeat(30)
        }),
        DomainError
      )
    })
  })

  describe('methods of Product', () => {
    it('setDescription should return true', () => {
      const product = new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      })

      assert.equal(product.setDescription('Notebook para trabalho'), true)
    })

    it('setName should return true', () => {
      const product = new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      })

      assert.equal(product.setName('Desktop'), true)
    })

    it('setCategory should return true', () => {
      const product = new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      })

      assert.equal(product.setCategory('Informática'), true)
    })

    it('setDescription should return false for length greater than 150', () => {
      const product = new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      })

      assert.equal(product.setDescription('a'.repeat(200)), false)
    })

    it('setName should return false for length greater than 50', () => {
      const product = new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      })

      assert.equal(product.setName('a'.repeat(60)), false)
    })

    it('setCategory should return false for length greater than 20', () => {
      const product = new Product({
        id: 'product-001',
        name: 'Notebook',
        description: 'Notebook para estudos',
        category: 'Eletrônicos'
      })

      assert.equal(product.setCategory('a'.repeat(30)), false)
    })
  })
})
