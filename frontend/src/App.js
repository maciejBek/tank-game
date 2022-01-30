import logo from './logo.svg';
import './App.css';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

var connected = false;
var socket ='';
var stompClient = '';
var roomId = -1;

const connect = () => {
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

const send = () => {
  let playerId = 1; // pobrac id od biezacego gracza
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
  connected ? disconnect() : connect();
} 



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="room-id" />
        <button onClick={connect}>Connect</button>
        <input type="text" id="x-coordinate" />
        <input type="text" id="y-coordinate" />
        <button onClick={send}>Send</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

