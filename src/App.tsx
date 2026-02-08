import { useState } from 'react'
import Coin from './components/Coin'
import UI from './components/UI'
import History from './components/History'
import confetti from 'canvas-confetti'
import './App.css'

function App() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<'heads' | 'tails' | null>(null)
  const [rotation, setRotation] = useState(0)
  const [history, setHistory] = useState<{ id: number, result: 'heads' | 'tails' }[]>([])

  const handleToss = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Secure randomness logic
    const array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    // 0 is heads, 1 is tails
    const isHeads = array[0] % 2 === 0
    const newResult: 'heads' | 'tails' = isHeads ? 'heads' : 'tails'

    // Calculate new rotation
    const baseRotation = rotation + 1800 + (Math.floor(Math.random() * 5) * 360)
    const targetRotation = isHeads
      ? Math.ceil(baseRotation / 360) * 360
      : Math.ceil(baseRotation / 360) * 360 + 180

    setRotation(targetRotation)

    // Duration matches CSS transition
    setTimeout(() => {
      setResult(newResult)
      setHistory(prev => {
        const nextId = prev.length > 0 ? prev[0].id + 1 : 1
        return [{ id: nextId, result: newResult }, ...prev].slice(0, 20)
      })

      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: isHeads ? ['#ef4444', '#ffffff', '#991b1b'] : ['#475569', '#94a3b8', '#ffffff']
      })

      setIsSpinning(false)
    }, 3000)
  }

  const handleClose = () => {
    setResult(null)
  }

  return (
    <main className="main-layout">
      <div className="app-container">
        <Coin isSpinning={isSpinning} rotation={rotation} />
        <UI onToss={handleToss} isSpinning={isSpinning} />
      </div>
      <History history={history} />

      {/* Result Overlay / Modal */}
      <div className={`result-overlay ${result ? 'show' : ''}`} onClick={handleClose}>
        <div className="result-card" onClick={(e) => e.stopPropagation()}>
          <h2>The Result is</h2>
          <p className={`result-text ${result}`}>
            {result?.toUpperCase()}
          </p>
          <div className="close-hint">Click anywhere to continue</div>
        </div>
      </div>
    </main>
  )
}

export default App
