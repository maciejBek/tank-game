import CV from './ConstVariable';
import Bullet from './bullet';
import {checkIntersect} from './GameFunction';
import {shootAudio} from './audio';

class Tank {

	constructor() {
		
		this.x=0;
		this.y=0;
		this.speed =2;
		this.size = 32;
		this.dir = CV.UP;
		this.isMoving = false;
		this.maxBullet = 3; //max bullets allowed
		this.bullets = []; //bullet array
		this.isAlive = true;
		this.isPlayer=false;
		
		
		
		
	}
	

	move =()=>{
		if(this.isMoving){
			let tmpx = this.x;
			let tmpy = this.y;

			switch(this.dir){
				case CV.UP: tmpy -= this.speed; break;
				case CV.RIGHT: tmpx += this.speed; break;
				case CV.DOWN: tmpy += this.speed; break;
				case CV.LEFT: tmpx -= this.speed; break;			
			}
			if(this.notHit()){
				this.x = tmpx;
				this.y = tmpy;
			}
		}
		
	};


	notHit = ()=>{
		switch(this.dir){
			case 0: if (this.y<=CV.SCREEN_OFFSET_Y)
						{this.y=CV.SCREEN_OFFSET_Y; return false;} return true;
			case 1: if (this.y>=CV.SCREEN_OFFSET_Y+CV.GAME_AREA_HEIGHT-this.size)
						{this.y = CV.SCREEN_OFFSET_Y+CV.GAME_AREA_HEIGHT-this.size; return false;} return true; 
			case 2: if (this.x<=CV.SCREEN_OFFSET_X)
						{this.x=CV.SCREEN_OFFSET_X; return false;} return true;
			case 3: if (this.x >=CV.SCREEN_OFFSET_X+CV.GAME_AREA_WIDTH-this.size)
						{this.x=CV.SCREEN_OFFSET_X+CV.GAME_AREA_WIDTH-this.size;return false} return true;
			default: return true;
		}
	};

	isShot = (bullet)=>{
		//if(this.isPlayer==bullet.type) return false;
		if(this.isProtected) return false;
		return (this.isAlive&&checkIntersect(bullet,this,6));
	};

	shoot = ()=>{

		if (this.bullets.length >= this.maxBullet) {return;}
		else{
			let bulletX, bulletY;
			if(this.dir==CV.UP){
				bulletX = this.x+this.size/2.5;
				bulletY = this.y;
			}else if(this.dir==CV.DOWN){
				bulletX = this.x+this.size/2.5;
				bulletY = this.y+this.size;
			}else if(this.dir==CV.LEFT){
				bulletY = this.y+this.size/2.5;
				bulletX = this.x;
			}else if(this.dir==CV.RIGHT){
				bulletX = this.x+this.size;
				bulletY = this.y +this.size/2.5;
			}

			let mybullet = new Bullet(bulletX, bulletY, this.dir, this.isPlayer,this.speed+1);

			this.bullets.push(mybullet);
			if(this.isPlayer&&this.lives>=0) shootAudio.play();

		}
	};


	refreshBullet =(ctx)=>{
		let index = [];
		for (let i=0; i< this.bullets.length; i++){
			this.bullets[i].draw(ctx);
			if (!this.bullets[i].isAlive) {
				index.push(i);
			}
		}

		if(index.length>0){
			for(let i = 0; i<index.length;i++){
				this.bullets.splice(index[i],1);
			}
		}

	};
	
	draw=(ctx)=>{

		};
}


export default Tank;