import React from 'react'

export default function Alerts({params}) {
    // let message,type,dispStatus;
    let {message,type,dispStatus}=params;
    
    return (
        <div style={{display:dispStatus}} >
            <div className={`alert alert-${type}`} role="alert">
                {message}!
            </div>
        </div>
    )
}
