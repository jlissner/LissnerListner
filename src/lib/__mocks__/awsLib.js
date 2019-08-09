module.exports = {
	invokeApig: jest.fn().mockImplementation(({
	  path,
	  method = 'GET',
	  headers = {},
	  queryParams = {},
	  body
	}) => new Promise((res) => {
		// console.log({path, method, headers, queryParams, body})
		setTimeout(() => {
			res({ data: 'default success' })
		}, 1000);
	})),
}