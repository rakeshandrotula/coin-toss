import React from 'react';

interface UIProps {
    onToss: () => void;
    isSpinning: boolean;
    result: 'heads' | 'tails' | null;
}

const UI: React.FC<UIProps> = ({ onToss, isSpinning, result }) => {
    return (
        <div className="glass-panel">
            <h1>Coin Toss</h1>
            <p>Indian 10 Rupee Edition</p>

            <button
                className="toss-btn"
                onClick={onToss}
                disabled={isSpinning}
            >
                {isSpinning ? 'Spinning...' : 'Toss Coin'}
            </button>

            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.6 }}>
                Uses Cryptographically Secure Randomness
            </div>
        </div>
    );
};

export default UI;
