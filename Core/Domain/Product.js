import DomainError from '#errors/Domain-error.js'

class Product {
  #id
  #name
  #description
  #category
  
  constructor(product){
    this.#validate(product)

    const {id, name, description, category} = product

    this.#id = id
    this.#name = name
    this.#category = category
    this.#description = description
  }

  #validate(product){
    function validateType(o, t, m = 'type'){
      if(typeof o !== t) throw new DomainError(m)
    }

    function validateLength(o, l, m){
      if(o.trim().length > l) throw new DomainError(m)
      else if(o.length === 0) throw new DomainError(m)
    }
    
    if(typeof product !== 'object') throw new DomainError("not's object")
    if(Array.isArray(product)) throw new DomainError("not's object")
    if(product === null) throw new DomainError("not's object")
    
    const {id, name, description, category} = product

    for(let k of Object.keys(product)){
      if(!['id', 'name', 'description', 'category'].includes(k)) throw new DomainError('property out scope')
    }

    validateType(id, 'string', 'type of id invalid')
    validateType(name, 'string', 'type of name invalid')
    validateType(description, 'string', 'type of description invalid')
    validateType(category, 'string', 'type of category invalid')

    validateLength(id, 100, 'id length large')
    validateLength(name, 50, 'name length large')
    validateLength(category, 20, 'category length large')
    validateLength(description, 150, 'description length large')
  }

  setName(i){
    if(typeof i !== 'string') return false
    if(i.length > 50) return false
    else if(i.trim().length === 0) return false

    this.#name = i
    return true
  }
  
  setDescription(i){
    if(typeof i !== 'string') return false
    if(i.length > 150) return false
    else if(i.trim().length === 0) return false

    this.#description = i
    return true
  }
  
  setCategory(i){
    if(typeof i !== 'string') return false
    if(i.length > 20) return false
    else if(i.trim().length === 0) return false

    this.#category = i
    return true
  }

  get id(){
    return this.#id
  }
  
  get name(){
    return this.#name
  }
  
  get description(){
    return this.#description
  }
  
  get category(){
    return this.#category
  }
}

export default Product