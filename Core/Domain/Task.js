import DomainError from '#errors/Domain-error.js'

export default class Task {
  #id
  #title
  #points
  #completed

  constructor(task){
    this.#validateInput(task)

    const {id, title, points, completed} = task

    this.#id = id
    this.#title = title
    this.#points = points
    this.#completed = completed
  }

  complete(){
    if(this.#completed) return false

    this.#completed = true
    return true
  }
  
  incomplete(){
    if(!this.#completed) return false

    this.#completed = false
    return true
  }

  #validateInput(task){
    const {id, title, points, completed} = task

    function validateType(vari, type){
      if(typeof vari !== type) throw new DomainError(`type of ${vari} invalid`)
    }

    function validateLength(vari, length){
      if(vari.length > length) throw new DomainError(`${vari} length very large`)
    }

    if(typeof task !== 'object') throw new DomainError("not's Object")
    if(Array.isArray(task)) throw new DomainError("not's Object")
    if(task === null) throw new DomainError("not's Object")

    for(let k of Object.keys(task)){
      if(!['id','title', 'points', 'completed'].includes(k)) throw new DomainError(`property ${k} invalid`)
    }

    validateType(id, 'string')
    validateType(title, 'string')
    validateType(points, 'number')
    validateType(completed, 'boolean')

    validateLength(id, 100)
    validateLength(title, 50)

    if(!Number.isFinite(points)) throw new DomainError("points not's number")
    if(points < 0) throw new DomainError('points value invalid')
  }

  get id(){
    return this.#id
  }
  
  get title(){
    return this.#title
  }
  
  get points(){
    return this.#points
  }
  
  get completed(){
    return this.#completed
  }
}