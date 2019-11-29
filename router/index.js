let signUpController = require('../controller/signUp');

router.post('/service/signUp', signUpController.signUp);
router.post('/service/login', signUpController.login);
router.post('/service/history', signUpController.getHistory);

module.exports = router;

