import Images from './image';
import CV from './ConstVariable';

export const checkIntersect = (object1, object2, overlap)=>{

	let A1 = object1.x + overlap;
	let B1 = object1.x + object1.size - overlap;
	let C1 = object1.y + overlap;
	let D1 = object1.y + object1.size - overlap;
 
	let A2 = object2.x + overlap;
	let B2 = object2.x + object2.size - overlap;
	let C2 = object2.y + overlap;
	let D2 = object2.y + object2.size - overlap;
 
	//check x axis
	if(A1 >= A2 && A1 <= B2
	   || B1 >= A2 && B1 <= B2)
	{
		//check y axis
		if(C1 >= C2 && C1 <= D2 || D1 >= C2 && D1 <= D2)
		{	
			return true;
		}
	}
	return false;

};


export const drawNum = (num, x, y, ctx)=>{

	let numbers =[];

	if(num ==0){
		numbers.push(0);
	}else{
		while(num>0){
			numbers.push(num%10);
			num=parseInt(num/10);
		}
	}
	let tempX = x;
	let tempY = y;
	for(let i=numbers.length-1;i>=0;i--){
		tempX = x+(numbers.length-i-1)*14;
		ctx.drawImage(Images.tankAll, 256+parseInt(numbers[i])*14,96,14,14,tempX,tempY,14,14); 
	}      

};

export const drawLives = (num, ctx)=>{

	ctx.drawImage(Images.tankAll, 0, 112, 30, 32, 452, 50, 30, 32);
	drawNum(num, 470,66, ctx);

};

export const drawScore = (num, ctx) =>{

	ctx.font ='20px serif';
	ctx.fillText('Scores:', 442, 122);
	drawNum(num, 442, 138,ctx);

};

export const drawGameTime = (time, ctx) =>{
	ctx.font = '20px serif';
	ctx.fillText('Times:', 442, 194);
	drawNum(parseInt(time/1000), 442, 210,ctx);
};

export const drawLevel = (level, ctx) =>{
	ctx.drawImage(Images.tankAll, 60, 112, 30, 32, 442, 250, 32, 30);
	drawNum(level, 475, 266, ctx);
}

export const drawPanel = (numLive, numScore, time, level, ctx) =>{
	drawLives(numLive, ctx);
	drawScore(numScore,ctx);
	drawGameTime(time, ctx);
	drawLevel(level, ctx);

};

export const gameOver = (ctx)=>{

	ctx.drawImage(Images.tankAll, 384,64, 64, 32, 176+CV.SCREEN_OFFSET_X, 192+CV.SCREEN_OFFSET_Y,64,32);
};

