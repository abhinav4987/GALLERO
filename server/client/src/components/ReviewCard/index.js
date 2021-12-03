import React from 'react'
import './style.css'
function ReviewCard({user, comment}) {
    return (
        <div className="reviewCard">
            <span>{user}</span>
            <span>{comment}</span>
        </div>
    )
}

export default ReviewCard;