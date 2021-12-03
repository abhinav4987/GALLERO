import React from 'react'

import './style.css'

function InfoCard({icon , attribute, value}) {
    return (
        <div className="infoCard">
            <div className="card-icon">
                {icon}
            </div>
            <div className="infoCard-info">
                <h3>{attribute}</h3>
                <span>{value}</span>
            </div>
        </div>
    )
}

export default InfoCard
