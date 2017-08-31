var mongoose = require('mongoose'),
	con = mongoose.createConnection('mongodb://127.0.0.1:27017/test'),
	AccountSchema = new mongoose.Schema({
		mail: String,
		password: String,
		create_time: String,
	}, {
		versionKey: false //取消版本锁，否则每条数据都会有个 _v 字段
	}, {
		collection: 'account'
	});

AccountSchema.statics.sign_in = function (req, res) {
	this.findOne({
		mail: req.query.mail,
		password: req.query.password
	}, (err, doc) => {
		if (err)
			res.sendStatus(err)
		else
			res.send({
				state: doc
			})
	})

}

AccountSchema.statics.sign_up = function (req, res) {
	let body = JSON.parse(JSON.stringify(req.body)),
		account_ = new account({
			mail: body.mail,
			password: body.password,
			create_time: Date.now()
		});
	if (body.code != 'catice')
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
}

var account = con.model('account', AccountSchema)
module.exports = account
