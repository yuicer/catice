var mongoose = require('mongoose'),
	con = mongoose.createConnection('mongodb://127.0.0.1:27017/test'),
	AccountSchema = new mongoose.Schema({
		account: '',
		password: '',
		create_time: '',
		//		access_token: {}
		//		name: {
		//			type: String,
		//			required: [true, 'name is required'],
		//			validate: {
		//				validator: function (v) {
		//					return typeof v == 'string'
		//				},
		//				message: 'name is not a string'
		//			}
		//		},
		//		age: {
		//			type: Number,
		//			required: [true, 'age is required'],
		//			max: 15,
		//			min: 0
	}, {
		versionKey: false //取消版本锁，否则每条数据都会有个 _v 字段
	}, {
		collection: 'account'
	});
var account = con.model('account', AccountSchema)
module.exports = account
