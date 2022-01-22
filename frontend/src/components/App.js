import React from 'react';
import Header from './header';
import TankCanvas from './TankCanvas';
import EnemyTank from '../elements/enemyTank';
import PlayerTank from '../elements/playerTank';
import Boom from '../elements/boom';
import CV from '../elements/ConstVariable';
import {drawPanel, gameOver} from '../elements/GameFunction';
import {startAudio,bulletCrack} from '../elements/audio';
import moveSound from '../elements/audio';
import *as api from '../api';


//main app
class App extends React.Component{

	constructor (props){
		super(props);
		this.state = {

			gameTimeCount: 0
		};
		this.playerTank = new PlayerTank();
		this.gameLevel=1;
		this.enemyTanks = [new EnemyTank(this.gameLevel), new EnemyTank(this.gameLevel),new EnemyTank(this.gameLevel), new EnemyTank(this.gameLevel),new EnemyTank(this.gameLevel)];
		this.gameScore;
		this.booms=[];
		this.gameOver = false;
		this.moveSound = new moveSound;
		this.ctx;
	}


	componentDidMount() {



	}



	componentWillUnmount() {
		clearTimeout(this.mainTimer);

	}


	startMenu =(ctx)=>{
		this.ctx = ctx;
		//ctx.clearRect(0,0,512,448);
		let menuImage = new Image();
		menuImage.src ='/images/menu.gif';
		menuImage.onload =()=>{
			ctx.drawImage(menuImage,0,0);
			ctx.fillStyle="#000";
			ctx.fillRect(0, 224, 512, 448);
			ctx.fillStyle="#E61";
			ctx.font = '30px serif';
			ctx.fillText('Press any key to start', 120, 350);
			let flag=true;
			this.menuLoop = setInterval(()=>{

				ctx.fillStyle="#000";
				ctx.fillRect(0, 224, 512, 448);
				if(flag){
				ctx.fillStyle="#E61";
				ctx.font = '30px serif';
				ctx.fillText('Press any key to start', 120, 350);
				flag=false;
				}else flag=true;

			}, 500);
		}

		window.addEventListener("keydown",this.handleGameStart);



	};

	handleGameStart =(e)=>{
		window.removeEventListener("keydown", this.handleGameStart);
		clearInterval(this.menuLoop);
		startAudio.play();
		setTimeout(this.gameInit,1000);
	};


	gameInit =()=>{
		CV.AI=1000;
		this.state.gameTimeCount =0;
		this.playerTank = new PlayerTank();
		this.gameLevel =1;
		this.enemyTanks = [new EnemyTank(this.gameLevel), new EnemyTank(this.gameLevel),new EnemyTank(this.gameLevel), new EnemyTank(this.gameLevel),new EnemyTank(this.gameLevel)];
		this.gameScore=0;
		this.booms=[];
		this.gameOver = false;
		window.addEventListener("keydown", this.handlePlayerTank);
		window.addEventListener("keyup", this.handleTankStop);
		this.mainGameLoop();
	};

	//MainGameLoop started when componentDidMount.
	mainGameLoop = ()=>{

		let gameTimeCount =this.state.gameTimeCount + 20;
		this.gameScore +=50/CV.AI;
		this.setState({gameTimeCount: gameTimeCount});
		this.enemyTankDirLoop(gameTimeCount, this.enemyTanks);
		this.checkhit(this.booms);
		this.addNewEnemy();
		this.checkEnemyUpgrade(gameTimeCount, this.enemyTanks);
		this.drawAll(this.ctx);
		this.mainTimer = setTimeout(this.mainGameLoop,20);

		if(this.gameOver) {
			//this.stopLoopTimer =setTimeout(()=>{clearTimeout(this.mainTimer)}, 500);
			clearTimeout(this.mainTimer);
			gameOver(this.ctx);
			window.removeEventListener("keydown", this.handlePlayerTank);
			window.removeEventListener("keyup", this.handleTankStop);
			this.resetTimer = setTimeout(this.updateScore,3000);
		}
	};





	addNewEnemy = ()=>{
		if(this.enemyTanks.length <=3){
			this.enemyTanks.push(new EnemyTank(this.gameLevel));
			this.enemyTanks.push(new EnemyTank(this.gameLevel));
		}

	};


	checkhit = (booms)=>{
		for(let etank of this.enemyTanks){
			for(let bullet of etank.bullets){
				for(let mybullet of this.playerTank.bullets){
					if(mybullet.isShot(bullet)){
						bullet.isAlive=false;
						mybullet.isAlive=false;
						bulletCrack.play();
						booms.push(new Boom(1,mybullet));
						booms.push(new Boom(1,bullet));
					}
				}
				if(this.playerTank.isShot(bullet)){
					bullet.isAlive=false;
					booms.push(new Boom(1,bullet));
					this.playerTank.destory(this);
				}
			}

			if(!etank.isAlive && (etank.bullets.length==0)){
				this.enemyTanks.splice(this.enemyTanks.indexOf(etank),1);

			}

			for(let bullet of this.playerTank.bullets){
				if(etank.isShot(bullet)){
					bullet.isAlive=false;
					bulletCrack.play();
					booms.push(new Boom(1,bullet));
					etank.lives--;
					etank.destroy(this);

				}
			}
		}
	};


	checkEnemyUpgrade = (gameTime,enemyTanks)=>{
		if(parseInt(gameTime%30000)==0){
			this.gameLevel ++;
			if(CV.AI>200){
				CV.AI =parseInt(CV.AI-100);
			}else if (CV.AI>10){
				CV.AI = CV.AI-10;
			}
			for(let etank of enemyTanks){
				etank.speed++;
				etank.maxBullet++;
			}
		}else return;
	};



	//AI change eTank dir automatically.
	enemyTankDirLoop = (gameTime, enemyTanks)=>{
		if(gameTime%CV.AI==0){
			for(let etank of enemyTanks){
				if(etank.isAlive){
					etank.dir =  Math.floor(Math.random()*4);
					etank.shoot();
				}
			}
		}
	};

	//draw enemyTank pass to the canvas component
	enemyTankDraw = (ctx)=>{
		for(let etank of this.enemyTanks){
			etank.draw(ctx);
		}
	};

	playerTankDraw = (ctx)=>{
		this.playerTank.draw(ctx);
	};

	boomDraw = (ctx)=>{
		for(let boom of this.booms){
			if(boom.isOver){
				this.booms.splice(this.booms.indexOf(boom),1);
			}else{

				boom.draw(ctx);
			}
		}
	};

	drawAll = (ctx)=>{
		ctx.clearRect(0,0,512,448);
		ctx.fillStyle="#000";
		ctx.fillRect(CV.SCREEN_OFFSET_X, CV.SCREEN_OFFSET_Y, CV.GAME_AREA_WIDTH, CV.GAME_AREA_HEIGHT);
		this.enemyTankDraw(ctx);
		this.playerTankDraw(ctx);
		this.boomDraw(ctx);
		drawPanel(this.playerTank.lives,this.gameScore, this.state.gameTimeCount, this.gameLevel, ctx);

	};

	//handle player keybaord start moving the tank
	handlePlayerTank = (e)=>{
		let key = e.which||e.keyCode||0;
		if(key ==32) {
			this.playerTank.shoot();
		}
		else if(key==87||key==68||key==83||key==65)
		{
			if(this.playerTank.lives>=0){
				this.playerTank.isMoving =true;
				//too noisy...
				//this.moveSound.start();
				if(key==87) this.playerTank.dir=0;
				else if(key ==83 ) this.playerTank.dir=1;
				else if(key ==65) this.playerTank.dir =2;
				else if(key ==68) this.playerTank.dir =3;
			}
		}
	};

	//handle player keyboard stop moving the tank
	handleTankStop = (e)=>{
		let key = e.which||e.keyCode||0;
		if(key==87||key==68||key==83||key==65){
			this.playerTank.isMoving =false;
			this.moveSound.pause();


		}
	};


	updateScore = () =>{
		let newName;
		let inputName = prompt("You score is: "+Math.round(this.gameScore*100)/100+" \nPlease input your Nickname", "");
		if(inputName==null||inputName=="") {
			alert("You didn't input your Name, so yuor score won't be record");
			setTimeout(()=>{ clearTimeout(this.scoreTimer);
									this.startMenu(this.ctx);},10000);
		}
		else {


			newName = inputName;
			api.updateRanking(newName, Math.round(this.gameScore*100)/100).then(results=>{

				let user_id = results._id;
				let rankings = results.rankings;
				let user_index;
				let displayRankings = [];
				for(let i=0; i<rankings.length; i++){
					rankings[i].rank = i+1;
					if(rankings[i]._id == user_id){
						user_index = i;
					}
				}

				if(user_index<10&&rankings.length>=10) {
					for(let i=0; i<10; i++){
						displayRankings.push(rankings[i]);
					}
				}else if(user_index<10&&rankings.length<10){
					for(let i=0; i<rankings.length; i++){
						displayRankings.push(rankings[i]);
					}

				}else if(user_index>=10 && rankings.length>=15){
					for(let i=user_index-4; i<user_index+5; i++)
					{
						displayRankings.push(rankings[i]);
					}
				}else{
					for(let i=user_index-4; i<rankings.length; i++){
						displayRankings.push(rankings[i]);
					}
				}


				this.scoreDisplay(displayRankings,user_index);


				setTimeout(()=>{ clearTimeout(this.scoreTimer);
									this.startMenu(this.ctx);},10000);

			});

		}


	};



	scoreDisplay = (rankings, _id)=>{

		let displayGap = 0;
		this.ctx.fillStyle="#000";
		this.ctx.fillRect(CV.SCREEN_OFFSET_X, CV.SCREEN_OFFSET_Y, CV.GAME_AREA_WIDTH, CV.GAME_AREA_HEIGHT);
		this.ctx.font ='25px serif';
		this.ctx.fillStyle = '#FF0';
		this.ctx.strokeStyle = '#FF0';
		this.ctx.lineWidth=2;
		this.ctx.fillText("Game Rankings", 140, 60);
		this.ctx.beginPath();
		this.ctx.moveTo(CV.SCREEN_OFFSET_X,80);
		this.ctx.lineTo(CV.SCREEN_OFFSET_X+CV.GAME_AREA_WIDTH, 80);
		this.ctx.stroke();
		this.ctx.font ='20px serif';

		if(Math.random()>0.5){
			this.ctx.fillStyle = '#F00';
		}else this.ctx.fillStyle ='#FFF';
		for(let i=0; i<rankings.length;i++){

			this.ctx.fillText(rankings[i].rank, 120, 100+displayGap)
			this.ctx.fillText(rankings[i].name+":", 170, 100+displayGap);
			this.ctx.fillText(rankings[i].score, 270, 100+displayGap);
			displayGap +=30;

		}

		this.scoreTimer = setTimeout(()=>{this.scoreDisplay(rankings)},20);


	};


	render(){
		return (
			<div>
				<Header />
				<TankCanvas

				startMenu = {this.startMenu}

				/>
			</div>
			);
	}
}

export default App;
