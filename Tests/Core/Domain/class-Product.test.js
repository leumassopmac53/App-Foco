import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import Product from '#domain/Product.js'
import DomainError from '#errors/Domain-error.js'

const product_valid = {
  id: 'product-001',
  name: 'Notebook',
  points: 30,
  description: 'Notebook para estudos',
  category: 'Eletrônicos'
}

describe('Domain: Product Suite', () => {
  describe('class Product', () => {
    it('create a Product instance', () => {
      const product = new Product({ ...product_valid })

      assert.ok(product)
    })

    it('reject non-object arguments', () => {
      assert.throws(() => new Product('invalid'), DomainError)
    })

    describe('reject invalid property types', () => {
      it('reject invalid id type', () => {
        const product = { ...product_valid, id: 123 }

        assert.throws(() => new Product(product), DomainError)
      })

      it('reject invalid name type', () => {
        const product = { ...product_valid, name: 123 }

        assert.throws(() => new Product(product), DomainError)
      })

      it('reject invalid points type', () => {
        const product = { ...product_valid, points: '30' }

        assert.throws(() => new Product(product), DomainError)
      })

      it('reject invalid description type', () => {
        const product = { ...product_valid, description: 123 }

        assert.throws(() => new Product(product), DomainError)
      })

      it('reject invalid category type', () => {
        const product = { ...product_valid, category: 123 }

        assert.throws(() => new Product(product), DomainError)
      })
    })

    describe('reject properties outside their range', () => {
      it('reject id longer than 100 characters', () => {
        const product = {
          ...product_valid,
          id: 'a'.repeat(200)
        }

        assert.throws(() => new Product(product), DomainError)
      })

      it('reject name longer than 100 characters', () => {
        const product = {
          ...product_valid,
          name: 'a'.repeat(200)
        }

        assert.throws(() => new Product(product), DomainError)
      })

      it('reject description longer than 150 characters', () => {
        const product = {
          ...product_valid,
          description: 'a'.repeat(200)
        }

        assert.throws(() => new Product(product), DomainError)
      })

      it('reject category longer than 20 characters', () => {
        const product = {
          ...product_valid,
          category: 'a'.repeat(30)
        }

        assert.throws(() => new Product(product), DomainError)
      })

      it('reject points greater than 100', () => {
        const product = {
        ...product_valid,
      points: 150
      }

      assert.throws(() => new Product(product), DomainError)
      })
    })
  })

  describe('methods of Product', () => {
    it('setDescription should return true', () => {
      const product = new Product({ ...product_valid })

      assert.equal(product.setDescription('Notebook para trabalho'), true)
    })

    it('setName should return true', () => {
      const product = new Product({ ...product_valid })

      assert.equal(product.setName('Desktop'), true)
    })

    it('setCategory should return true', () => {
      const product = new Product({ ...product_valid })

      assert.equal(product.setCategory('Informática'), true)
    })

    it('setPoints should update points and return true', () => {
      const product = new Product({ ...product_valid })
      const points = 50

      assert.ok(product.setPoints(points))
      assert.equal(product.points, points)
    })

    it('setDescription should return false for length greater than 150', () => {
      const product = new Product({ ...product_valid })

      assert.equal(product.setDescription('a'.repeat(200)), false)
    })

    it('setName should return false for length greater than 50', () => {
      const product = new Product({ ...product_valid })

      assert.equal(product.setName('a'.repeat(60)), false)
    })

    it('setCategory should return false for length greater than 20', () => {
      const product = new Product({ ...product_valid })

      assert.equal(product.setCategory('a'.repeat(30)), false)
    })

    it('setPoints should return false for points greater than 100', () => {
      const product = new Product({ ...product_valid })
      const points = 150

      assert.ok(!product.setPoints(points))
      assert.equal(product.points, product_valid.points)
    })
  })
})