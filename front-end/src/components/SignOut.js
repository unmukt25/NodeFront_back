import React from 'react'
import Alerts from './Alerts';
import { Link } from 'react-router-dom';

export default function SignOut() {

    (()=>{
        localStorage.removeItem('session');
        setTimeout(() => {
            window.location.replace("/");
        }, 2000);
    })();

    const alertbody={
        message: 'Logged out Successfully',
        type: 'success',
        dispStatus: 'block'
    }

  return (
    <div>
        <Alerts params={alertbody}/>

        <Link to='/signin'>Go to Sign In</Link>
    </div>
  )
}
