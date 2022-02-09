import React, { Component } from 'react'


export const SCREEN_WIDTH = 650;

export const SCREEN_HEIGHT = 700;

export const RATIO = window.devicePixelRatio || 1;

export const TANK_SIZE = 50;

export const BLOCK_SIZE = 25;

export const BULLET_SIZE = 10;

export const BULLET_POINTER_FIX = 4;

export const EAGLE_SIZE = 50;

export const AUTO_TANK_SPEED = 1.5;

export const BULLET_SPEED = 3;

export const TANK_SHOOT_FREQUENCY = 500; //ms

export const AUTOTANK_SHOOT_FREQUENCY = 2500; //ms

export const LOWEST_POSITION = SCREEN_HEIGHT - TANK_SIZE;

export const LONGEST_POSITION = SCREEN_WIDTH - TANK_SIZE;

export const GAME_STATE = {
    START_SCREEN: 0,
    PLAYING: 1,
    GAME_OVER: 2
};

export const gameStateContext = React.createContext(
    GAME_STATE.START_SCREEN);

export const DIRECTION = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
};

export const COLOR = {
  WHITE: '#fff',
  YELLOW: '#ff0'
};

export const BLOCK_TYPE = {
  BRICK: 0,
  STEEL: 1,
  GRASS: 2,
  WATER: 3,
};

export const EAGLE_POSITION = {
  x: 300,
  y: 650
};

export const EAGLE_POSITION2 = {
    x: 0,
    y: 350
};
export const EAGLE_POSITION3 = {
    x: 300,
    y: 0
};

export const EAGLE_POSITION4 = {
    x: 600,
    y: 350
};
