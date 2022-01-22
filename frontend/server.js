import config from './config';
import {logStars} from './config';
import apiRouter from './api';
import express from 'express';
// change sass to css
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import bodyParser from 'body-parser';
const server = express();


//use bodyParser
server.use(bodyParser.json());


server.use(sassMiddleware({
	src: path.join(__dirname, 'sass'),
	dest: path.join(__dirname, 'static'),
	debug: false,
	indentedSyntax: false,
	sourceMap: true

}));

//set up EJS to work with Express
//Express will look a index.ejs file under views folder by default.
server.set('view engine', 'ejs');
server.set('views', __dirname+ '/views');
//fetch data from API

//import serverRender from './serverRender';

//render the EJS index file under root/views
//can pass parameter like this
//content: 'Hello Express and <em>EJS</em>!'
server.get('/',(req,res)=>{
	//call serverRender which is a function and return a promise
	res.render('index',{
		//

	});
});

server.use('/api', apiRouter);

//does same job as below commented code.
server.use(express.static('static'));

// server.get('/about.html', (req,res)=>{
// 	fs.readFile('./about.html', (err,data)=>{
// 		res.send(data.toString());
// 	});
	
// });

//server listen to port

server.listen(config.port, config.host, function(){

	logStars('Express listenning on port ' + config.port);

});