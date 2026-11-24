import Product from '#domain/Product.js'

export default async function createProduct(p, repository){
  try {
    const product = new Product(p)

    const {id, name, points, category ,description} = product
    
    await repository.add({
      id, name, points, description, category
    })

    return {ok: true, message: '', name: ''}
  }
  catch(erro){
    switch(erro.name){
      case 'DomainError':
        return {ok: false, message: erro.message, name: erro.name}
        break
        
      case 'RepositoryError':
        return {ok: false, message: erro.message, name: erro.name}
        break

      default:
        throw erro
        break
    }
  }
}