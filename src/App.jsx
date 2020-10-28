import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './App.css'

const Timer = (start, duration, setTimerText, alarm) => {
  let diff
  let minutes
  let seconds

  diff = duration - (((Date.now() - start) / 1000) | 0)
  console.log(diff)
  if(diff <= 0){
    alarm()
  }

  minutes = (diff / 60) | 0
  seconds = (diff % 60) | 0

  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds

  setTimerText(`${minutes}:${seconds}`)
}

const App = () => {
  const [timerText, setTimerText] = useState('00:00')
  const [isAlarmed, setAlarm] = useState(false)
  const start = Date.now()
  const audio = new Audio('./alarm-sound.mp3')
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const duration = parseInt(urlParams.get('sec'), 10)
  let intervalId

  const alarm = () => {
    console.log('ALARM !!!!')
    setAlarm(true)
    audio.play()
    setTimeout(() => {setAlarm(false)}, 5000)
    clearInterval(intervalId)
  }

  useEffect(() => {
    console.log(`${queryString} ${urlParams.get('sec')}`)
    audio.load()
    intervalId = setInterval( () => { Timer(start, duration, setTimerText, alarm) }, 1000)
  }, [])

  /* Buttons I need:
  * play/pause, reset, setTime
  */

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-container">
          <code className={isAlarmed ? 'alarmed' : 'notAlarmed'}>{timerText}</code>
        </div>
      </header>
    </div>
  )
}

export default App;
