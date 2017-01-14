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
		awsImageAcl: 'public-read'
	},
});

module.exports = client; 