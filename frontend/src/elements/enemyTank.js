import Tank from './tank';
import Images from './image';
import Boom from './boom';
import CV from './ConstVariable';
import {enemyCrack} from './audio';

class EnemyTank extends Tank{

	constructor(level){
		super();
		
		(Math.random()>0.5)? this.x = CV.SCREEN_OFFSET_X:(this.x=CV.SCREEN_OFFSET_X+CV.GAME_AREA_WIDTH-this.size);
		this.y = CV.SCREEN_OFFSET_Y;
		this.type = Math.floor(Math.random()*3+1);
		this.lives = this.type;
		this.score = this.type*100;
		this.isPlayer = false;
		this.protected = false;
		this.isMoving =true;
		this.speed = 1+level;
		this.maxBullet= 2+level;


	}




	changeDir = ()=>{

		if(this.notHit()&&Math.random()>0.5) this.dir = Math.floor(Math.random()*4);
		else{
			let tempDir = this.dir;
			while(tempDir == this.dir) this.dir = Math.floor(Math.random()*4);
		}
	};

	destroy = (obj)=>{
		if(this.lives <=0){
			obj.gameScore += this.score;
			this.isAlive=false;
			this.isMoving=false;
			obj.booms.push(new Boom(0, this));
			enemyCrack.play();

		}
	};
	
	draw = (ctx)=>{
		if(this.isAlive){
			switch(this.type){
				case 1: ctx.drawImage(Images.tankAll, 0+this.dir*this.size,32,this.size,this.size, this.x,this.y,this.size,this.size); break;

				case 2:	if(this.lives==2) {
						ctx.drawImage(Images.tankAll, 128+this.dir*this.size,0,this.size,this.size, this.x,this.y,this.size,this.size); break;
					}else{
						ctx.drawImage(Images.tankAll, 0+this.dir*this.size,32,this.size,this.size, this.x,this.y,this.size,this.size); break;
					}

				case 3: if(this.lives==3) {
						ctx.drawImage(Images.tankAll, 0+this.dir*this.size,64,this.size,this.size, this.x,this.y,this.size,this.size); break;
					}else if(this.lives==2){
						ctx.drawImage(Images.tankAll, 128+this.dir*this.size,64,this.size,this.size, this.x,this.y,this.size,this.size); break;
					}else{
						ctx.drawImage(Images.tankAll, 256+this.dir*this.size,64,this.size,this.size, this.x,this.y,this.size,this.size); break;
					}
				default: return 
			}
			this.move();
		}
		this.refreshBullet(ctx);


	};


	


}

export default EnemyTank;