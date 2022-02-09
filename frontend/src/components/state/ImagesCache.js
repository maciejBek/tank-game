import React from 'react';

const TANK_UP = "/images/user/tank-up.png";
const TANK_DOWN = "/images/user/tank-down.png";
const TANK_LEFT = "/images/user/tank-left.png";
const TANK_RIGHT = "/images/user/tank-right.png";
const AUTO_TANK_UP = "/images/bots/auto-tank-up.png";
const AUTO_TANK_DOWN = "/images/bots/auto-tank-down.png";
const AUTO_TANK_LEFT = "/images/bots/auto-tank-left.png";
const AUTO_TANK_RIGHT = "/images/bots/auto-tank-right.png";
const BRICK = "/images/brick.png";
const STEEL = "/images/steel.png";
const EAGLE = "/images/eagle.png";
const EAGLE2 = "/images/eagle2.png";
const EAGLE3 = "/images/eagle3.png";
const EAGLE4 = "/images/eagle4.png";
const GRASS = "/images/grass.png";
const WATER = "/images/water.png";


export const TANK_UP_REF = React.createRef();
export const TANK_DOWN_REF = React.createRef();
export const TANK_LEFT_REF = React.createRef();
export const TANK_RIGHT_REF = React.createRef();
export const AUTO_TANK_UP_REF = React.createRef();
export const AUTO_TANK_DOWN_REF = React.createRef();
export const AUTO_TANK_LEFT_REF = React.createRef();
export const AUTO_TANK_RIGHT_REF = React.createRef();
export const BRICK_REF = React.createRef();
export const STEEL_REF = React.createRef();
export const EAGLE_REF = React.createRef();
export const EAGLE2_REF = React.createRef();
export const EAGLE3_REF = React.createRef();
export const EAGLE4_REF = React.createRef();
export const GRASS_REF = React.createRef();
export const WATER_REF = React.createRef();


function ImagesCache() {
  return (
    <div>
      <img ref={TANK_UP_REF} src={TANK_UP} alt="tank up" style={{width:0, height:0}} />
      <img ref={TANK_DOWN_REF} src={TANK_DOWN} alt="tank down" style={{width:0, height:0}} />
      <img ref={TANK_LEFT_REF} src={TANK_LEFT} alt="tank left" style={{width:0, height:0}} />
      <img ref={TANK_RIGHT_REF} src={TANK_RIGHT} alt="tank right" style={{width:0, height:0}} />
      <img ref={AUTO_TANK_UP_REF} src={AUTO_TANK_UP} alt="auto tank up" style={{width:0, height:0}} />
          <img ref={AUTO_TANK_DOWN_REF} src={AUTO_TANK_DOWN} alt="auto tank down" style={{width:0, height:0}} />
          <img ref={AUTO_TANK_LEFT_REF} src={AUTO_TANK_LEFT} alt="auto tank left" style={{width:0, height:0}} />
          <img ref={AUTO_TANK_RIGHT_REF} src={AUTO_TANK_RIGHT} alt="auto tank right" style={{width:0, height:0}} />
      <img ref={BRICK_REF} src={BRICK} alt="brick" style={{width:0, height:0}} />
      <img ref={STEEL_REF} src={STEEL} alt="steel" style={{width:0, height:0}} />
          <img ref={EAGLE_REF} src={EAGLE} alt="eagle" style={{ width: 0, height: 0 }} />
        <img ref={EAGLE2_REF} src={EAGLE2} alt="eagle2" style={{ width: 0, height: 0 }} />
        <img ref={EAGLE3_REF} src={EAGLE3} alt="eagle3" style={{ width: 0, height: 0 }} />
        <img ref={EAGLE4_REF} src={EAGLE4} alt="eagle4" style={{ width: 0, height: 0 }} />
          <img ref={GRASS_REF} src={GRASS} alt="grass" style={{ width: 0, height: 0, zIndex: 2, position: 'relative' }} />
          <img ref={WATER_REF} src={WATER} alt="water" style={{ width: 0, height: 0 }} />

    </div>
  ); 
}

export default ImagesCache;