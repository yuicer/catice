import {
	Router
} from 'express'
import account from '../models/account'
const router = Router()

/* GET users listing. */
router.get('/account/sign_in', function (req, res, next) {
	account.sign_in(req, res);
})

router.post('/account/sign_up', function (req, res, next) {
	account.sign_up(req, res);
})


export default router
