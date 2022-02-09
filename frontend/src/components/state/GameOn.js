import React, { Component } from 'react'
import Map from './Map'

import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    LOWEST_POSITION
} from '../utils/Constants';
import InputManager from '../utils/InputManager';
import Tank from './Tank';
import ImagesCache from './ImagesCache';
import AutoTankController from './AutoTankController';
import Eagle from './Eagle';
import TankCount from './TankCount';
import { BrowserRouter as Link } from 'react-router-dom';

import next_level from '../../data/next_level.png'


import {
    gameField, nextLevel, gameOn, leftPanel, rightPanel, welcomePageImg,
    messageStyle} from '../../js/styles.js'
import { connect } from 'react-redux';
import { gameOverAction, playingAction, startScreenAction } from '../redux/reducer';

const MODE = {
    START: 0,
    ON: 1,
    GAME_OVER: 2,
    PAUSE: 3,
    WIN: 4
}
class GameOn extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            input: new InputManager(),

            screen: {
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                ratio: 1
            },

            initState: MODE.START, 

            context: null,

            score: 0,

            autoTanksCount: 0,
        };

        this.canvas = React.createRef();

        this.mapCont = React.createRef();

        this.map = null;
        this.eagle = null;

        this.tank1 = null;
        this.tank2 = null;

        this.autoTankController = null;

        this.congras = '';
        this.level = 2;
        this.pause = 1;
    }

    componentDidMount() {
        this.state.input.bindKeys();
        const context = this.canvas.current.getContext('2d');
        this.setState({ context: context });
        requestAnimationFrame(() => this.update());
    }

    componentWillUnmount() {
        this.state.input.unbindKeys();
    }

    clearBackground() {
        const context = this.state.context;
        context.save();
        context.scale(this.state.screen.ratio, this.state.screen.ratio);
        context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        context.globalAlpha = 1;
    }

     
    update() {

        const keys = this.state.input.pressedKeys;
        if (keys.esc !== 0 && this.pause === 1) {
            this.setState({ initState: MODE.PAUSE });
            this.pause = 2;
            this.state.input.pressedKeys.esc = 0;
        }
        else if (keys.esc !== 0 && this.pause === 2) {
            this.setState({ initState: MODE.ON });
            this.pause = 1;
            this.state.input.pressedKeys.esc = 0;

        }
        switch (this.state.initState) {
            case MODE.WIN:
                break;
            case MODE.PAUSE:
                break;
            case MODE.START:
                this.startGame();
                this.setState({
                    initState: MODE.ON
                });
                break;

            case MODE.ON:
                this.clearBackground();

                this.map.update();
                this.map.render(this.state);
                this.eagle.render(this.state);

                if (this.tank1) {
                    this.tank1.update(keys, this.map, this.autoTankController.autoTanks);
                    this.tank1.render(this.state);
                }

                this.autoTankController.update();
                this.autoTankController.render(this.state);
                if (this.autoTankController.count !== this.state.count) {
                    this.setState({
                        autoTanksCount: this.autoTankController.count
                    });
                }

                break;
            case MODE.GAME_OVER:
                break;

            default:
            // do nothing
        }

        requestAnimationFrame(() => this.update());

    }

    nextLevel() {
     
        if (this.level != 5) {
            this.level += 1;
            this.setState({
                initState: MODE.ON
            });
          //  this.startGame();
        }

    }

    win() {
        this.setState({ initState: MODE.WIN });
    }

    lose() {
        this.endGame();
    }

    endGame() {
        this.setState({ initState: MODE.GAME_OVER });
        this.props.gameOver();
    }

    startGame() {
        this.map = new Map({ level: this.level });
        this.eagle = new Eagle({ onDie: () => this.lose() });

        this.tank1 = new Tank({
            speed: 2.5,
            position: {
                x: this.state.screen.width / 2 - 100,
                y: LOWEST_POSITION
            },
            onDie: () => this.lose()
        });

        this.autoTankController = new AutoTankController({
            count: 20,
            onAllDie: () => this.win(),
            map: this.map,
            tank: this.tank1,
            eagle: this.eagle
        });

        this.setState({
            initState: MODE.ON,
            score: 0,
            autoTanksCount: 20
        });
    }

    render() {
        const { startScreen, playing, gameOver, type } = this.props;

        return (

            <div style={gameOn} ref={this.map}>

                {this.state.initState === MODE.WIN
                    && <div style={nextLevel}>
                    <img src={next_level} style={welcomePageImg} />
                    <div style={messageStyle}
                        onClick={() =>
                            this.nextLevel()
                        } >
                        <span style={{ cursor: 'pointer' }}>NEXT LEVEL</span>
                    </div>

                    <div style={messageStyle}

                        onClick={() =>
                            playing()
                        } >

                        <span style={{ cursor: 'pointer' }}>BACK TO MAIN PAGE</span>
                    </div>

                    </div>}

                {this.state.initState === MODE.PAUSE
                    && <div style={nextLevel}>
                        <div style={messageStyle}>
                        <span style={{ cursor: 'pointer' }}>PAUSE</span>
                        </div>
                          <div
                        style={messageStyle}
                        onClick={() => this.props.startScreen()}   >

                        <div style={messageStyle}>
                            <Link to='/'>
                                <span style={{ cursor: 'pointer' }}>END GAME AND RETURN TU MAIN PAGE </span>
                            </Link>
                        </div>
                        <br />
                     </div>

                    </div>}


                <div style={leftPanel}>

                </div>

                <div style={gameField} ref={this.mapCont} id='map' >

                    <ImagesCache />

                    <canvas ref={this.canvas}
                        width={this.state.screen.width}
                        height={this.state.screen.height}
                    />

                    {<TankCount count={this.state.autoTanksCount} />}

                </div>

                <div style={rightPanel}>

                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    type: state.gameOn.type,
});


const mapDispatchToProps = {
    startScreen: startScreenAction,
    playing: playingAction,
    gameOver: gameOverAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOn); 