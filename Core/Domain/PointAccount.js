export default class PointAccount {
  #balance
  #maxBalance
  #minBalance
  #maxDebit
  #maxCredit

  #validate(config) {
    if (
      typeof config !== 'object' ||
      config === null
    ) throw new DomainError(config, "isn't object")

    if(
      !Object.hasOwn(config, 'balance') ||
      !Object.hasOwn(config, 'minBalance') ||
      !Object.hasOwn(config, 'maxBalance') ||
      !Object.hasOwn(config, 'maxDebit') ||
      !Object.hasOwn(config, 'maxCredit') 
    ) throw new DomainError(config, 'invalid')

    Object.keys(config).forEach(k => {
      if (![
        'balance',
        'maxBalance',
        'minBalance',
        'maxDebit',
        'maxCredit',
      ].includes(k)) throw new DomainError('property', k, 'invalid')
        
        if (
          typeof k !== 'number' ||
          !Number.isFinite(k)
        ) throw new DomainError(config, "isn't number")
    })


  }

  constructor(config){
    this.#validate(config)

    const {balance, maxBalance, minBalance, maxDebit, maxCredit} = config

    this.#balance = balance
    this.#maxBalance = maxBalance
    this.#minBalance = minBalance
    this.#maxCredit = maxCredit
    this.#maxDebit = maxDebit
  }

  debit(amount) {
    if (typeof amount !== 'number') return false
    if (!Number.isFinite(amount)) return false
    if (amount < 0) return false

    if (amount > this.#maxDebit) return false
    if ((this.#balance - amount) < this.#minBalance) return false

    this.#balance -= amount
    return true
  }

  credit(amount) {
    if (typeof amount !== 'number') return false
    if (!Number.isFinite(amount)) return false
    if (amount < 0) return false

    if (amount > this.#maxCredit) return false
    if ((this.#balance + amount) > this.#maxBalance) return false

    this.#balance += amount
    return true
  }

  get balance() {
    return this.#balance
  }
}