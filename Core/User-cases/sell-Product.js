import Repository from '#repository'
import Product from '#domain/Product.js'
import PointAccount from '#domain/PointAccount.js'

export default async function sellProduct(id, repository){
  try{
    if(!(repository instanceof Repository)) return {ok: false, message: 'repository invalid'}

    const b = await repository.getPointAccount()

    const bank = new PointAccount(b)

    const p = await repository.findById(id)

    if(!p.ok) return p

    const product = new Product(p.content)

    const debited = bank.debit(product.points)

    if(!debited) return {ok: false, message: "don't debit"}

    const {balance, maxBalance, minBalance, maxDebit, maxCredit} = bank

    await repository.setPointAccount({
      balance, maxBalance, minBalance, maxCredit, maxDebit
    })

    await repository.delete(product.id)

    return {ok: true, message: 'sold'}
  }
  catch (erro){
    switch(erro.name){
      case 'DomainError':
        return {ok: false, message: erro.message, name: erro.name}
        break
        
      case 'RepositoryError':
        return {ok: false, message: erro.message, name: erro.name}
        break

      default:
        throw erro
    }
  }
}