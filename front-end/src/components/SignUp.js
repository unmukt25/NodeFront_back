import React, { useState } from 'react';
import Alerts from './Alerts';

export default function SignUp() {

    const [formValue, setformValue] = useState({
        username: '',
        password: '',
        conf_password: '',
        submitReport: false
    });

    const [alertMessage, setalertMessage] = useState({
        message: 'null',
        type:'warning',
        dispStatus:'none'
    });

    const handleSubmit = async (e) => {
        // console.log(formValue);
        e.preventDefault();
        try {
            await fetch("http://localhost:3001/signup",
                {
                    method: 'POST',
                    body: JSON.stringify(formValue),
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVAZW1haWwuY29tIiwiX2lkIjoiNjRkZjk5ZTQyMjJmNWU2MjljZGQ0NDljIiwiaWF0IjoxNjkyMzc1NTI0LCJleHAiOjE2OTQ5Njc1MjR9.1qWZ3pRHz2vCyS9pOW8N14SMo9LaPoSI1O8qlV68u5Y'
                    },
                })
                .then((res) => res.json())
                .then((json) => {

                    formValue.submitReport = json.status;

                    if (formValue.submitReport.acknowledged) {
                        alertMessage.message='User Created';
                        alertMessage.type='success';
                        alertMessage.dispStatus='block';
                    }
                    else {
                        alertMessage.message='User Already Exist';
                        alertMessage.type='danger';
                        alertMessage.dispStatus='block';
                    }
                    setalertMessage({...alertMessage});
                    setTimeout(() => { 
                        setalertMessage({...alertMessage,dispStatus:'none'})
                     }, 2000)
                    // console.log(alertMessage);

                });
        } catch (error) {
            console.log(error);
        }
    }

    const handleBlur=(e)=>{
        e.target.attributes.focusegone.value = 'true' ;
    }
    
    const handleChange=(e)=>{
        setformValue({...formValue,[e.target.name]:e.target.value});
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
                            <span>Confirm Password</span>
                            <input required focusegone='false' type='password' onBlur={handleBlur}
                                onChange={handleChange}
                                value={formValue.conf_password}
                                name='conf_password' pattern={formValue.password} />
                            <span className='error-message'>Password is not maching with Confirm Password</span>
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
