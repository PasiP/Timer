import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import './App.css'

function Timer (duration, setTimerText, alarm) {
  this.start = start
  this.pause = pause
  this.reset = reset
  this.tick = tick
  this.duration = duration // milliseconds
  this.setCount = setCount
  let count = duration
  this.setTimerText = setTimerText
  let timer
  let initialMillis

  function setCount(newCount) {
    console.log('set new count to: ', newCount)
    count = newCount
  }

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
    if(this.isRunning === false || count === undefined) {
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
  const [editMode, setEditMode] = useState(false)
  const timerId = useRef(null);
  const start = Date.now()
  const audio = new Audio('./alarm-sound.mp3')
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  let duration = parseInt(urlParams.get('sec'), 10) * 1000
  const textInput = useRef(null)

  const alarm = () => {
    console.log('ALARM !!!!')
    setAlarm(true)
    audio.play()
    setTimeout(() => {setAlarm(false)}, 5000)
    setRunning(false)
  }

  const handleTextChange = (event) => {
    console.log(event.target.value)
    if(event.target.value.length === 2) {
      setTimerText(`${event.target.value}:`)
    } else {
      setTimerText(event.target.value)
    }
  }

  const convertToSeconds = (minutes, seconds) => {
    const min = parseInt(minutes)
    const sec = parseInt(seconds)

    if(isNaN(min) || isNaN(sec)) {
      return 0
    }

    return (min * 60 + sec) * 1000

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

  let setTimeButton
  if(editMode) {
    setTimeButton = <button className="btn"
    onClick={() => {
      setEditMode(false)
      console.log('SET TIME: ', timerText.substring(0,2), ':', timerText.substring(3))
      duration = convertToSeconds(timerText.substring(0,2), timerText.substring(3))
      timerId.current.setCount(duration)
      timerId.current.duration = duration
    }} >Set</button>
  } else {
    setTimeButton = <button className="btn"
      onClick={ () => {
        console.log('setTime()')
        setTimerText('')
        setEditMode(true)
        textInput.current.focus()
      }} >Set Time</button>
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
          <input ref={textInput}
            value={timerText}
            maxlength='5'
            className={isAlarmed ? 'alarmed' : 'notAlarmed'}
            oninput={handleTextChange} />
          <div className="App-buttons">
            {setTimeButton}
            {!editMode &&
              <div>
                {playPauseButton}
                <button className="btn" onClick={ () => {
                  timerId.current.reset()
                  setRunning(false)
                }} >Reset</button>
              </div>
            }
          </div>
        </div>
      </header>
    </div>
  )
}

export default App;
