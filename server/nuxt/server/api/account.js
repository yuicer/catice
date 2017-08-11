import {
	Router
} from 'express'
import account from '../models/account'
const router = Router()

/* GET users listing. */
router.get('/account', function (req, res, next) {
	console.log(req)
	res.send(req.query)
	//	let docu = account.find({
	//		age: 14
	//	}, function (err, docs) {
	//		if (err)
	//			res.sendStatus(err)
	//		else
	//			res.send(docs)
	//	})

})

///* GET user by ID. */
//router.get('/users/:id', function (req, res, next) {
//	let docu = users.find({},
//		(err, docs) => {
//			var id = parseInt(req.params.id)
//			if (id >= 0 && id < docs.length) {
//				res.json(docs[id])
//			} else {
//				res.sendStatus(404)
//			}
//		}
//	)
//})

export default router
