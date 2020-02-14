import React from 'react';
import placeholder from '../../images/placeholder.png';

import './ModalEdit.scss';

export default class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: '',
        }
        this.handleNameEdit = this.handleNameEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toggledCategory && nextProps.toggledFavorite) {
            this.setState({
                nameInput: nextProps.favorites[nextProps.toggledCategory].pages[nextProps.toggledFavorite].name
            })
        }
    }

    handleNameEdit(e) {
        this.setState({
            nameInput: e.target.value
        })
    }

    render() {
        let favorites = this.props.favorites;
        let category = this.props.toggledCategory;
        let favorite = this.props.toggledFavorite;
        return (

            <div className="modal fade" id="modal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Favorite</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {
                            category && favorite
                                ? <div>
                                    <div className="modal-body">
                                        <div id="modal-edit-content">
                                            <div className="input-field edit-input" key={favorites[category].pages[favorite].name}>
                                                <input defaultValue={favorites[category].pages[favorite].name || ''} id="favorite-name" type="text" className="validate favorite-text" style={{ 'color': 'black' }} onChange={this.handleNameEdit} />
                                                <label htmlFor="favorite-name" className="active">EDIT NAME</label>
                                            </div>
                                            <div id="preview-content">
                                                <h6>Preview:</h6>
                                                <div className='custom-item'>
                                                    <div className='custom-item-link favorite-text'>
                                                        <img className="url-logo circle" src={'//logo.clearbit.com/spotify.com' + favorites[category].pages[favorite].url} onError={(event) => event.target.setAttribute("src", placeholder)} alt='' />
                                                        <span>{this.state.nameInput}</span>
                                                    </div>
                                                    <i className="material-icons">drag_handle</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.props.saveNameEdit(this.state.nameInput)}>Save</button>
                                    </div>
                                </div>
                                : false
                        }
                    </div>
                </div>
            </div>
        )
    }
}