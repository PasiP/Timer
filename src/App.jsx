import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import './App.css'

function Timer (duration, setTimerText, alarm) {
  this.start = start
  this.pause = pause
  this.reset = reset
  this.tick = tick
  this.duration = duration // milliseconds
  this.setTimerText = setTimerText
  let timer

  let count = this.duration
  let initialMillis

  function start() {
    console.log('Start()')
    clearInterval(timer)
    initialMillis = Date.now()
    timer = setInterval(this.tick, 100)
    const time = convertSeconds(count)
    setTimerText(`${time.minutes}:${time.seconds}`)
  }

  function pause() {
    console.log('Pause()')
    clearInterval(timer)
    const time = convertSeconds(count)
    setTimerText(`${time.minutes}:${time.seconds}`)
  }

  function reset() {
    console.log('Reset()')
    clearInterval(timer)
    count = this.duration
    const time = convertSeconds(count)
    setTimerText(`${time.minutes}:${time.seconds}`)
  }

  function tick() {
    if(this.isRunning === false) {
      return
    }

    if(count <= 0) {
      clearInterval(timer)
      alarm()
      return
    }

    const current = Date.now()
    count = count - (current - initialMillis)
    initialMillis = current
    console.log(count) // display this
    const time = convertSeconds(count)
    setTimerText(`${time.minutes}:${time.seconds}`)
  }

}

const convertSeconds = (milliSec) => {
  let sec = milliSec / 1000
  let minutes = (sec / 60) | 0
  let seconds = (sec % 60) | 0

  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds

  return {minutes: minutes, seconds: seconds}
}

const App = () => {
  const [timerText, setTimerText] = useState('')
  const [isAlarmed, setAlarm] = useState(false)
  const [isRunning, setRunning] = useState(false)
  const timerId = useRef(null);
  const start = Date.now()
  const audio = new Audio('./alarm-sound.mp3')
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  let duration = parseInt(urlParams.get('sec'), 10) * 1000

  const alarm = () => {
    console.log('ALARM !!!!')
    setAlarm(true)
    audio.play()
    setTimeout(() => {setAlarm(false)}, 5000)
    setRunning(false)
  }

  let playPauseButton
  if(timerId.current != null) {
    if(isRunning) {
      playPauseButton = <button className="btn" onClick={ () => {
        timerId.current.pause()
        setRunning(false)
      }} >Pause</button>
    } else {
      playPauseButton = <button className="btn" onClick={ () => {
        timerId.current.start()
        setRunning(true)
      }} >Play</button>
    }
  }

  useEffect(() => {
    if(isNaN(duration)) {
      duration = 0
    }
    const time = convertSeconds(duration)
    setTimerText(`${time.minutes}:${time.seconds}`)
    audio.load()
    timerId.current = new Timer(duration, setTimerText, alarm)
    },[])

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-container">
          <code className={isAlarmed ? 'alarmed' : 'notAlarmed'}>{timerText}</code>
          <div className="App-buttons">
            {/* <button className="btn" onClick={ () => {console.log('setTime()')}} >setTime</button> */}
            {playPauseButton}
            <button className="btn" onClick={ () => {
              timerId.current.reset()
              setRunning(false)
            }} >Reset</button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App;
