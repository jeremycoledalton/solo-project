import React, { useState } from 'react';

const ThoughtForm = ({ user }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        console.log ('handle submit');
    }

    return (
        <div id="ThoughtForm">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Your thought"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default ThoughtForm;