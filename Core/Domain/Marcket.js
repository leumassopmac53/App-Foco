import Product from '#domain/Product.js'

export default class Marcket {
  #products = new Map()

  add(product) {
    if (!(product instanceof Product)) return false

    if (this.#products.has(product.id)) return false

    this.#products.set(product.id, product)
    return true
  }

  remove(product) {
    if (!(product instanceof Product)) return false

    if (!this.#products.has(product.id)) return false

    this.#products.delete(product.id)
    return true
  }

  get products() {
    const copy = {}

    for (let [ key, value ] of this.#products.entries()) {
      copy[ key ] = Object.freeze({
        id: value.id,
        name: value.name,
        description: value.description,
        category: value.category
      })
    }

    return Object.freeze(copy)
  }
}