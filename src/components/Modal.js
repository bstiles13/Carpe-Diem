import React from 'react';
import { Link } from 'react-router-dom'

export default class Modal extends React.Component {

    render() {
        return (
            <div id="modal1" className="modal bottom-sheet">
                <div className="modal-content" style={{ 'fontSize': '18px' }}>
                    <h4>Hello!</h4>
                    <p>
                        <Link to="/login"><span className="modal-action modal-close"><b>Sign in </b></span></Link>
                        to customize your homepage experience, or continue as a guest and explore some of the web's most popular destinations.
                    </p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>
        )
    }

}