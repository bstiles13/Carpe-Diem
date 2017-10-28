import React from 'react';
import placeholder from '../placeholder.png';
import CategoryMaker from './CategoryMaker';

export default class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [
                {
                    category: 'Social',
                    pages: [
                        { order: 0, name: 'Facebook', url: 'https://www.facebook.com/' },
                        { order: 1, name: 'Twitter', url: 'https://twitter.com/' },
                        { order: 2, name: 'LinkedIn', url: 'https://www.linkedin.com/' }
                    ]
                },
                {
                    category: 'News',
                    pages: [
                        { order: 3, name: 'Yahoo', url: 'https://www.yahoo.com/' },
                        { order: 4, name: 'CNN', url: 'http://www.cnn.com/' },
                        { order: 5, name: 'Huffington Post', url: 'https://www.huffingtonpost.com/' }
                    ]
                },
                {
                    category: 'Email',
                    pages: [
                        { order: 6, name: 'Google Mail', url: 'https://mail.google.com/' },
                        { order: 7, name: 'Yahoo Mail', url: 'https://mail.yahoo.com/' },
                        { order: 8, name: 'Outlook', url: 'https://outlook.live.com/' }
                    ]
                },
                {
                    category: 'Finance',
                    pages: [
                        { order: 9, name: 'Chase', url: 'https://www.chase.com/' },
                        { order: 10, name: 'Bank of America', url: 'https://www.bankofamerica.com/' },
                        { order: 11, name: 'Wells Fargo', url: 'https://www.wellsfargo.com/' }
                    ]
                },
                {
                    category: 'Shop',
                    pages: [
                        { order: 12, name: 'Amazon', url: 'https://www.amazon.com/' },
                        { order: 13, name: 'Walmart', url: 'https://www.walmart.com/' },
                        { order: 14, name: 'eBay', url: 'https://www.ebay.com/' }
                    ]
                },
                {
                    category: 'Watch',
                    pages: [
                        { order: 15, name: 'Netflix', url: 'https://www.netflix.com/' },
                        { order: 16, name: 'Hulu', url: 'https://www.hulu.com/' },
                        { order: 17, name: 'Amazon Video', url: 'https://www.primevideo.com/' }
                    ]
                }
            ]
        }
    }

    showFavorites() {
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
                    <div className='custom-title'>{favorite.category}</div>
                    <ul className='custom-list'>
                        {pages}
                    </ul>
                </div>
            )
        })
    }

    render() {
        return (
            <div id='card-container'>
                {this.showFavorites()}
                <CategoryMaker />
            </div>
        )
    }
}