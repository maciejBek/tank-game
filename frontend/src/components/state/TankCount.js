import React from 'react';
import './TankCount.css';

const TankCount = ({count}) => {

  const tanks = []
  for (let i=0;i<count;i++) {
    tanks.push(<img src="/images/tank-count.png" />);
  }

  return (
    <div className="tank-count">
      {tanks}
    </div>
  );  
}
    

export default TankCount;