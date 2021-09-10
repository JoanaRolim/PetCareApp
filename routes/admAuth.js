const express = require('express');
const { register, login, logout, getMe, resetPassword, updateDetails, updatePassword } = require('../controllers/admin/AdmAuth');

const router = express.Router();
const { protect } = require('../middleware/adminAuth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
