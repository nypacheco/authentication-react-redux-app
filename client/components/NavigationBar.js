import React from 'react';
import { Link } from 'react-router';

export default () => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Yuki</Link>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}