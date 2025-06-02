const router = require('express').Router();
const {signup,login} = require('../Controllers/AuthControl')
const { signupvad, loginvad } = require('../Middleware/AuthMiddleware');

router.post('/signup', signupvad, signup);
router.post('/login', loginvad, login);

// router.post('/login', (req, res) => {
//     res.send('login succesfull');
// }
// router.post('/signup', (req, res) => {
//     res.send('signup succesfull');
// })
module.exports= router