import React, {useEffect, useState} from 'react'
import {SignUp} from "./signUp";
import {Login} from "./login";
import './App.css';
import {Board} from './board';
import {createClient} from "@supabase/supabase-js";

const supabaseUrl = 'https://ulsmpuysqyuftowapzsw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsc21wdXlzcXl1ZnRvd2FwenN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4MjM0NzYsImV4cCI6MTk5NDM5OTQ3Nn0.8A_onquRzOO8TOI7lHdGwBOQt-mOVCQ8JVRpP4J-9Tk'
const supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
        params: {
            eventsPerSecond: 10,
        }
    }
})
export const channel = supabase.channel('room')




const TitleScreen = () => {
    const [title, setTitle] = useState('titleScreen')
 // local play or online play
}


const App = () => {
    const [currentForm, setCurrentForm] = useState('login')

    const [mode, setMode] = useState('default')

    const toggleForm = (formName: React.SetStateAction<string>) => {
        setCurrentForm(formName)
    }

    useEffect(() => {
        channel.subscribe((status) => {
            if (status ==='SUBSCRIBED'){
                console.log('player 1 connected')
            }
        })

        const rtc = channel.on('broadcast',
            {
                event: 'player move'
            }, (payload) => {
                console.log(payload)
            })

        return () => {
            rtc.unsubscribe()
        }
    }, [])

    return (
        <div>

            {mode === 'default' && (
                currentForm === "login"
                ? <Login onFormSwitch={toggleForm} />
                : <SignUp onFormSwitch={toggleForm}/>
            )}
            <div>
                <Board />
            </div>
        </div>

    )
}

export default App