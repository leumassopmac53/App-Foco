import test from 'node:test'
import assert from 'node:assert'

import Marcket from '#domain/Marcket.js'
import Product from '#domain/Product.js'

test('class Marcket',t =>{
  const Poco_m3 = {
    id: 'Poco_m3-01',
    name: 'Poco_m3',
    description: 'Um smarphone da redmi',
    category: 'smarphone'
  }
  
  t.test('add a product', ()=>{
    const product = new Product(Poco_m3)
    const marcket = new Marcket()

    assert.equal(marcket.add(product), true)
  })
  
  t.test('remove a product', ()=>{
    const product = new Product(Poco_m3)
    const marcket = new Marcket()

    marcket.add(product)
    
    assert.equal(marcket.remove(product), true)
  })

  t.test("can't alter product of products",()=>{
    assert.throws(()=>{
      const product = new Product(Poco_m3)
      const marcket = new Marcket()

      marcket.add(product)

      marcket.products[product.id].name = 'hello wolrd'
    }, TypeError)
  })
  
  t.test("can't alter products of marcket",()=>{
    assert.throws(()=>{
      const product = new Product(Poco_m3)
      const marcket = new Marcket()

      marcket.add(product)

      marcket.products = {}
    }, TypeError)
  })

  t.test("cant'n double adds product",()=>{
    const product = new Product(Poco_m3)
    const marcket = new Marcket()

    marcket.add(product)

    assert.equal(marcket.add(product), false)
  })
  
  t.test("cant'n double removes product",()=>{
    const product = new Product(Poco_m3)
    const marcket = new Marcket()

    marcket.add(product)
    marcket.remove(product)

    assert.equal(marcket.remove(product), false)
  })
})