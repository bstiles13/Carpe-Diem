import React from 'react';
import { Link } from 'react-router-dom'

export default class ModalWelcome extends React.Component {

    render() {
        return (
            <div className="modal fade" id="modal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div id="welcome-modal" className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div id="welcome-modal-header" className="modal-header">
                            <div className="welcome-modal-child"></div>
                            <h4 className="modal-title welcome-modal-child" id="exampleModalLabel">Hello!</h4>
                            <div className="welcome-modal-child">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <p style={{ "fontSize": "18px" }}>
                                <Link to="/login"><span classNameName="modal-action modal-close"><b>Sign in </b></span></Link>
                                to customize your homepage experience, or continue as a guest and explore some of the web's most popular destinations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}