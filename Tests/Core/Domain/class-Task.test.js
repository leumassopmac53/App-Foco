import { describe, it } from 'node:test'
import assert from 'node:assert'
import Task from '#domain/Task.js'
import DomainError from '#errors/Domain-error.js'

const validTask = {
  id: '12345',
  title: 'JS',
  points: 50,
  completed: false
}

describe('Domain: Task Suite', () => {
  describe('Create Task instance', () => {
    it('should create a Task instance', () => {
      const task = new Task(validTask)
      assert.ok(task)
    })

    it('Task instance invalid: type of id invalid', () => {
      assert.throws(() => {
        new Task({ ...validTask, id: 12 })
      }, DomainError)
    })

    it('Task instance invalid: type of title invalid', () => {
      assert.throws(() => {
        new Task({ ...validTask, title: 12 })
      }, DomainError)
    })

    it('Task instance invalid: type of points invalid', () => {
      assert.throws(() => {
        new Task({ ...validTask, points: '12' })
      }, DomainError)
    })

    it('Task instance invalid: type of points invalid (NaN: not a number)', () => {
      assert.throws(() => {
        new Task({ ...validTask, points: NaN })
      }, DomainError)
    })

    it('Task instance invalid: type of completed invalid', () => {
      assert.throws(() => {
        new Task({ ...validTask, completed: 12 })
      }, DomainError)
    })

    it('Task instance invalid: do not accept properties outside the scope', () => {
      assert.throws(() => {
        new Task({ ...validTask, content: 'Estudando JS' })
      }, DomainError)
    })

    it('Task instance invalid: id size out of range', () => {
      assert.throws(() => {
        new Task({ ...validTask, id: 'k'.repeat(101) })
      }, DomainError)
    })

    it('Task instance invalid: title size out of range', () => {
      assert.throws(() => {
        new Task({ ...validTask, title: 'k'.repeat(101) })
      }, DomainError)
    })

    it('Task instance invalid: points size out of range', () => {
      assert.throws(() => {
        new Task({ ...validTask, points: 99999 })
      }, DomainError)
    })
  })

  describe('Methods of Class Task', () => {
    it('method complete', () => {
      const task = new Task(validTask)

      task.complete()

      assert.strictEqual(task.completed, true)
    })

    it('method incomplete', () => {
      const task = new Task({ ...validTask, completed: true })

      task.incomplete()

      assert.strictEqual(task.completed, false)
    })

    it('method complete: to call complete failure because completed is true', () => {
      const task = new Task({ ...validTask, completed: true })

      let callSuccess = false

      if (task.complete()) callSuccess = true

      assert.strictEqual(callSuccess, false)
    })

    it('method incomplete: to call incomplete failure because completed is false', () => {
      const task = new Task(validTask)

      let callSuccess = false

      if (task.incomplete()) callSuccess = true

      assert.strictEqual(callSuccess, false)
    })

    it('method complete: double to call complete failure', () => {
      const task = new Task(validTask)

      let double = false

      task.complete()
      if (task.complete()) double = true

      assert.strictEqual(double, false)
    })

    it('method incomplete: double to call complete failure', () => {
      const task = new Task({ ...validTask, completed: true })

      let double = false

      task.incomplete()
      if (task.incomplete()) double = true

      assert.strictEqual(double, false)
    })
  })
})
