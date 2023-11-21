import React, { useState } from 'react';
import './formfill.css';
import CheckUserSession from './CheckUserSession';
export default function FormFill() {

    const [formValue, setformValue] = useState({
        name: "",
        age: "",
        mobile: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValue)
        }).then((resp) => {
            // console.warn("resp",resp);;
            resp.json().then((result) => {
                console.warn("result", result)
            })
        })
    }

   if (!CheckUserSession())
        return;

    return (
        <div className='user-form'>
            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                    <span>Enter Name</span>
                    <input required focusegone='false' onBlur={(e) => { e.target.attributes.focusegone.value = 'true' }}
                        type='text' onChange={(e) => { setformValue({ ...formValue, name: e.target.value }) }}
                        value={formValue.name} name='empname' pattern='[a-z]*' />
                    <span className='error-message'>Name is not valid</span>
                </div>

                <div className='input-field'>
                    <span>Enter Age</span>
                    <input required focusegone='false'
                        onBlur={(e) => { e.target.attributes.focusegone.value = 'true' }} type='text'
                        onChange={(e) => { setformValue({ ...formValue, age: e.target.value }) }}
                        name='empage' pattern='[0-9][0-9]' />
                    <span className='error-message'>Age is not valid</span>
                </div>

                <div className='input-field'>
                    <span>Enter Mobile</span>
                    <input required focusegone='false' type='text' onBlur={(e) => { e.target.attributes.focusegone.value = 'true' }}
                        onChange={(e) => { setformValue({ ...formValue, mobile: e.target.value }) }}
                        value={formValue.mobile}
                        name='empmobile' pattern='[0-9]{10}' />
                    <span className='error-message'>Mobile number is not valid</span>
                </div>

                <div className='input-field'>
                    <button className="btn btn-primary">Submit</button>
                </div>


            </form>
        </div>
    )
}
