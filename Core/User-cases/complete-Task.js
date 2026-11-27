import PointAccount from '#domain/PointAccount.js'
import Task from '#domain/Task.js'
import Repository from '#repository'

export default async function completeTask(id, repository) {
  try {
    if(!(repository instanceof Repository)) return {ok: false, message: 'repository invalid'}
    
    const account = new PointAccount(await repository.getPointAccount())

    const t = await repository.findById(id)

    if (!t.ok) return t

    const task = new Task(t.content)

    if (!task.complete()) return { ok: false, message: 'task was complete' }

    if (!account.credit(task.points)) return { ok: false, message: 'task points value out scope' }

    await repository.delete(id)
    
    const { balance, maxBalance, minBalance, maxCredit, maxDebit } = account
    await repository.setPointAccount({
      balance,
      maxBalance,
      minBalance,
      maxCredit,
      maxDebit
    })

    return { ok: true, message: 'completed' }
  }

  catch (erro) {
    switch (erro.name) {
      case 'DomainError':
        return {
          ok: false,
          name: erro.name,
          message: erro.message
        }
        break

      case 'RepositoryError':
        return {
          ok: false,
          name: erro.name,
          message: erro.message
        }
        break

      default:
        throw erro
    }
  }
}