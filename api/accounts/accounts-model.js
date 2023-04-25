const db = require('../../data/db-config')

const getAll = () => {
  // KODLAR BURAYA
  return db('accounts')
}

const getById = (id) => {
  // KODLAR BURAYA
  return db('accounts').where('id', id).first()
}

const getByName = (name) => {
  // KODLAR BURAYA
  return db('accounts').where('name', name).first()
}

const create = (account) => {
  // KODLAR BURAYA
  const insertedAccount = db('accounts')
    .insert(account)
    .then((ids) => {
      return getById(ids[0])
    })
  return insertedAccount
}

const updateById = (id, account) => {
  // KODLAR BURAYA
  return db('accounts')
    .where('id', id)
    .update(account)
    .then((updateRow) => {
      return getById(id)
    })
}

const deleteById = (id) => {
  // KODLAR BURAYA
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
}
