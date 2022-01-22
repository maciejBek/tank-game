import Images from './image';


class boom {


	constructor(type, obj) {
		
		this.times = 0;
		this.isOVer = false;
		this.tempDir=1;
		this.owner = obj;

		if(type === 0){
			this.pos = [0,160];
			this.size = 66;
			this.frame = 4;
		}else{
			this.pos = [320,0];
			this.size = 32;
			this.frame = 3;
		}

		this.x = obj.x + (parseInt(obj.size-this.size)/2);
		this.y = obj.y + (parseInt(obj.size-this.size)/2);
	}

	draw = (ctx)=>{
		let gaptime=3;
		let tempPo = parseInt(this.times/gaptime);
		ctx.drawImage(Images.tankAll, this.pos[0]+tempPo*this.size, this.pos[1], this.size, this.size, this.x,this.y,this.size,this.size);
		this.times +=this.tempDir;
		if(this.times>this.frame*gaptime - parseInt(gaptime/2)){
			this.tempDir=-1;
		}
		if(this.times <=0) this.isOver=true;

	};


}

export default boom;