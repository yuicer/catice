import {
	Router
} from 'express'
import users from '../models/users'
const router = Router()

/* GET users listing. */
router.get('/users', function (req, res, next) {

	let docu = users.find({
		age: 14
	}, function (err, docs) {
		if (err)
			res.sendStatus(err)
		else
			res.send(docs)
	})

})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
	let docu = users.find({},
		(err, docs) => {
			var id = parseInt(req.params.id)
			if (id >= 0 && id < docs.length) {
				res.json(docs[id])
			} else {
				res.sendStatus(404)
			}
		}
	)
})

/* GET users listing. */
//router.get('/users', function (req, res, next) {
//  res.json(users)
//})

/* GET user by ID. */
//router.get('/users/:id', function (req, res, next) {
//  const id = parseInt(req.params.id)
//  if (id >= 0 && id < users.length) {
//    res.json(users[id])
//  } else {
//    res.sendStatus(404)
//  }
//})

export default router
