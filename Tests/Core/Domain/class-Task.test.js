
import test from 'node:test'
import assert from 'node:assert'
import Task from '#domain/Task.js'
import DomainError from '#errors/Domain-error.js'

const validTask = {
  id: '12345',
  title: 'JS',
  points: 50,
  completed: false
}

test('Create Task instance', t => {
  t.test('should create a Task instance', () => {
    const task = new Task(validTask)
    assert.ok(task instanceof Task)
    assert.strictEqual(task.id, validTask.id)
    assert.strictEqual(task.title, validTask.title)
    assert.strictEqual(task.points, validTask.points)
    assert.strictEqual(task.completed, validTask.completed)
  })

  t.test('Task instance invalid: type of id invalid', () => {
    assert.throws(() => {
      const task = new Task({...validTask, id: 12})
    }, DomainError)
  })

  t.test('Task instance invalid: type of title invalid', () => {
    assert.throws(() => {
      const task = new Task({...validTask, title: 12})
    }, DomainError)
  })

  t.test('Task instance invalid: type of points invalid', () => {
    assert.throws(() => {
      const task = new Task({...validTask, points: '12'})
    }, DomainError)
  })

  t.test('Task instance invalid: type of points invalid (NaN: not a number)', () => {
    assert.throws(() => {
      const task = new Task({...validTask, points: NaN})
    }, DomainError)
  })

  t.test('Task instance invalid: type of completed invalid', () => {
    assert.throws(() => {
      const task = new Task({...validTask, completed: 12})
    }, DomainError)
  })

  t.test('Task instance invalid: do not accept properties outside the scope', () => {
    assert.throws(() => {
      const task = new Task({...validTask, content: 'Estudando JS'})
    }, DomainError)
  })

  t.test('Task instance invalid: id size out of range', () => {
    assert.throws(() => {
      const task = new Task({...validTask, id: 'k'.repeat(101)})
    }, DomainError)
  })

  t.test('Task instance invalid: title size out of range', () => {
    assert.throws(() => {
      const task = new Task({...validTask, title: 'k'.repeat(101)})
    }, DomainError)
  })
})

test('Methods of Class Task', t => {
  t.test('method complete', () => {
    const task = new Task(validTask)

    task.complete()

    assert.strictEqual(task.completed, true)
  })

  t.test('method incomplete', () => {
    const task = new Task({...validTask, completed: true})

    task.incomplete()

    assert.strictEqual(task.completed, false)
  })

  t.test('method complete: to call complete failure because completed is true', () => {
    const task = new Task({...validTask, completed: true})

    let callSuccess = false

    if (task.complete()) callSuccess = true

    assert.strictEqual(callSuccess, false)
  })

  t.test('method incomplete: to call incomplete failure because completed is false', () => {
    const task = new Task(validTask)

    let callSuccess = false

    if (task.incomplete()) callSuccess = true

    assert.strictEqual(callSuccess, false)
  })

  t.test('method complete: double to call complete failure', () => {
    const task = new Task(validTask)

    let double = false

    task.complete()
    if (task.complete()) double = true

    assert.strictEqual(double, false)
  })

  t.test('method incomplete: double to call complete failure', () => {
    const task = new Task({...validTask, completed: true})

    let double = false

    task.incomplete()
    if (task.incomplete()) double = true

    assert.strictEqual(double, false)
  })
})
