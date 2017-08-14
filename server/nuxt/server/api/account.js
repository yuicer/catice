import {
	Router
} from 'express'
import account from '../models/account'
const router = Router()

/* GET users listing. */
router.get('/account/sign_in', function (req, res, next) {
	account.find({
		mail: req.params.mail,
		password: req.params.password
	}, function (err, docs) {
		if (err)
			res.sendStatus(err)
		else
			res.send(docs)
	})

})


router.post('/account/sign_up', function (req, res, next) {
	//	res.setHeader('Content-Type', 'text/plain')
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
	console.log(body.mail)
	account_.save((err) => {
		if (err)
			res.sendStatus(err)
		else
			res.send({
				result: 1
			})

	})
})


export default router
