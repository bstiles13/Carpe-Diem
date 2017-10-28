import React from 'react';
import placeholder from '../placeholder.png';
import CategoryMaker from './CategoryMaker';
import axios from 'axios';

export default class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: defaultFavorites,
            newFavorite: ''
        }
        this.createFavoriteToggle = this.createFavoriteToggle.bind(this);
        this.handleNewFavorite = this.handleNewFavorite.bind(this);
        this.saveFavorite = this.saveFavorite.bind(this);
    }

    componentDidMount() {
        this.getFavorites();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.getFavorites();                    
        }
    }

    createFavoriteToggle(category) {
        let favorites = this.state.favorites;
        let foundIndex = favorites.findIndex(x => x.category == category);
        favorites[foundIndex].createToggle = !favorites[foundIndex].createToggle;
        this.setState({
            favorites: favorites
        })
    }

    getFavorites() {
        if (this.props.user != null) {
            console.log('user:', this.props.user);
            axios.post('http://localhost:3001/findfavorites', { user: this.props.user }).then(data => {
                console.log('got favorites', data);
                this.setState({
                    favorites: data.data[0].favorites
                })
            })
        } else {
            this.setState({
                favorites: defaultFavorites
            })
        }
    }

    renderFavorites() {
        var favorites = this.state.favorites;
        return favorites.map(favorite => {
            let pages = favorite['pages'].map(page => {
                return (
                    <li className='custom-item'>
                        <a href={page.url} target='_blank' className='custom-item-link'>
                            <img className="url-logo circle" src={'//logo.clearbit.com/spotify.com' + page.url} />
                            <span>{page.name}</span>
                        </a>
                        <a className='dropdown-button custom-item-dropdown' href='#' data-activates={page.order}><i className="material-icons">arrow_drop_down</i></a>
                        <ul id={page.order} className='dropdown-content'>
                            <li><a href="#!"><i className="material-icons">edit</i>Edit</a></li>
                            <li><a href="#!"><i className="material-icons">delete</i>Remove</a></li>
                        </ul>
                    </li>
                )
            })
            return (
                <div className='custom-card'>
                    <div className='custom-header'>
                        <div className='custom-header-child'></div>
                        <div className='custom-header-child'>{favorite.category}</div>
                        <div className='custom-header-child' id='custom-toggle'>
                            { this.props.user !== null ? <i className="material-icons custom-toggle-icon" onClick={() => this.createFavoriteToggle(favorite.category)}>create</i> : false }
                        </div>
                    </div>
                    <ul className='custom-list'>
                        {pages}
                        { favorite.createToggle
                        ? <li className="new-item">
                            <div className="input-field new-item-input">
                                <input placeholder="http://www.placeholder.com/" id="first_name" type="text" className="validate" onChange={this.handleNewFavorite} />
                                <label htmlFor="first_name" className="active">URL</label>
                            </div>
                            <i className="material-icons new-item-icon" onClick={this.saveFavorite}>add_circle</i>
                        </li>
                        : false
                        }
                    </ul>
                </div>
            )
        })
    }

    handleNewFavorite(e) {
        this.setState({
            newFavorite: e.target.value
        })
    }

    saveFavorite() {
        axios.post('http://localhost:3001/savefavorite', {url: this.state.newFavorite}).then(data => {
            console.log('favorite added:', data);
        })
    }

    render() {
        return (
            <div id='card-container'>
                {this.renderFavorites()}
                <CategoryMaker />
            </div>
        )
    }
}

let defaultFavorites = [
    {
        category: 'Social',
        pages: [
            { order: 0, name: 'Facebook', url: 'https://www.facebook.com/' },
            { order: 1, name: 'Twitter', url: 'https://twitter.com/' },
            { order: 2, name: 'LinkedIn', url: 'https://www.linkedin.com/' }
        ],
        createToggle: false
    },
    {
        category: 'News',
        pages: [
            { order: 3, name: 'Yahoo', url: 'https://www.yahoo.com/' },
            { order: 4, name: 'CNN', url: 'http://www.cnn.com/' },
            { order: 5, name: 'Huffington Post', url: 'https://www.huffingtonpost.com/' }
        ],
        createToggle: false
    },
    {
        category: 'Email',
        pages: [
            { order: 6, name: 'Google Mail', url: 'https://mail.google.com/' },
            { order: 7, name: 'Yahoo Mail', url: 'https://mail.yahoo.com/' },
            { order: 8, name: 'Outlook', url: 'https://outlook.live.com/' }
        ],
        createToggle: false
    },
    {
        category: 'Finance',
        pages: [
            { order: 9, name: 'Chase', url: 'https://www.chase.com/' },
            { order: 10, name: 'Bank of America', url: 'https://www.bankofamerica.com/' },
            { order: 11, name: 'Wells Fargo', url: 'https://www.wellsfargo.com/' }
        ],
        createToggle: false
    },
    {
        category: 'Shop',
        pages: [
            { order: 12, name: 'Amazon', url: 'https://www.amazon.com/' },
            { order: 13, name: 'Walmart', url: 'https://www.walmart.com/' },
            { order: 14, name: 'eBay', url: 'https://www.ebay.com/' }
        ],
        createToggle: false
    },
    {
        category: 'Watch',
        pages: [
            { order: 15, name: 'Netflix', url: 'https://www.netflix.com/' },
            { order: 16, name: 'Hulu', url: 'https://www.hulu.com/' },
            { order: 17, name: 'Amazon Video', url: 'https://www.primevideo.com/' }
        ],
        createToggle: false
    }
]