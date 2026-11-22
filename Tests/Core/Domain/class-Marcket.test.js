import { describe, it } from 'node:test'
import assert from 'node:assert'

import Marcket from '#domain/Marcket.js'
import Product from '#domain/Product.js'

describe('Domain: Marcket Suite', () => {
  const Poco_m3 = {
    id: 'Poco_m3-01',
    name: 'Poco_m3',
    points: 30,
    description: 'Um smarphone da redmi',
    category: 'smarphone'
  }
  
  describe('class Marcket', () => {
    it("can't add non-product", () => {
      const marcket = new Marcket()

      assert.equal(marcket.add("not an product"), false)
    })
    
    it('add a product', () => {
      const product = new Product(Poco_m3)
      const marcket = new Marcket()

      assert.equal(marcket.add(product), true)
    })
    
    it('remove a product', () => {
      const product = new Product(Poco_m3)
      const marcket = new Marcket()

      marcket.add(product)
      
      assert.equal(marcket.remove(product), true)
    })

    it("can't alter product of products", () => {
      assert.throws(() => {
        const product = new Product(Poco_m3)
        const marcket = new Marcket()

        marcket.add(product)

        marcket.products[product.id].name = 'hello wolrd'
      }, TypeError)
    })
    
    it("can't alter products of marcket", () => {
      assert.throws(() => {
        const product = new Product(Poco_m3)
        const marcket = new Marcket()

        marcket.add(product)

        marcket.products = {}
      }, TypeError)
    })

    it("can't double adds product", () => {
      const product = new Product(Poco_m3)
      const marcket = new Marcket()

      marcket.add(product)

      assert.equal(marcket.add(product), false)
    })
    
    it("can't double removes product", () => {
      const product = new Product(Poco_m3)
      const marcket = new Marcket()

      marcket.add(product)
      marcket.remove(product)

      assert.equal(marcket.remove(product), false)
    })
  })
})
