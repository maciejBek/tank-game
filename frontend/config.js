const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development' ;

export const logStars = function(message){
	console.info('**********');
	console.info(message);
	console.info('**********');
};

export default {
	mongodbUri: 'mongodb://localhost:27017/tankRank',
	//set default port 8080
	port: env.PORT ||8080,
	//set default host address bind to all IPs on the machine
	host: env.HOST ||'127.0.0.1',
	get serverUrl(){
		return `http://${this.host}:${this.port}`;
	}
};