import { it, describe } from 'node:test'
import assert from 'node:assert'
import Repository from '#repository'
import sellProduct from '#use-cases/sell-Product.js'

describe('use case: sell a product', () => {
  it('case valid', async () => {
    const bank = {
      prod_01: {
        id: 'prod_01',
        name: 'Caneta',
        description: 'Uma caneta azul',
        category: 'escritório',
        points: 30
      }
    }

    let config_balance = {
      balance: 100,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = new Repository()

    repository.findById = async id => {
      const product = bank[ id ]

      if (!product) return { ok: false, message: 'not found' }

      return { ok: true, content: product }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => {
      config_balance = config
    }

    repository.delete = async id => {
      if (!Object.hasOwn(bank, id)) return { ok: false, message: "product don't delete" }

      return { ok: true, message: "product's delete" }
    }

    const result = await sellProduct('prod_01', repository)

    assert.ok(result.ok)
    assert.equal(70, config_balance.balance)
  })

  it("case invalid: repository isn't instance of entity Repository", async () => {
    const bank = {
      prod_01: {
        id: 'prod_01',
        name: 'Caneta',
        description: 'Uma caneta azul',
        category: 'escritório',
        points: 30
      }
    }

    let config_balance = {
      balance: 100,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = {}

    repository.findById = async id => {
      const product = bank[ id ]

      if (!product) return { ok: false, message: 'not found' }

      return { ok: true, content: product }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => {
      config_balance = config
    }

    repository.delete = async id => {
      if (!Object.hasOwn(bank, id)) return { ok: false, message: "product don't delete" }

      return { ok: true, message: "product's delete" }
    }

    const result = await sellProduct('prod_01', repository)

    assert.ok(!result.ok)
    assert.equal(result.message, 'repository invalid')
  })

  it('case invalid: product not found', async () => {
    const bank = {}

    let config_balance = {
      balance: 100,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = new Repository()

    repository.findById = async id => {
      const product = bank[ id ]

      if (!product) return { ok: false, message: 'not found' }

      return { ok: true, content: product }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => {
      config_balance = config
    }

    repository.delete = async id => {
      if (!Object.hasOwn(bank, id)) return { ok: false, message: "product don't delete" }

      return { ok: true, message: "product's delete" }
    }

    const result = await sellProduct('prod_99', repository)

    assert.ok(!result.ok)
    assert.equal(result.message, 'not found')
    assert.equal(100, config_balance.balance)
  })

  it('case invalid: product points value out scope', async () => {
    const bank = {
      prod_01: {
        id: 'prod_01',
        name: 'Caneta',
        description: 'Uma caneta azul',
        category: 'escritório',
        points: 200
      }
    }

    let config_balance = {
      balance: 100,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = new Repository()

    repository.findById = async id => {
      const product = bank[ id ]

      if (!product) return { ok: false, message: 'not found' }

      return { ok: true, content: product }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => {
      config_balance = config
    }

    repository.delete = async id => {
      if (!Object.hasOwn(bank, id)) return { ok: false, message: "product don't delete" }

      return { ok: true, message: "product's delete" }
    }

    const result = await sellProduct('prod_01', repository)

    assert.ok(!result.ok)
    assert.equal(result.name, 'DomainError')
    assert.equal(result.message, 'Property value out of scope: points')
    assert.equal(100, config_balance.balance)
  })

  it('case invalid: debit exceeds maxDebit limit', async () => {
    const bank = {
      prod_01: {
        id: 'prod_01',
        name: 'Caneta',
        description: 'Uma caneta azul',
        category: 'escritório',
        points: 80
      }
    }

    let config_balance = {
      balance: 100,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = new Repository()

    repository.findById = async id => {
      const product = bank[ id ]

      if (!product) return { ok: false, message: 'not found' }

      return { ok: true, content: product }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => {
      config_balance = config
    }

    repository.delete = async id => {
      if (!Object.hasOwn(bank, id)) return { ok: false, message: "product don't delete" }

      return { ok: true, message: "product's delete" }
    }

    const result = await sellProduct('prod_01', repository)

    assert.ok(!result.ok)
    assert.equal(100, config_balance.balance)
  })
})
