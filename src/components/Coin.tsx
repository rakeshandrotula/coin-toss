import React from 'react';

interface CoinProps {
  isSpinning: boolean;
  rotation: number;
}

const Coin: React.FC<CoinProps> = ({ isSpinning, rotation }) => {
  return (
    <div className="coin-container" style={{
      transform: `rotateY(${rotation}deg) ${isSpinning ? 'scale(1.1)' : 'scale(1)'}`,
      transition: 'transform 3s cubic-bezier(0.15, 0, 0.15, 1)'
    }}>
      <div className="coin">
        <div className="side front"></div>
        <div className="side back"></div>
      </div>
    </div>
  );
};

export default Coin;
