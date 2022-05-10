const express = require('express')

const router = express.Router()

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { getProduct, addProduct, getDetailProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getCategory, addCategory, getDetailCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { addTransaction, getTransaction, notification } = require('../controllers/transaction')

const { register, login, checkLogin } = require('../controllers/auth')
const { getProfile } = require('../controllers/profile')

// Middleware
const { auth } = require('../middlewares/auth')
// Upload file
const { uploadFile } = require('../middlewares/uploadFile')

// Route
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/category', addCategory)
router.get('/category/:id', getDetailCategory)
router.get('/categories', getCategory)
router.patch('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)

router.get('/products', auth, getProduct)
router.get('/product/:id', auth, getDetailProduct)
router.patch('/product/:id', auth, uploadFile("image"), updateProduct)
router.delete('/product/:id', auth, deleteProduct)
router.post('/product', auth, uploadFile("image"), addProduct) // place middleware before controller

// router.get('/transactions', getTransactions)
router.post('/transaction', auth, addTransaction)
router.get('/transactions', auth, getTransaction)
router.post("/notification", notification);

router.post('/register', register)
router.post('/login', login)
router.get("/profile", auth, getProfile);
router.get('/check', auth, checkLogin)


module.exports = router