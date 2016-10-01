var http = require('http')



module.exports = (info, userid, obj) => {
	return new Promise((reslove, reject) => {
		http.request(
			{
				method: 'POST',
				hostname: 'www.tuling123.com',
				path: '/openapi/api'
			},
			(res) => {
				var chunks = '';
				res.on('data', (chunk) => {
					chunks += chunk.toString();
				})
				res.on('end', ()=> {
					reslove(JSON.parse(chunks));
				})
			}
		).end(JSON.stringify(Object.assign({
			key: '0d5cbe82fa8a491e8be0471b7a718883',
			info: info,
			userid: userid
		}, obj)))
	})
	
}
