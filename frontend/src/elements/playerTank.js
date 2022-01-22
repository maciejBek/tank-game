import Tank from './tank';
import Images from './image';
import Boom from './boom';
import {playerCrack} from './audio';

class PlayerTank extends Tank{

	constructor(){
		super();
		this.x = 150;
		this.y = 400;
		this.lives = 2;
		this.isPlayer = true;
		this.isProtected = true;
		this.protectedTime = 300;
		this.maxBullet = 5;

	}

	destory = (obj)=>{
		this.lives--;
		playerCrack.play();
		obj.booms.push(new Boom(0,this));

		if(this.lives >=0){
			this.x = 150;
			this.y = 400;
			this.isProtected = true;
			this.protectedTime = 300;
		}else{
			setTimeout(()=>{obj.gameOver =true;}, 1000);
		}
	};


	draw = (ctx)=>{
		if(this.lives>=0){
			this.move();
			if(this.isProtected){
				ctx.drawImage(Images.tankAll,160,96+32*(parseInt((500-this.protectedTime)/5)%2),32, 32,this.x,this.y,32, 32);
				this.protectedTime--;
				if(this.protectedTime<=0){
					this.isProtected=false;
				}
			}
			ctx.drawImage(Images.tankAll, 0+this.dir*this.size,0,this.size,this.size, this.x,this.y,this.size,this.size);
			this.refreshBullet(ctx);
		}

	};



}

export default PlayerTank;