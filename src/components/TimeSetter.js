import React from 'react'

const TimeSetter = ({ setTime, getSetter, clock, min, max, setterId }) => {

    const handleSession = count => {
        if (!clock.isActive) {
            if (setterId === 'break') {
                getSetter.setBreakTime(prev => prev + count)
                return
            }

            getSetter.setSessionTime(prev => prev + count)
            if (clock.isInSession)
                getSetter.setClock(prev => ({
                    ...prev,
                    min: setTime + count, sec: 0
                }))
        }
    }

    return <div id={`${setterId}-label`}>
        {setterId.toUpperCase()}
        <div id={`${setterId}-length`} className='display'>{setTime}
        </div>
        <div className='btn-controller'>
            <button id={`${setterId}-decrement`}
                onClick={() => (setTime > min) && handleSession(-1)}>
                <i className="fas fa-caret-down"></i>
            </button>
            <button id={`${setterId}-increment`}
                onClick={() => (setTime < max) && handleSession(1)}>
                <i className="fas fa-caret-up"></i>
            </button>
        </div>
    </div>
}


export default TimeSetter
