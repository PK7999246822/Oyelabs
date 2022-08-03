const express = require('express');
const router = express.Router();
const customerController= require('./model/Controller/customerController')


router.post('/register' ,customerController.registration )
router.post('/login',customerController.loginUser)
router.put('/update',customerController.updateCustomer)

router.get('/subject',customerController.findSubject)
router.get('/Details',customerController.CustomerDetails)

module.exports = router;