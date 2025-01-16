import React, { useState } from 'react';

const ThoughtFeed = ({ user}) => {
    const [message, setMessage] = useState('');


    return (
        <div id="ThoughtFeed">
            <h1>Thought Feed</h1>
        </div>
    )

}


export default ThoughtFeed;