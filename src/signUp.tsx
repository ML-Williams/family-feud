import React, {useState} from "react";

export const SignUp = (props: { onFormSwitch: (arg0: string) => void }) => {
    const [user, setUser] = useState('')

    return (
        <div>
            <input
                value={user}
                onChange={(e) => {
                    setUser(e.target.value)
                }}
            />
            <button>Sign Up</button>
            <button
                onClick={() => props.onFormSwitch('login')}
            >Already have an account? Click here
            </button>
        </div>
    )
}