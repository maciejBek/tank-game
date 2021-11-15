define("Constants", [], function() {
	var BricColor = {
		naturalColor : '#570B02',
		silverColor : 'ghostwhite',
		transparent : 'transparent'
	};

	var keyCodes = {
		spaceBar: 32,
		leftArrow: 37,
		upArrow: 38,
		rightArrow: 39,
		downArrow: 40,
		fire: 17
	};

	var Direction = {
		left : 1,
		right : 2,
		top : 3,
		bottom : 4
	};

	var GameState = {
		NOT_STARTED : 0,
		PAUSED : 1,
		INPROGRESS : 2,
		OVER : 3,
		WON : 4
	};

	var CollisionOutput = {
		NO_COLLISION : 0,
		COLLISION : 1,
		BUNKER_DESTROYED : 2,
		TANK_DESTROYED : 3
	};

	var CollisionBetweenRectangles = function(r1, r2, vicinity) {
		return  !(r2.left >= r1.right + vicinity
			|| r2.right <= r1.left - vicinity
			|| r2.top >= r1.bottom + vicinity
			|| r2.bottom <= r1.top - vicinity);
	};

	var RandomNumberBetweenXAndY = function(X, Y) {
		return Math.floor((Math.random() * Y) + X);
	}

	var RandomDirection = function() {
		return RandomNumberBetweenXAndY(1,4);
	}

	return {
		BricColor : BricColor,
		keyCodes : keyCodes,
		Direction : Direction,
		GameState : GameState,
		CollisionOutput: CollisionOutput,
		CollisionBetweenRectangles : CollisionBetweenRectangles,
		RandomDirection : RandomDirection
	}
});
define("Brick", ["Constants"], function(Constants) {
	// Base Unit of wall
	var Brick = React.createClass({
		displayName: 'Brick',

		reset: function() {
			this.setState({
				destroyed: false
			});
		},

		getInitialState: function(){
			return {
				destroyed: false
			};
		},

		getDefaultProps: function() {
			return {
				backgroundColor: Constants.BricColor.naturalColor,
				width: '20px',
				height: '10px',
				destroyed: false
			};
		},

		checkCollision : function(playerRect, vicinity, isBullet) {
			// if the brick has been destroyed, no point in checking collision
			if (this.state.destroyed) return false;

			var domNode = ReactDOM.findDOMNode(this.refs.brick);
			var domRect = domNode.getBoundingClientRect();
			var collided = Constants.CollisionBetweenRectangles(playerRect, domRect, vicinity);

			if (isBullet && collided && this.props.backgroundColor != Constants.BricColor.silverColor) {
				this.setState({
					destroyed : true
				});
			}

			return collided;
		},

		render: function() {
			var tankStyle = {
				backgroundColor: this.state.destroyed ? Constants.BricColor.transparent : this.props.backgroundColor,
				width: this.props.width,
				height: this.props.height,
				border: this.state.destroyed ? "3px solid transparent" : "3px solid black"
			};

			return (
				React.createElement('div', {
					ref : 'brick',
					style: tankStyle
				}, "")
			);
		}
	});

	return {
		Brick : Brick
	}
});
define("Wall", ["Constants", "Brick"], function(Constants, Brick) {
	// Wall consists of many bricks
	var Wall = React.createClass({
	  displayName: 'Wall',

	  reset: function() {
		for (var i = 0; i < this.props.bricks; ++i) {
		  var brickRef = this.refs["brick" + i];
		  brickRef.reset();
		}
	  },

	  getDefaultProps: function() {
		return {
		  backgroundColor: Constants.BricColor.naturalColor,
		  width: '20px',
		  height: '10px',
		  bricks: 5,
		  vertical: true,
		  positionFixed: false,
		  top: '15%',
		  right: '60%'
		};
	  },

	  checkCollision: function(playerRect, vicinity, isBullet) {
		for (var i = 0; i < this.props.bricks; ++i) {
		  var brickReference = this.refs["brick" + i];
		  if (brickReference.checkCollision(playerRect, vicinity, isBullet)) {
			return true;
		  }
		}

		return false;
	  },

	  render: function() {
		var bricks = [];
		for (var i = 0; i < this.props.bricks; ++i) {
		  bricks.push(React.createElement(
			Brick.Brick, {
			  key: i,
			  ref: "brick" + i,
			  backgroundColor: this.props.backgroundColor,
			  width: this.props.width,
			  height: this.props.height,
			}));
		}

		var wallStyle = {
		  display: this.props.vertical ? 'block' : 'flex',
		  top: this.props.positionFixed ? this.props.top : '',
		  right: this.props.positionFixed ? this.props.right : '',
		  position: this.props.positionFixed ? 'absolute' : ''
		};

		return (
		  React.createElement('div', {
			style: wallStyle
		  }, bricks)
		);
	  }
	});

	return {
		Wall : Wall
	}
});
define("Tank", ["Constants"], function(Constants) {

	// Tank object can be used as a player and as enemies
	var Tank = React.createClass({
	  displayName: 'Tank',

	  getDefaultProps: function() {
		return {
		  bottom: '0',
		  left: '0',
		  direction: Constants.Direction.left,
		  bgLeft: 'silver',
		  bgMiddle: 'green',
		  bgRight: 'silver',
		  bgBarrel: 'dimgray'
		};
	  },

	  getTransformAngle: function() {
		switch(this.props.direction) {
			case Constants.Direction.left: return 'rotate(180deg)';
			case Constants.Direction.right: return 'rotate(0deg)';
			case Constants.Direction.top: return 'rotate(270deg)';
			case Constants.Direction.bottom: return 'rotate(90deg)';
		}
	  },

	  checkCollision: function(playerRect, vicinity, isBullet) {
		var domNode = ReactDOM.findDOMNode(this.refs["tank"]);
		var domRect = domNode.getBoundingClientRect();
		if ( Constants.CollisionBetweenRectangles(playerRect, domRect, vicinity) ) {
			if (isBullet) {
				return Constants.CollisionOutput.TANK_DESTROYED;
			}
			else {
				return Constants.CollisionOutput.COLLISION;
			}
		}

		return Constants.CollisionOutput.NO_COLLISION;
	  },

	  render: function() {
		var transformAngle = this.getTransformAngle();

		var children = [];
		children.push(React.createElement('div', {key:'left', className: "tankLeftPart", style: {background: this.props.bgLeft} },""));
		children.push(React.createElement('div', {key:'middle', className: "tankMiddlePart", style: {background: this.props.bgMiddle} },""));
		children.push(React.createElement('div', {key:'right', className: "tankRightPart", style: {background: this.props.bgRight} },""));
		children.push(React.createElement('div', {key:'barrel', className: "barrel", style: {background: this.props.bgBarrel}}, ""));

		return (
			React.createElement(
				'div',
				{
					className: "tankModel",
					ref: "tank",
					style: {
						bottom : this.props.bottom + "px",
						left : this.props.left + "px",
						transform: transformAngle,
						display: 'inline'
					}
				},
				children
			)
		);
	  }
	});

	return {
		Tank : Tank
	}
});
define("Bullet", [], function(){
	var Bullet = React.createClass({
	  displayName: 'Bullet',

	  render: function() {
		return (
			React.createElement(
				'div',
				{
					className: "bullet",
					style: {
						bottom : this.props.bottom + "px",
						left : this.props.left + "px"
					}
				},
				""
			)
		);
	  }
	});

	return {
		Bullet : Bullet
	}
});
define("Bunker", ["Constants", "Wall"], function(Constants, Wall) {

	// Bunker Object which needs to be protected
	var Bunker = React.createClass({
	  displayName: 'Bunker',

	  reset: function() {
		for (var i = 1; i <= 3; ++i) {
		  var wallReference = this.refs["wall" + i];
		  wallReference.reset();
		}
	  },

	  checkCollision: function(playerRect, vicinity, isBullet) {
		for (var i = 1; i <= 3; ++i) {
		  var wallReference = this.refs["wall" + i];
		  if (wallReference.checkCollision(playerRect, vicinity, isBullet)) {
			return Constants.CollisionOutput.COLLISION;
		  }
		}

		var domNode = ReactDOM.findDOMNode(this.refs["bunkerTarget"]);
		var domRect = domNode.getBoundingClientRect();
		if ( Constants.CollisionBetweenRectangles(playerRect, domRect, vicinity) ) {
			if (isBullet) {
				return Constants.CollisionOutput.BUNKER_DESTROYED;
			}
			else {
				return Constants.CollisionOutput.COLLISION;
			}
		}

		return Constants.CollisionOutput.NO_COLLISION;
	  },

		//BUNKERS -----------------------------------------------------------------
	  render: function() {

		//green bunker
		var bunker_green = [];
		var bunkerStyle_green = {
		  width: '120px',
		  height: '86px',
		  position: 'absolute',
		  bottom: '15px',
		  left: '42%'
		};
		var baseObjectProps_green = {
		  key: "toBeSecured",
		  ref: "bunkerTarget",
		  src: "../images/green_eagle.jpg",
		  style: {
			width: '64px',
			height: '64px',
			position: 'absolute',
			top: '38%',
			right: '23%'
		  }
		};

		bunker_green.push(React.createElement(Wall.Wall, { key: 'wall2', ref: 'wall2', vertical: false, width: '20px', height: '20px' }));
		bunker_green.push(React.createElement(Wall.Wall, { key: 'wall1', ref: 'wall1', vertical: true, width: '20px', height: '20px', bricks:3  }));
		bunker_green.push(React.createElement('img', baseObjectProps_green, null));
		bunker_green.push(React.createElement(Wall.Wall, { key: 'wall3', ref: 'wall3', vertical: true, width: '20px', height: '20px', bricks:3, positionFixed: true, top: '23%', right: '0%' }));

		//red bunker
		var bunker_red = [];
		var bunkerStyle_red = {
		  width: '120px',
		  height: '86px',
		  position: 'absolute',
		  bottom: '15px',
		  left: '42%'

		};
		var baseObjectProps_red = {
			key: "toBeSecured",
			ref: "bunkerTarget",
			src: "../images/red_eagle.jpg",
			style: {
			width: '64px',
			height: '64px',
			position: 'absolute',
			top: '38%',
			right: '23%'
			}
		};

		bunker_red.push(React.createElement(Wall.Wall, { key: 'wall2', ref: 'wall2', vertical: false, width: '20px', height: '20px' }));
		bunker_red.push(React.createElement(Wall.Wall, { key: 'wall1', ref: 'wall1', vertical: true, width: '20px', height: '20px', bricks:3  }));
		bunker_red.push(React.createElement('img', baseObjectProps_red, null));
		bunker_red.push(React.createElement(Wall.Wall, { key: 'wall3', ref: 'wall3', vertical: true, width: '20px', height: '20px', bricks:3, positionFixed: true, top: '23%', right: '0%' }));
		return (
			React.createElement('div', {
			style: bunkerStyle_green
		}, bunker_green)
//			React.createElement('div', {
//			style: bunkerStyle_red
//		}, bunker_red)
		);
	  }
	});


	return {
		Bunker : Bunker
	}
});
define("Banner", [], function() {
	// Base Unit of wall
	var Banner = React.createClass({
		displayName: 'Banner',

		getDefaultProps: function() {
			return {
				visible: true,
				text: ""
			};
		},

		render: function() {
			var bannerStyle = {
				display: this.props.visible? 'block' : 'none',
			};

			var bannerBackground = React.createElement('div', {key:'bannerBackground', className: 'banner'}, "");
			var bannerBox = React.createElement('div', {key:'bannerBox', className: 'bannerBox'}, this.props.text);
			return (
				React.createElement('div', {
					style: bannerStyle,
				}, [bannerBackground, bannerBox])
			);
		}
	});

	return {
		Banner : Banner
	}
});
define("TankGame", ["Constants", "Brick", "Wall", "Tank", "Bullet", "Bunker", "Banner"], function(Constants, Brick, Wall, Tank, Bullet, Bunker, Banner) {
	var PLAYER_MAX_POSITIONS = {
		DIRECTION_LEFT : {
			PLAYER_LEFT_MAX : 655,
			PLAYER_LEFT_MIN : 0,
			PLAYER_BOTTOM_MAX : 655,
			PLAYER_BOTTOM_MIN : 0,
		},

		DIRECTION_TOP : {
			PLAYER_LEFT_MAX : 655,
			PLAYER_LEFT_MIN : 0,
			PLAYER_BOTTOM_MAX : 655,
			PLAYER_BOTTOM_MIN : 0,
		}
	};

	var BULLET_MAX_POSITIONS = {
		DIRECTION : {
			PLAYER_LEFT_MAX : 690,
			PLAYER_LEFT_MIN : 0,
			PLAYER_BOTTOM_MAX : 690,
			PLAYER_BOTTOM_MIN : 0,
		}
	};

	var DIRECTION_CHANGE_TIME = 20;
	var BULLET_FIRE_GAP = 30;
	var WINDOW_WIDTH = 700;
	var WINDOW_HEIGHT = 700;
	var SPEED_INCREMENT = 10;
	var BULLET_INCREMENT = 15;
	var BUNKER_VICINITY = 0;
	var WALL_VICINITY = 0;



	var DefaultPlayer1 = {
		left : 200,
		bottom : 0,
		direction: Constants.Direction.top,
		readyToFire: true,
		source: 'player1'
	};

	var DefaultWalls = [
		//[ true, true, '29%', '0%', '30px', '20px', 2, Constants.BricColor.silverColor ],
			//vertical walls
			[ true, true, '7.69%', '7.69%', '47.8px', '47.8px', 3 ],
			[ true, true, '69.24%', '7.69%', '47.8px', '47.8px', 3 ],

			[ true, true, '7.69%', '23.07%', '47.8px', '47.8px', 3 ],
			[ true, true, '69.24%', '23.07%', '47.8px', '47.8px', 3 ],

			[ true, true, '7.69%', '69.21%', '47.8px', '47.8px', 3 ],
			[ true, true, '69.24%', '69.21%', '47.8px', '47.8px', 3 ],

			[ true, true, '7.69%', '84.59%', '47.8px', '47.8px', 3 ],
			[ true, true, '69.24%', '84.59%', '47.8px', '47.8px', 3 ],

			//horizontal walls
			[ false, true, '30.76%', '38.45%', '47.8px', '47.8px', 3 ],
			[ false, true, '61.52%', '38.45%', '47.8px', '47.8px', 3 ],

			//silver walls
			[ true, true, '46.14%', '23.07%', '47.8px', '47.8px', 1, Constants.BricColor.silverColor ],
			[ true, true, '46.14%', '69.21%', '47.8px', '47.8px', 1, Constants.BricColor.silverColor ],
			[ true, true, '46.14%', '46.14%', '47.8px', '47.8px', 1, Constants.BricColor.silverColor ],

	];

	// Tank Game main control routine
	var TankGame = React.createClass({
	  displayName: 'TankGame',

	  walls: DefaultWalls,
	  bullets :[],
	  lastFiredTime: 0,
	  playerCharacteristics: Object.create( DefaultPlayer1 ),

	  resetGame: function() {
		this.bullets = [];
		this.lastFiredTime = 0;
		this.playerCharacteristics = Object.create( DefaultPlayer1 );

		this.walls.forEach(
		  (val, index) => {
			var wallRef = this.refs["wall" + index];
			wallRef.reset();
		  });

		var bunkerRef = this.refs.bunker;
		bunkerRef.reset();
		this.setState({
			time : 0,
			gameState : Constants.GameState.NOT_STARTED
		});
	  },

	  getInitialState: function(){
		return {
			time: this.getNewTimeValue(),
			gameState: Constants.GameState.NOT_STARTED
		};
	  },

	  getNewTimeValue: function() {
		return Math.floor((Date.now() / 5000));
	  },

	  getBannerText: function() {
		switch(this.state.gameState) {
			case Constants.GameState.NOT_STARTED: return "Press Space to start";
			case Constants.GameState.PAUSED: return "Game Paused";
			case Constants.GameState.INPROGRESS: return "Game in progress";
			case Constants.GameState.OVER: return "Game Over";
			case Constants.GameState.WON: return "You Won";
		}
	  },

	  tick : function() {
		// stop if game is paused
		if (this.state.gameState !== Constants.GameState.INPROGRESS) return;

		var t = this.getNewTimeValue();

		this.bullets.forEach(
		  (bullet, index, object) => {
			bullet.left -= (bullet.direction == Constants.Direction.left)?BULLET_INCREMENT:0;
			bullet.left += (bullet.direction == Constants.Direction.right)?BULLET_INCREMENT:0;
			bullet.bottom += (bullet.direction == Constants.Direction.top)?BULLET_INCREMENT:0;
			bullet.bottom -= (bullet.direction == Constants.Direction.bottom)?BULLET_INCREMENT:0;

			var bulletMaxPositions = this.getBulletMaxPositionsForDirection(bullet.direction);
			var deleteBullet = false;
			if (bullet.left<bulletMaxPositions.PLAYER_LEFT_MIN) deleteBullet = true;
			if (bullet.bottom<bulletMaxPositions.PLAYER_BOTTOM_MIN) deleteBullet = true;
			if (bullet.left>bulletMaxPositions.PLAYER_LEFT_MAX) deleteBullet = true;
			if (bullet.bottom>bulletMaxPositions.PLAYER_BOTTOM_MAX) deleteBullet = true;

			if (!deleteBullet) {
				var bulletNode = ReactDOM.findDOMNode(this.refs['bullet' + index]);
				if (bulletNode) {
					var bulletRect = bulletNode.getBoundingClientRect();
					if (this.checkObjectCollision('bullet' + index, bulletRect, true, bullet.source)) deleteBullet = true;
				}
			}

			if (deleteBullet) object.splice(index, 1);
		  });

		this.setState({
			time : t
		});
	  },

	  updatePlayerCharacteristic: function(playerCharacteristics, player, left, bottom, degree, direction) {
		playerCharacteristics.left = left;
		playerCharacteristics.bottom = bottom;
		playerCharacteristics.direction = direction;
		player.style.left = left + "px";
		player.style.bottom = bottom + "px";
		player.style.transform = "rotate(" + degree + "deg)";
	  },

	  getPlayerMaxPositionsForDirection: function(direction) {
		switch(direction) {
			case Constants.Direction.top:
			case Constants.Direction.bottom:
				return PLAYER_MAX_POSITIONS.DIRECTION_TOP;
			case Constants.Direction.left:
			case Constants.Direction.right:
				return PLAYER_MAX_POSITIONS.DIRECTION_LEFT;
		}
	  },

	  getBulletMaxPositionsForDirection: function(direction) {
		switch(direction) {
			case Constants.Direction.top:
			case Constants.Direction.bottom:
			case Constants.Direction.left:
			case Constants.Direction.right:
				return BULLET_MAX_POSITIONS.DIRECTION;
		}
	  },

	  getBulletPositionFromSource: function(direction, left, bottom) {
		var bulletLeft = left, bulletBottom = bottom;
		switch(direction) {
			case Constants.Direction.top:
				bulletLeft += 10;
				bulletBottom += 10;
				break;
			case Constants.Direction.bottom:
				bulletLeft += 10;
				bulletBottom -= 10;
				break;
			case Constants.Direction.left:
				bulletLeft -= 10;
				bulletBottom += 10;
				break;
			case Constants.Direction.right:
				bulletLeft += 10;
				bulletBottom += 10;
				break;
		}

		return {left: bulletLeft, bottom: bulletBottom};
	  },

	  getAngleFromDirection: function(direction) {
		switch(direction) {
			case Constants.Direction.top: return 270;
			case Constants.Direction.bottom: return 90;
			case Constants.Direction.left: return 180;
			case Constants.Direction.right: return 0;
		}
	  },

	  fireBullet: function(playerCharacteristics) {
		if (playerCharacteristics.readyToFire) {
			playerCharacteristics.readyToFire = false;

			var source = playerCharacteristics.source;
			var direction = playerCharacteristics.direction;
			var left = playerCharacteristics.left;
			var bottom = playerCharacteristics.bottom;
			var bulletPosition = this.getBulletPositionFromSource(direction, left, bottom);

			this.bullets.push({
				left: bulletPosition.left,
				bottom: bulletPosition.bottom,
				direction: direction,
				source: source
			});
		}
	  },

	  handleSpaceBarPress: function() {
		switch(this.state.gameState) {
			case Constants.GameState.NOT_STARTED:
			case Constants.GameState.PAUSED:
				this.setState({
					gameState: Constants.GameState.INPROGRESS
				});
				break;
			case Constants.GameState.INPROGRESS:
				this.setState({
					gameState: Constants.GameState.PAUSED
				});

				break;
			case Constants.GameState.OVER:
			case Constants.GameState.WON:
				this.resetGame();
				break;
		}
	  },

	  keyDownHandler : function(event) {
		// handle space bar events
		if (event.keyCode === Constants.keyCodes.spaceBar) {
			this.handleSpaceBarPress();
			return;
		}

		// stop if game is paused
		if (this.state.gameState !== Constants.GameState.INPROGRESS) return;

		var oldLeft = this.playerCharacteristics.left;
		var oldBottom = this.playerCharacteristics.bottom;
		var oldDirection = this.playerCharacteristics.direction;
		var oldAngle = this.getAngleFromDirection(oldDirection);
		var newAngle = 0;

		switch(event.keyCode) {
		  case Constants.keyCodes.leftArrow:
			this.playerCharacteristics.left -= SPEED_INCREMENT;
			newAngle = 180;
			this.playerCharacteristics.direction = Constants.Direction.left;
			break;
		  case Constants.keyCodes.upArrow:
			this.playerCharacteristics.bottom += SPEED_INCREMENT;
			newAngle = 270;
			this.playerCharacteristics.direction = Constants.Direction.top;
			break;
		  case Constants.keyCodes.rightArrow:
			this.playerCharacteristics.left += SPEED_INCREMENT;
			newAngle = 0;
			this.playerCharacteristics.direction = Constants.Direction.right;
			break;
		  case Constants.keyCodes.downArrow:
			this.playerCharacteristics.bottom -= SPEED_INCREMENT;
			newAngle = 90;
			this.playerCharacteristics.direction = Constants.Direction.bottom;
			break;
		  case Constants.keyCodes.fire:
			this.fireBullet(this.playerCharacteristics);
			return;
		  default:
			return;
		}

		// set the value currently, so that we can revert in case it does not fit
		var player = ReactDOM.findDOMNode(this.refs.player1);
		if (oldDirection != this.playerCharacteristics.direction) {
			player.style.transform = "rotate(" + newAngle + "deg)";
		} else {
			var playerMaxPositions = this.getPlayerMaxPositionsForDirection(this.playerCharacteristics.direction);
			if (this.playerCharacteristics.left<playerMaxPositions.PLAYER_LEFT_MIN)
				this.playerCharacteristics.left = playerMaxPositions.PLAYER_LEFT_MIN;

			if (this.playerCharacteristics.bottom<playerMaxPositions.PLAYER_BOTTOM_MIN)
				this.playerCharacteristics.bottom = playerMaxPositions.PLAYER_BOTTOM_MIN;

			if (this.playerCharacteristics.left>playerMaxPositions.PLAYER_LEFT_MAX)
				this.playerCharacteristics.left = playerMaxPositions.PLAYER_LEFT_MAX;

			if (this.playerCharacteristics.bottom>playerMaxPositions.PLAYER_BOTTOM_MAX)
				this.playerCharacteristics.bottom = playerMaxPositions.PLAYER_BOTTOM_MAX;

			player.style.left = this.playerCharacteristics.left.toString() + "px";
			player.style.bottom = this.playerCharacteristics.bottom.toString() + "px";

			var playerRect = player.getBoundingClientRect();
			if (this.checkObjectCollision("player1", playerRect, false, "")) {
				this.updatePlayerCharacteristic(this.playerCharacteristics, player, oldLeft, oldBottom, oldAngle, oldDirection);
			}
		}
	  },

	  willObjectBeDestroyed: function(objectType, isBullet, bulletSource) {
		return isBullet && (bulletSource.indexOf(objectType) === -1);
	  },

	  checkObjectCollision: function(objectRefString, objectRect, isBullet, bulletSource) {
		// collides with bunker
		var bunkerCollisionOutput = this.refs.bunker.checkCollision(objectRect, BUNKER_VICINITY, isBullet);
		if (bunkerCollisionOutput == Constants.CollisionOutput.BUNKER_DESTROYED) {
			this.setState({
				gameState: Constants.GameState.OVER
			});
			return true;
		}

		if (bunkerCollisionOutput == Constants.CollisionOutput.COLLISION) {
			return true;
		}

		// collides with wall
		for (var i=0; i<this.walls.length; ++i) {
		  var wallString = "wall" + i;
		  var wallReference = this.refs[wallString];
		  var collisionOccurred = wallReference.checkCollision(objectRect, WALL_VICINITY, isBullet);

		  if (collisionOccurred) {
			return true;
		  }
		}

		// collides with player
		var willPlayerBeDestroyed = this.willObjectBeDestroyed('player', isBullet, bulletSource);
		if (objectRefString !== 'player1' && willPlayerBeDestroyed) {
			var player = this.refs.player1;
			var collidedWithPlayer = player.checkCollision(objectRect, 0, isBullet);
			if (collidedWithPlayer !== Constants.CollisionOutput.NO_COLLISION) {
				if (collidedWithPlayer === Constants.CollisionOutput.TANK_DESTROYED) {
					this.setState({
						gameState: Constants.GameState.OVER
					});
				}
				return true;
			}
		}



		return false;
	  },

	  keyUpHandler : function(event) {
	  },

	  componentWillMount: function(){
		requestAnimationFrame( this.tick );
	  },

	  componentWillUpdate: function(){
		requestAnimationFrame( this.tick );
	  },

	  componentDidMount : function() {
		window.addEventListener('keydown', this.keyDownHandler, true);
		window.addEventListener('keyup', this.keyUpHandler, true);
	  },

	  componentDidUpdate : function() {
		this.lastFiredTime += 1;
		if (this.lastFiredTime > BULLET_FIRE_GAP) {
			this.lastFiredTime = 0;
			this.playerCharacteristics.readyToFire = true;
		}
	  },

	  componentWillUnmount : function () {
		window.removeEventListener('keydown', keyDownHandler);
		window.removeEventListener('keyup', keyUpHandler);
	  },

	  render: function() {
		var objects = [];
		objects.push(React.createElement(Banner.Banner, {key: 'Banner', text: this.getBannerText(), visible: this.state.gameState !== Constants.GameState.INPROGRESS}));
		objects.push(React.createElement(Tank.Tank, {key: 'Tank', ref : 'player1', left: this.playerCharacteristics.left, bottom: this.playerCharacteristics.bottom, direction: this.playerCharacteristics.direction}));
		objects.push(React.createElement(Bunker.Bunker, {key: 'bunker', ref : 'bunker'}));

		this.bullets.forEach(
		  (bullet, index) => {
				objects.push(React.createElement(Bullet.Bullet, {
					key: 'bullet' + index,
					ref : 'bullet' + index,
					left: bullet.left,
					bottom: bullet.bottom,
					direction: bullet.direction,
					source: bullet.source
				}));
			}
		);



		this.walls.forEach(
		  (val, index) => {
			objects.push(React.createElement(Wall.Wall, {
			  key: index,
			  ref: "wall" + index,
			  vertical: val[0],
			  positionFixed: val[1],
			  top: val[2],
			  right: val[3],
			  width: val[4],
			  height: val[5],
			  bricks: val[6],
			  backgroundColor : val[7]
			}));
		  });

		var tankGameStyle = {
		  backgroundColor: 'rgba(34, 34, 34, 0.95)',
		  width: WINDOW_WIDTH + 'px',
		  height: WINDOW_HEIGHT + 'px',
		  position: 'absolute',
			border: '40px solid silver',
		};

		return (
		  React.createElement('div', {
			style: tankGameStyle
		  }, objects)
		);
	  }
	});

	return {
		TankGame : TankGame
	}
});


require(["TankGame"], function(TankGame) {
	// render the tank game
	ReactDOM.render(
		React.createElement(TankGame.TankGame, null),
		document.getElementById('content')
	);
});
define("gamedriver", function(){});
