import React from 'react';
import placeholder from '../placeholder.png';
import CategoryMaker from './CategoryMaker';
import axios from 'axios';

export default class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: defaultFavorites,
            newFavorite: '',
            editFavorite: '',
            toggledCategory: null,
            toggledFavorite: {
                index: null,
                editing: false
            }
        }
        this.handleNewFavorite = this.handleNewFavorite.bind(this);
        this.saveFavorite = this.saveFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.handleNameEdit = this.handleNameEdit.bind(this);
        this.saveNameEdit = this.saveNameEdit.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            this.getFavorites();
        }
        console.log('favorites updated', this.state.favorites);
    }

    toggleCategory(index) {
        if (index != this.state.toggledCategory) {
            this.setState({
                toggledCategory: index
            })
        } else {
            this.setState({
                toggledCategory: null
            })
        }
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

    openFavorite(url) {
        console.log('parent clicked');
        window.open(url)
    }

    stopPropagation(e) {
        console.log('child clicked');
        e.stopPropagation();
    }

    handleNameEdit(e) {
        this.setState({
            editFavorite: e.target.value
        })
    }

    saveNameEdit() {
        let favorites = this.state.favorites;
        let categoryIndex = this.state.toggledCategory;
        let urlIndex = this.state.toggledFavorite.index;
        let edit = this.state.editFavorite
        console.log('cat', categoryIndex, 'url', urlIndex, 'newname', edit);
        favorites[categoryIndex].pages[urlIndex].name = edit;
        axios.post('http://localhost:3001/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
            let result = data.data;
            if (result == true) {
                console.log('save successful');
                this.setState({
                    toggledFavorite: {
                        index: null,
                        editing: false
                    }
                })
                this.getFavorites();
            }
        })
    }

    renderFavorites() {
        var favorites = this.state.favorites;
        return favorites.map((favorite, categoryIndex) => {
            let pages = favorite['pages'].map((page, urlIndex) => {
                return (
                    <li className='custom-item'>
                        <div className='custom-item-link favorite-text' onClick={() => this.openFavorite(page.url)}>
                            <img className="url-logo circle" src={'//logo.clearbit.com/spotify.com' + page.url} onError={(event) => event.target.setAttribute("src", placeholder)} />
                            {
                                this.state.toggledCategory == categoryIndex && this.state.toggledFavorite.index == urlIndex
                                    ? <div className="input-field edit-input" onClick={this.stopPropagation}>
                                        <input defaultValue={page.name} id="favorite-name" type="text" className="validate favorite-text" onChange={this.handleNameEdit} />
                                        <label htmlFor="favorite-name" className="active">EDIT NAME</label>
                                    </div>
                                    : <span>{page.name}</span>
                            }
                        </div>
                        {
                            this.state.toggledCategory == categoryIndex
                                ? <div>
                                    {
                                        this.state.toggledFavorite.index == urlIndex && this.state.toggledFavorite.editing == true
                                            ? <i className="material-icons success-icon" onClick={this.saveNameEdit}>check</i>
                                            : <i className="material-icons edit-icon" onClick={() => this.toggleFavorite(urlIndex, true)}>edit</i>
                                    }
                                    <i className="material-icons edit-icon" onClick={() => this.removeFavorite(categoryIndex, urlIndex)}>delete</i>
                                </div>
                                : false
                        }
                    </li>
                )
            })
            return (
                <div className='custom-card'>
                    <div className='custom-header'>
                        <div className='custom-header-child'></div>
                        <div className='custom-header-child'>{favorite.category}</div>
                        <div className='custom-header-child' id='custom-toggle'>
                            {this.props.user !== null ? <i className="material-icons custom-toggle-icon" onClick={() => this.toggleCategory(categoryIndex)}>create</i> : false}
                        </div>
                    </div>
                    <ul className='custom-list'>
                        {pages}
                        {
                            this.state.toggledCategory == categoryIndex
                                ? <li className="new-item">
                                    <div className="input-field new-item-input">
                                        <input placeholder="http://www.placeholder.com/" id="first_name" type="text" className="validate" onChange={this.handleNewFavorite} />
                                        <label htmlFor="first_name" className="active">ADD FAVORITE</label>
                                    </div>
                                    <i className="material-icons new-item-icon" onClick={() => this.saveFavorite(categoryIndex)}>add_circle</i>
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

    saveFavorite(index) {
        let favorites = this.state.favorites;
        let url = this.state.newFavorite
        let domain = '';
        let arr = url.split('www2.');
        arr = arr.length < 2 ? arr[0].split('www.') : arr[1].split('www.');
        arr = arr.length < 2 ? arr[0].split('https://') : arr[1].split('https://');
        arr = arr.length < 2 ? arr[0].split('http://') : arr[1].split('http://');
        arr = arr.length < 2 ? arr[0].split('/') : arr[1].split('/');
        domain = arr[0];
        this.setState({ toggledCategory: null })
        favorites[index].pages.push({ name: domain, url: url });
        axios.post('http://localhost:3001/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
            let result = data.data;
            if (result == true) {
                console.log('save successful');
                this.getFavorites();
            }
        })
    }

    removeFavorite(categoryIndex, urlIndex) {
        let favorites = this.state.favorites;
        console.log(categoryIndex);
        console.log(urlIndex);
        this.setState({ toggledCategory: null })
        favorites[categoryIndex].pages.splice(urlIndex, 1);
        axios.post('http://localhost:3001/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
            let result = data.data;
            if (result == true) {
                console.log('save successful');
                this.getFavorites();
            }
        })
    }

    addCategory(category) {
        console.log('category', category);
        let favorites = this.state.favorites;
        favorites.push({ category: category, pages: [] })
        let index = favorites.length - 1;
        axios.post('http://localhost:3001/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
            let result = data.data;
            if (result == true) {
                console.log('save successful');
                this.getFavorites();
                this.toggleCategory(index);
            }
        })
    }

    toggleFavorite(index, editing) {
        if (index != this.state.toggledFavorite.index || editing == true) {
            this.setState({
                toggledFavorite: {
                    index: index,
                    editing: editing
                }
            })
        } else {
            this.setState({
                toggledFavorite: {
                    index: null,
                    editing: false
                }
            })
        }
    }

    render() {
        return (
            <div id='card-container'>
                {this.renderFavorites()}
                {
                    this.props.user != null
                        ? <CategoryMaker addCategory={this.addCategory} />
                        : false
                }
            </div>
        )
    }
}

let defaultFavorites = [
    {
        category: 'Social',
        pages: [
            { name: 'Facebook', url: 'https://www.facebook.com/', editToggle: false },
            { name: 'Twitter', url: 'https://twitter.com/', editToggle: false },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/', editToggle: false }
        ],
        createToggle: false
    },
    {
        category: 'News',
        pages: [
            { name: 'Yahoo', url: 'https://www.yahoo.com/', editToggle: false },
            { name: 'CNN', url: 'http://www.cnn.com/', editToggle: false },
            { name: 'Huffington Post', url: 'https://www.huffingtonpost.com/', editToggle: false }
        ],
        createToggle: false
    },
    {
        category: 'Email',
        pages: [
            { name: 'Google Mail', url: 'https://mail.google.com/', editToggle: false },
            { name: 'Yahoo Mail', url: 'https://mail.yahoo.com/', editToggle: false },
            { name: 'Outlook', url: 'https://outlook.live.com/', editToggle: false }
        ],
        createToggle: false
    },
    {
        category: 'Finance',
        pages: [
            { name: 'Chase', url: 'https://www.chase.com/', editToggle: false },
            { name: 'Bank of America', url: 'https://www.bankofamerica.com/', editToggle: false },
            { name: 'Wells Fargo', url: 'https://www.wellsfargo.com/', editToggle: false }
        ],
        createToggle: false
    },
    {
        category: 'Shop',
        pages: [
            { name: 'Amazon', url: 'https://www.amazon.com/', editToggle: false },
            { name: 'Walmart', url: 'https://www.walmart.com/', editToggle: false },
            { name: 'eBay', url: 'https://www.ebay.com/', editToggle: false }
        ],
        createToggle: false
    },
    {
        category: 'Watch',
        pages: [
            { name: 'Netflix', url: 'https://www.netflix.com/', editToggle: false },
            { name: 'Hulu', url: 'https://www.hulu.com/', editToggle: false },
            { name: 'Amazon Video', url: 'https://www.primevideo.com/', editToggle: false }
        ],
        createToggle: false
    }
]