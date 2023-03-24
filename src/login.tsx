import React, {useState} from "react";
import {channel} from "./App";

export const Login = (props: { onFormSwitch: (arg0: string) => void }) => {
    const [username, setUsername] = useState('')
    return (
        <div>
            <input
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
                placeholder="Enter Username Here"
            />
            <button>Log In</button>
            <button
                onClick={() => {
                    props.onFormSwitch('signUp')
                    channel.send({
                        type: 'broadcast',
                        event: 'player move',
                        payload: {move: 'over there'}
                    })
                }}
            > Need an Username? Create one here
            </button>
        </div>
    )
}