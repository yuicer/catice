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
	/*
		将不正确的json格式
		  {mail:'b', password: 'bb'}
		装转为正式的json格式
		{"mail": "b", password: "bb"}
	*/
	let body = JSON.parse(JSON.stringify(req.body)),
		account_ = new account({
			mail: body.mail,
			password: body.password,
			create_time: Date.now()
		});
	if (req.body.code != 'catice')
		res.send({
			error: '验证码错误'
		})

	else {
		account_.save((err) => {
			if (err)
				res.sendStatus(err)
			else
				res.send({
					result: 1
				})
		})
	}
})


export default router
