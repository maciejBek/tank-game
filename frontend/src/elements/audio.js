export const startAudio = new Audio('/audio/start.mp3');

export const shootAudio = new Audio('/audio/attack.mp3');

export const bulletCrack = new Audio('/audio/bulletCrack.mp3');

export const enemyCrack = new Audio('/audio/tankCrack.mp3');

export const playerCrack = new Audio('/audio/playerCrack.mp3');

class MoveSound{

	constructor(){

		this.moveAudio = new Audio('/audio/move.mp3');
		this.firstRun = true;
	}



	start(){
		if(this.firstRun) {
			this.moveAudio.play()
			this.firstRun = false;}

		if(this.moveAudio.ended) this.moveAudio.play();
		else return;
	}

	pause(){

		if(!this.moveAudio.ended) {this.moveAudio.load();
		this.firstRun = true;}
		else return;
	}

}

export default MoveSound;