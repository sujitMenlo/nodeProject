let signUpController = require('../controller/signUp');

router.post('/service/signUp',signUpController.signUp );

module.exports = router;

