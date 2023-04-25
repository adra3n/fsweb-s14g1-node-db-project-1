const router = require('express').Router()
const accountsModel = require('./accounts-model')
const middleware = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const allAccounts = await accountsModel.getAll()
    res.json(allAccounts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', middleware.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.Account)
  } catch (error) {
    next(error)
  }
})

router.post(
  '/',
  middleware.checkAccountPayload,
  middleware.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let model = { name: req.body.name, budget: req.body.budget }
      const insertedAccount = await accountsModel.create(model)

      res.status(201).json(insertedAccount)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id',
  middleware.checkAccountId,
  middleware.checkAccountPayload,
  middleware.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let model = { name: req.body.name, budget: req.body.budget }
      const updatedAccount = await accountsModel.updateById(
        req.params.id,
        model
      )
      res.json(updatedAccount)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', middleware.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountsModel.deleteById(req.params.id)
    res.json(`${req.Account.name} isimli kayıt silindi`)
  } catch (error) {
    next(error)
  }
})

router.use((err, req, res, next) => {
  // KODLAR BURAYA
  res.status(err.status || 400).json({
    customMessage: 'Custom error handler üzerinden hata alındı',
    message: err.message,
  })
})

module.exports = router
