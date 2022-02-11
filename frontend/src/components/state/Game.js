import React, { Component } from 'react'
import startPage from '../../data/startPage.png'

import GameOver from './GameOver';
import GameOn from './GameOn';
import MultiGameOn from './MultiGameOn';

import { welcomePage, welcomePageImg, messageStyle, gameOn, inputData } from '../../js/styles.js'
import { connect } from 'react-redux';
import { gameOverAction, playingAction, playingMultiAction, startScreenAction } from '../redux/reducer';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import Observer from './test';

var connected = false;
var socket ='';
var stompClient = '';
var roomId = -1;

const join = () => {
    sessionStorage.setItem("id", document.getElementById("player-id").value);
    socket = new SockJS("http://localhost:8080/stomp");
    stompClient = Stomp.over(socket);
    stompClient.connect(
        {},
        frame => {
            connected = true;
            roomId = document.getElementById("room-id").value;
            stompClient.subscribe("/topic/coordinates/" + roomId, tick => {
            });
        },
        error => {
            console.log(error);
            connected = false;
        }
    );
}

export const send = () => {
    const observer = new Observer();
    console.log(observer.pokaz)

    let playerId = document.getElementById("player-id").value; //pobrac id od biezacego gracza
    let xCoordinate = document.getElementById("x-coordinate").value;
    let yCoordinate = document.getElementById("y-coordinate").value;


    if (stompClient && stompClient.connected) {
        const data = {
            x: xCoordinate,
            y: yCoordinate,
            playerId: playerId,
            roomId: roomId };
        stompClient.send("/app/hello/" + roomId, {}, JSON.stringify(data));
    }
}

const disconnect = () => {
    if (stompClient) {
        stompClient.disconnect();
    }
    connected = false;
}

const tickleConnection = () => {
    connected ? disconnect() : join();
}


class Game extends React.Component {


    render() {
        const { startScreen, playing, playingMulti, gameOver, type } = this.props;
        return (


            <div>
                
                {type === 'START_SCREEN' &&
                    <div style={welcomePage}>

                        <img src={startPage} style={welcomePageImg} />
                        <div style={inputData}>
                            <br />
                        <input type="text" id="room-id" placeholder="room id"/>
                            <br />
                        <input type="text" id="player-id" placeholder="player id"/>
                            <br />
                        <button onClick={join}>Connect</button>
                            <br />
                        </div>
                        <div style={messageStyle}>
                            {
                                <div
                                    style={messageStyle}
                                >
                                <div style={messageStyle}
                                   
                                    onClick={() =>
                                        playing()
                                    } >
                                  
                                        <span style={{ cursor: 'pointer' }}>SINGLEPLAYER</span>

                                    </div>
                                    <br />
                                    <div style={messageStyle}

                                         onClick={() =>
                                             playingMulti()
                                         } >>
                                        <span style={{ cursor: 'pointer' }}>MULTIPLAYER</span>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                }
                {  type === 'GAME_OVER' && <GameOver />}

                {  type === 'PLAYING' && <GameOn /> }

                {  type === 'PLAYINGMULTI' && <MultiGameOn /> }


            </div>


        );

    }
}

const mapStateToProps = (state) => ({
    type: state.gameOn.type,
});

const mapDispatchToProps = {
    startScreen: startScreenAction,
    playing: playingAction,
    playingMulti: playingMultiAction,
    gameOver: gameOverAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game)