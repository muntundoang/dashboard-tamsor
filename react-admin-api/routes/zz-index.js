const router = require('express').Router()
const routerUser = require('./user-routes')
const routerAuth = require('./auth-routes')
const routerInventory = require('./inventory-routes')
const routerCalender = require('./calendar-routes')
// const routerDept = require('./department-routes')

router.use('/user', routerUser)
router.use('/auth', routerAuth)
router.use('/inventory', routerInventory)
router.use('/calendar', routerCalender)
// router.use('/department', routerDept)

router.get("/", (req, res) => {
    res.send('ini home')
})

module.exports = router