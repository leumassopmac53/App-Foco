import test from 'node:test'
import assert from 'node:assert'
import PointAccount from '#domain/PointAccount.js'

test('Create instance PointAccount',()=>{
  const Balance = new PointAccount()
})

test('PointAccount methods',t =>{
  t.test('get balance',()=>{
    const Balance = new PointAccount()

    Balance.credit(10)

    assert.ok(Balance.balance)
  })
  
  t.test('credit',()=>{
    const Balance = new PointAccount()

    Balance.credit(10)

    assert.strictEqual(10,Balance.balance)
  })
  
  t.test('credit: very big',()=>{
    const Balance = new PointAccount()

    let modified = false
    
    if(Balance.credit(100)) modified = true

    assert.strictEqual(modified, false)
  })
  
  t.test('credit: type invalid(string)',()=>{
    const Balance = new PointAccount()

    let modified = false

    if(Balance.credit('ola amigo')) modified = true

    assert.strictEqual(false, modified)
  })
  
  t.test('credit: type invalid(boolean)',()=>{
    const Balance = new PointAccount()

    let modified = false

    if(Balance.credit(true)) modified = true

    assert.strictEqual(false, modified)
  })
  
  t.test('credit: type invalid(NaN)',()=>{
    const Balance = new PointAccount()

    let modified = false

    if(Balance.credit(NaN)) modified = true

    assert.strictEqual(false, modified)
  })
  
  t.test('debit',()=>{
    const Balance = new PointAccount()

    Balance.credit(10)
    Balance.debit(10)

    assert.strictEqual(0,Balance.balance)
  })
  
  t.test('debit: type invalid(string)',()=>{
    const Balance = new PointAccount()

    let modified = false
    
    Balance.credit(30)

    if(Balance.debit('ola amigo')) modified = true

    assert.strictEqual(false, modified)
  })
  
  t.test('debit: type invalid(boolean)',()=>{
    const Balance = new PointAccount()

    let modified = false
    
    Balance.credit(30)

    if(Balance.debit(true)) modified = true

    assert.strictEqual(false, modified)
  })
  
  t.test('debit: type invalid(NaN)',()=>{
    const Balance = new PointAccount()

    let modified = false

    Balance.credit(30)
    
    if(Balance.debit(NaN)) modified = true

    assert.strictEqual(false, modified)
  })
})