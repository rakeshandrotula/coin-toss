import React from 'react';

interface HistoryItem {
    id: number;
    result: 'heads' | 'tails';
}

interface HistoryProps {
    history: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
    return (
        <div className="history-panel glass-panel">
            <h3>Toss History</h3>
            <div className="history-info">Showing last 20 results</div>
            <div className="history-list">
                {history.length === 0 ? (
                    <p style={{ opacity: 0.5 }}>No tosses yet</p>
                ) : (
                    history.map((item) => (
                        <div key={item.id} className={`history-item ${item.result}`}>
                            <span>#{item.id}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="symbol">{item.result === 'heads' ? 'H' : 'T'}</span>
                                <strong>{item.result.toUpperCase()}</strong>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default History;
