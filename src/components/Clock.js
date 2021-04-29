import React, { useEffect, useState } from 'react'
import PlayAndReset from './PlayAndReset'
import TimeSetter from './TimeSetter'

const Clock = () => {

    const [breakTime, setBreakTime] = useState(5)
    const [sessionTime, setSessionTime] = useState(25)
    const [clock, setClock] = useState({
        min: 25,
        sec: 0,
        isActive: false,
        isInSession: true,
    })
    const getSetter = { setBreakTime, setSessionTime, setClock }
    const [min, max] = [1, 60]
    const audioUrl = 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
    const audio = new Audio(audioUrl)

    useEffect(() => {
        let intervalId

        if (clock.min <= 0 && clock.sec <= 0) {
            const getTimer = clock.isInSession ? breakTime : sessionTime

            setClock(prev => ({
                ...prev,
                min: getTimer,
                sec: 0,
                isInSession: !prev.isInSession
            }))
            audio.play()
        }

        if (clock.isActive) {
            intervalId = setInterval(() => {
                clock.sec <= 0
                    ? setClock(prev => ({ ...prev, min: prev.min - 1, sec: 59 }))
                    : setClock(prev => ({ ...prev, sec: prev.sec - 1 }))
            }, 1000);
        }
        return () => clearInterval(intervalId)

    }, [
        breakTime,
        sessionTime,
        clock.min,
        clock.sec,
        clock.isActive,
        clock.isInSession,
        audio
    ])

    return (
        <div id='clock'>

            <h2>POMO-CLOCK</h2>
            <div id='time-left' className='display'>
                {clock.min < 10 ? '0' + clock.min : clock.min}:
                {clock.sec < 10 ? '0' + clock.sec : clock.sec}
            </div>

            <div id='controller'>
                <TimeSetter
                    setTime={breakTime}
                    getSetter={getSetter}
                    clock={clock}
                    min={min}
                    max={max}
                    setterId={'break'}
                />
                <TimeSetter
                    setTime={sessionTime}
                    getSetter={getSetter}
                    clock={clock}
                    min={min}
                    max={max}
                    setterId={'session'}
                />
                <PlayAndReset
                    setBreakTime={setBreakTime}
                    setSessionTime={setSessionTime}
                    setClock={setClock}
                />
            </div>
        </div>
    )
}

export default Clock
