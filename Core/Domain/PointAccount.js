export default class PointAccount {
  #balance = 0
  #maxBalance = 100
  #minBalance = 0
  #maxDebit = 50
  #maxCredit = 50

  debit(amount) {
    if(typeof amount !== 'number') return false
    if(!Number.isFinite(amount)) return false
    if(amount < 0) return false

    if(amount > this.#maxDebit) return false
    if((this.#balance - amount) < this.#minBalance) return false

    this.#balance -= amount
    return true
  }
  
  credit(amount) {
    if(typeof amount !== 'number') return false
    if(!Number.isFinite(amount)) return false
    if(amount < 0) return false

    if(amount > this.#maxCredit) return false
    if((this.#balance + amount) > this.#maxBalance) return false

    this.#balance += amount
    return true
  }

  get balance(){
    return this.#balance
  }
}