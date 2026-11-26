import { describe, it } from 'node:test'
import assert from 'node:assert'
import PointAccount from '#domain/PointAccount.js'

describe('Domain: PointAccount Suite', () => {
  const balance_valid = {
    balance: 0,
    maxBalance: 10000,
    minBalance: 0,
    maxDebit: 50,
    maxCredit: 50
  }

  it('Create instance PointAccount', () => {
    const Balance = new PointAccount(balance_valid)
  })

  describe('PointAccount methods', () => {
    it('get balance', () => {
      const Balance = new PointAccount(balance_valid)

      Balance.credit(10)

      assert.ok(Balance.balance)
    })

    it('credit', () => {
      const Balance = new PointAccount(balance_valid)

      Balance.credit(10)

      assert.strictEqual(10, Balance.balance)
    })

    it('credit: very big', () => {
      const Balance = new PointAccount(balance_valid)

      let modified = false

      if (Balance.credit(100)) modified = true

      assert.strictEqual(modified, false)
    })

    it('credit: type invalid(string)', () => {
      const Balance = new PointAccount(balance_valid)

      let modified = false

      if (Balance.credit('ola amigo')) modified = true

      assert.strictEqual(false, modified)
    })

    it('credit: type invalid(boolean)', () => {
      const Balance = new PointAccount(balance_valid)

      let modified = false

      if (Balance.credit(true)) modified = true

      assert.strictEqual(false, modified)
    })

    it('credit: type invalid(NaN)', () => {
      const Balance = new PointAccount(balance_valid)

      let modified = false

      if (Balance.credit(NaN)) modified = true

      assert.strictEqual(false, modified)
    })

    it('debit', () => {
      const Balance = new PointAccount(balance_valid)

      Balance.credit(10)
      Balance.debit(10)

      assert.strictEqual(0, Balance.balance)
    })

    it('debit: type invalid(string)', () => {
      const Balance = new PointAccount(balance_valid)

      let modified = false

      Balance.credit(30)

      if (Balance.debit('ola amigo')) modified = true

      assert.strictEqual(false, modified)
    })

    it('debit: type invalid(boolean)', () => {
      const Balance = new PointAccount(balance_valid)

      let modified = false

      Balance.credit(30)

      if (Balance.debit(true)) modified = true

      assert.strictEqual(false, modified)
    })

    it('debit: type invalid(NaN)', () => {
      const Balance = new PointAccount(balance_valid)

      let modified = false

      Balance.credit(30)

      if (Balance.debit(NaN)) modified = true

      assert.strictEqual(false, modified)
    })
  })
})