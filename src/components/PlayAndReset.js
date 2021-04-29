import React from 'react'

const PlayAndReset = ({ setBreakTime, setSessionTime, setClock }) => {

    const handleReset = () => {
        setBreakTime(5)
        setSessionTime(25)
        setClock({ min: 25, sec: 0, isActive: false, isInSession: true })
    }
    const handlePlay = () => {
        setClock(prev => ({ ...prev, isActive: !prev.isActive }))
    }

    return (
        <div className='play-reset'>
            <button id="start_stop" onClick={handlePlay}>
                <i className="fas fa-play"></i>
                <i className="fas fa-pause"></i>
            </button>
            <button id="reset" onClick={handleReset}>
                <i className="fas fa-redo"></i>
            </button>
        </div>

    )
}

export default PlayAndReset
