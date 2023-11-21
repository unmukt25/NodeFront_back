import React from 'react';
import { Link } from 'react-router-dom'

export default function Navbar() {
    // const [loggedin, setLoggedin] = useState({ status: false, username: '' });
    const loggedin = { status: false, username: '' }
    const lstore = JSON.parse(localStorage.getItem('session'));
    if (lstore?.status) {
        loggedin.status = true;
        loggedin.username = lstore.username;
    }

    console.log(lstore);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="listdata">Data List</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="form">Form Fill</Link>
                            </li>
                        </ul>
                        <div className="d-flex signin">
                            {loggedin.status ?
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li><Link className='link' to="signout">SignOut-{loggedin.username} </Link> </li>
                                </ul>
                                :
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li><Link className='link' to="signup">SignUp </Link> </li>
                                    <li><Link className='link' to="signin">SignIn</Link></li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
