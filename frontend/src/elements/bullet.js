import CV from './ConstVariable';
import Images from './image';
import {checkIntersect} from './GameFunction';

class Bullet {

	constructor(startX, startY, dir,type, speed) {
		
		this.x=startX;
		this.y=startY;
		this.speed =speed;
		this.size = 6;
		this.dir = dir;
		this.hit = false; //if hit wall
		this.type = type; //player's or computers
		this.isAlive = true;
	}
		

	move(){

		if(this.dir == CV.UP){
			this.y -= this.speed;
		}else if(this.dir == CV.DOWN){
			this.y += this.speed;
		}else if(this.dir==CV.LEFT){
			this.x -= this.speed;
		}else if(this.dir==CV.RIGHT){
			this.x += this.speed;
		}

	}



	isHit(){

		if(this.x<CV.SCREEN_OFFSET_X) return true;
		if(this.x>CV.SCREEN_OFFSET_X+CV.GAME_AREA_WIDTH-this.size) return true;
		if(this.y<CV.SCREEN_OFFSET_Y) return true;
		if(this.y>CV.SCREEN_OFFSET_Y+CV.GAME_AREA_HEIGHT-this.size) return true;
		return false;
	}		

	isShot =(bullet)=>{
		if (this.type == bullet.type) return false;
		return (this.isAlive&&checkIntersect(bullet,this,0));

	};



	destory(){
		
		this.isAlive = false;

	}




	draw(ctx,bullets){
		if(!this.isHit()){

		ctx.drawImage(Images.tankAll, 80+this.dir*this.size, 96, this.size, this.size, this.x, this.y, this.size, this.size);
		this.move();
		}else{
			this.destory();
		}
	}


	

}

export default Bullet;
