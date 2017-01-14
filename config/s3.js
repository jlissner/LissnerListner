const Upload = require('s3-uploader');
const client = new Upload('lissnerlistner.com', {
	aws: {
		path: 'images/',
		region: 'us-west-2',
		acl: 'public-read',
		accessKeyId: process.env.AWS_S3_ID, 
		secretAccessKey: process.env.AWS_S3_KEY,
	},

	cleanup: {
		versions: true,
		original: false
	},
 
	original: {
		awsImageAcl: 'private'
	},

	versions: [{
		maxHeight: 1040,
		maxWidth: 1040,
		format: 'jpg',
		suffix: '-large',
		quality: 80,
		awsImageExpires: 31536000,
		awsImageMaxAge: 31536000
	},{
		maxWidth: 780,
		format: 'jpg',
		aspect: '3:2!h',
		suffix: '-medium'
	},{
		maxWidth: 320,
		format: 'jpg',
		aspect: '16:9!h',
		suffix: '-small'
	},{
		maxHeight: 100,
		format: 'jpg',
		aspect: '1:1',
		format: 'png',
		suffix: '-thumb1'
	},{
		maxHeight: 250,
		maxWidth: 250,
		format: 'jpg',
		aspect: '1:1',
		suffix: '-thumb2'
	}],
});

module.exports = client; 