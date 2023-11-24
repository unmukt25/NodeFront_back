import React, { useState } from 'react';
import Alerts from './Alerts';

export default function SignIn() {

    const [formValue, setformValue] = useState({
        username: '',
        password: '',
        submitReport: false
    });

    const [alertMessage, setalertMessage] = useState({
        message: 'null',
        type: 'warning',
        dispStatus: 'none'
    });

    const handleSubmit = (e) => {

        e.preventDefault();

        fetch("http://localhost:3001/signin", {
            method: 'POST',
            body: JSON.stringify(formValue),
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization':'Bearer jfkj-Somekey-'
            }
        })
        .then(res => res.json())
        .then(function (json) {
            // formValue.submitReport = json;

            if (json.status === true) {
                alertMessage.message = json.message;
                alertMessage.type = 'success';
                alertMessage.dispStatus = 'block';
                localStorage.setItem('session', JSON.stringify({ status: true, username: formValue.username ,token:json.token}));
                
            }
            else {
                alertMessage.message = json.message;
                alertMessage.type = 'danger';
                alertMessage.dispStatus = 'block';
            }
            setalertMessage({ ...alertMessage });
            setTimeout(() => {
                setalertMessage({ ...alertMessage, dispStatus: 'none' });
                json.status && window.location.replace('/');
            }, 2000)
            // console.log(alertMessage);

        })
    }

    const handleBlur = (e) => {
        e.target.attributes.focusegone.value = 'true';
    }

    const handleChange = (e) => {
        setformValue({ ...formValue, [e.target.name]: e.target.value });
    }

    return (
        <div className='container'>
            <Alerts params={alertMessage}></Alerts>

            <div className="row" style={{ justifyContent: "center" }}>
                <div className="col col-5">
                    <form onSubmit={handleSubmit}>
                        <div className='input-field'>
                            <span>User Name</span>
                            <input required focusegone='false' onBlur={handleBlur}
                                type='text' onChange={handleChange}
                                value={formValue.username} name='username' pattern='[a-zA-Z0-9@.-_]*' />
                            <span className='error-message'>User Name is not valid</span>
                        </div>

                        <div className='input-field'>
                            <span>Password</span>
                            <input required focusegone='false'
                                onBlur={handleBlur} type='password'
                                onChange={handleChange}
                                name='password' pattern='[a-zA-Z0-9]*' />
                            <span className='error-message'>Password is not valid</span>
                        </div>

                        <div className='input-field'>
                            <button className="btn btn-primary">Submit</button>
                        </div>


                    </form>
                </div>


            </div>
        </div>
    )
}
