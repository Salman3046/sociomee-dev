import React from 'react'

const ThoughtPost = ({ thought }) => {
    return (
        <>
            <div className="thought-display-block" style={{ background: thought?.thoughtBackColor,color: thought?.thoughtForeColor}}>
                <span className="ti-quote-left">
                </span>
                {thought?.caption}
                <span className="ti-quote-right">
                </span>
            </div>
        </>
    )
}

export default ThoughtPost
