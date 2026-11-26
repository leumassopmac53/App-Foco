import { it, describe } from 'node:test'
import assert from 'node:assert'
import Repository from '#repository'
import completeATask from '#use-cases/complete-Task.js'

describe('use case: complete a task', () => {
  it('case valid', async () => {
    const bank = {
      task_01: {
        id: 'samuel',
        title: 'Um menino',
        points: 20,
        completed: false
      }
    }

    let config_balance = {
      balance: 0,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = new Repository()

    repository.findById = async id => {
      const task = bank[ id ]

      if (!task) return { ok: false, message: 'not found' }

      return { ok: true, content: task }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => config_balance = config

    repository.delete = async id =>{
      if(!Object.hasOwn(bank, id)) return {ok: false, message: "task dont't delete"}
      
      return {ok: true, message: "task's delete"}
    }
    
    await completeATask('task_01', repository)

    assert.equal(20, config_balance.balance)
  })
  
  it("case invalid: repository isn't intance of entity Repository", async () => {
    const bank = {
      task_01: {
        id: 'samuel',
        title: 'Um menino',
        points: 20,
        completed: false
      }
    }

    let config_balance = {
      balance: 0,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = {}

    repository.findById = async id => {
      const task = bank[ id ]

      if (!task) return { ok: false, message: 'not found' }

      return { ok: true, content: task }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => config_balance = config

    repository.delete = async id =>{
      if(!Object.hasOwn(bank, id)) return {ok: false, message: "task dont't delete"}
      
      return {ok: true, message: "task's delete"}
    }
    
    const result = await completeATask('task_01', repository)

    assert.ok(!result.ok)
    assert.equal('repository invalid', result.message)
  })

  it('case invalid: task was complete', async () => {
    const bank = {
      task_01: {
        id: 'samuel',
        title: 'Um menino',
        points: 20,
        completed: true
      }
    }

    let config_balance = {
      balance: 0,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = new Repository()

    repository.findById = async id => {
      const task = bank[ id ]

      if (!task) return { ok: false, message: 'not found' }

      return { ok: true, content: task }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => config_balance = config

    repository.delete = async id =>{
      if(!Object.hasOwn(bank, id)) return {ok: false, message: "task dont't delete"}
      
      return {ok: true, message: "task's delete"}
    }

    await completeATask('task_01', repository)

    assert.equal(0, config_balance.balance)
  })
  
  it('case invalid: task points out scope', async () => {
    const bank = {
      task_01: {
        id: 'samuel',
        title: 'Um menino',
        points: 90,
        completed: false
      }
    }

    let config_balance = {
      balance: 0,
      maxBalance: 1000,
      minBalance: 0,
      maxDebit: 50,
      maxCredit: 50
    }

    const repository = new Repository()

    repository.findById = async id => {
      const task = bank[ id ]

      if (!task) return { ok: false, message: 'not found' }

      return { ok: true, content: task }
    }

    repository.getPointAccount = async () => config_balance

    repository.setPointAccount = async config => config_balance = config

    repository.delete = async id =>{
      if(!Object.hasOwn(bank, id)) return {ok: false, message: "task dont't delete"}
      
      return {ok: true, message: "task's delete"}
    }

    const result = await completeATask('task_01', repository)

    assert.equal(0, config_balance.balance)
    assert.equal(result.message, 'task points value out scope')
  })
})