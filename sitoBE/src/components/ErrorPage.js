import React from 'react';
import './ErrorPage.css';

import { Redirect } from 'react-router-dom';

class ErrorPage extends React.Component {
    render() {
        if(this.props.error) {
            return(
                <div className = "Errore">
                    <h1><h1>Si è verificato un errore!</h1>
                    <p>{this.props.errorMessage}</p></h1>
                </div>
            );
        }
        else {
            return <Redirect to = "/" />
        }
    }
}

export default ErrorPage;