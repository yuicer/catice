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
var account = con.model('account', AccountSchema)

AccountSchema.statics.sign_in = function (req, res) {
	this.find({
		mail: req.query.mail,
		password: req.params.password
	}, function (err, docs) {
		if (err)
			res.sendStatus(err)
		else {
			res.send({
				data: docs
			})
		}
	})
}
module.exports = account
