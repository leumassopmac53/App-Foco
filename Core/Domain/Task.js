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

    function validateType(vari, type, n){
      if(typeof vari !== type) throw new DomainError(n)
    }

    function validateLength(vari, length, n){
      if(vari.trim().length > length) throw new DomainError(n)
      else if(vari.length === 0) throw new DomainError(n)
    }

    if(typeof task !== 'object') throw new DomainError("Not an object")
    if(Array.isArray(task)) throw new DomainError("Not an object")
    if(task === null) throw new DomainError("Not an object")

    for(let k of Object.keys(task)){
      if(!['id','title', 'points', 'completed'].includes(k)) throw new DomainError(`Property out of scope`)
    }

    validateType(id, 'string', "Invalid property type: id")
    
    validateType(title, 'string', "Invalid property type: title")
    
    validateType(points, 'number', "Invalid property type: points")
    if(!Number.isFinite(points)) throw new DomainError("Points is not a number")
    if(points < 0) throw new DomainError("Invalid points value")
    
    validateType(completed, 'boolean', "Invalid property type: completed")

    validateLength(id, 100, "Property length is too large: id")
    validateLength(title, 50, "Property length is too large: title")
    if(points > 1000) throw new DomainError("Property length is too large: points")
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
