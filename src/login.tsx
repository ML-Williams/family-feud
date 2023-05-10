import React, {useState} from "react";
import {channel} from "./App";



export const Login = (props: { onFormSwitch: (arg0: string) => void }) => {
    const [username, setUsername] = useState('')
    return (
        <div className="login">
            <input
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
                placeholder="Enter Username Here"
            />
            <input
                type='button'
                value='Login'
                onClick={() => {
                    if (username === '') {
                        alert('Please enter a username')
                    } else {
                        props.onFormSwitch('play')
                    }
                }
                }
            />

            <input
                type='button'
                value='Need an Username? Create one here'
                onClick={() => {
                    props.onFormSwitch('signUp')
                    channel.send({
                        type: 'broadcast',
                        event: 'player move',
                        payload: {move: 'over there'}
                    })
                }}
            />
        </div>
    )
}