import React, { Component } from 'react'
import Map from './Map'

import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    LOWEST_POSITION
} from '../utils/Constants';
import InputManager from '../utils/InputManager';
import TankMulti from './TankMulti';
import ImagesCache from './ImagesCache';
import AutoTankController from './AutoTankController';
import Eagle from './Eagle';
import Eagle2 from './Eagle2';
import Eagle3 from './Eagle3';
import Eagle4 from './Eagle4';
import { BrowserRouter as Link } from 'react-router-dom';
import send from './Game.js';


import {
    gameField, nextLevel, multiGameOn, leftPanel, rightPanel, welcomePageImg,
    messageStyle} from '../../js/styles.js'
import { connect } from 'react-redux';
import { gameOverAction, playingMultiAction, startScreenAction } from '../redux/reducer';

const MODE = {
    START: 0,
    ON: 1,
    GAME_OVER: 2,
    PAUSE: 3,
    WIN: 4
}
class MultiGameOn extends React.Component {


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
        };

        this.canvas = React.createRef();

        this.mapCont = React.createRef();

        this.map = null;
        this.eagle = null;
        this.eagle2 = null;
        this.eagle3 = null;
        this.eagle4= null;


        this.tank1 = null;
        this.tank2 = null;
        this.tank3 = null;
        this.tank4 = null;

        this.congras = '';
        this.level = 1;
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
                this.eagle2.render(this.state);
                this.eagle3.render(this.state);
                this.eagle4.render(this.state);


                if (this.tank1) {
                    if (sessionStorage.getItem("id") == 1)
                    {

                        this.tank1.update(keys, this.map, this.autoTankController.autoTanks, this.tank2, this.tank3, this.tank4, this.eagle, this.eagle2, this.eagle3, this.eagle4, this.score);
                        //send();
                    }
                    this.tank1.render(this.state);
                }
                if (this.tank2) {
                    if (sessionStorage.getItem("id") == 2)
                    {
                        this.tank2.update(keys, this.map, this.autoTankController.autoTanks, this.tank1, this.tank3, this.tank4, this.eagle2, this.eagle, this.eagle3, this.eagle4, this.score);
                        //send();
                    }
                    this.tank2.render(this.state);
                }
                if (this.tank3) {
                    if(sessionStorage.getItem("id") == 3)
                    {
                        this.tank3.update(keys, this.map, this.autoTankController.autoTanks, this.tank1, this.tank2, this.tank4, this.eagle3, this.eagle2, this.eagle, this.eagle4, this.score);
                        //send();
                    }
                    this.tank3.render(this.state);
                }
                if (this.tank4) {
                    if(sessionStorage.getItem("id") == 4)
                    {
                        this.tank4.update(keys, this.map, this.autoTankController.autoTanks, this.tank1, this.tank2, this.tank3, this.eagle4, this.eagle2, this.eagle3, this.eagle, this.score);
                        //send();
                    }
                    this.tank4.render(this.state);
                }



                break;
            case MODE.GAME_OVER:
                break;

            default:
            // do nothing
        }

        requestAnimationFrame(() => this.update());

    }


    win() {
        this.setState({ initState: MODE.WIN });
    }

    lose() {

    }

    endGame() {
        this.setState({ initState: MODE.GAME_OVER });
        this.props.gameOver();
    }

    startGame() {
        console.log();
        this.map = new Map({ level: this.level });
        this.eagle = new Eagle({ onDie: () => this.lose() });
        this.eagle2 = new Eagle2({ onDie: () => this.lose() });
        this.eagle3 = new Eagle3({ onDie: () => this.lose() });
        this.eagle4 = new Eagle4({ onDie: () => this.lose() });

        this.tank1 = new TankMulti({
            speed: 2,
            position: {
                x: this.state.screen.width / 2 - 100,
                y: LOWEST_POSITION
            },
            onDie: () => this.lose()
        });

        this.tank2 = new TankMulti({
            speed: 2,
            position: {
                x: 0,
                y: 275
            },
            onDie: () => this.lose()
        });

        this.tank3 = new TankMulti({
            speed: 1,
            position: {
                x: 375,
                y: 0
            },
            onDie: () => this.lose()
        });

        this.tank4 = new TankMulti({
            speed: 2,
            position: {
                x: 600,
                y: 425
            },
            onDie: () => this.lose()
        });

        this.autoTankController = new AutoTankController({
            map: this.map,
            tank: this.tank1,
            eagle: this.eagle

        });

        this.setState({
            initState: MODE.ON,
            score: 0,

        });
    }

    render() {
        const { startScreen, playingMulti, gameOver, type } = this.props;

        return (

            <div style={multiGameOn} ref={this.map}>
                {this.state.initState === MODE.WIN
                    && <div style={nextLevel}>

                        <div style={messageStyle}

                             onClick={() =>
                                 playingMulti()
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


                </div>

                <div style={rightPanel}>

                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    type: state.multiGameOn.type,
});


const mapDispatchToProps = {
    startScreen: startScreenAction,
    playingMulti: playingMultiAction,
    gameOver: gameOverAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiGameOn);