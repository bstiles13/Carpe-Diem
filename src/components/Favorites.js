import React from 'react';
import placeholder from '../placeholder.png';

export default class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [
                {
                    category: 'Social',
                    pages: [
                        { name: 'Facebook', url: 'https://www.facebook.com/' },
                        { name: 'Twitter', url: 'https://twitter.com/' },
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/' }
                    ]
                },
                {
                    category: 'News',
                    pages: [
                        { name: 'Yahoo', url: 'https://www.yahoo.com/' },
                        { name: 'CNN', url: 'http://www.cnn.com/' },
                        { name: 'Huffington Post', url: 'https://www.huffingtonpost.com/' }
                    ]
                },
                {
                    category: 'Email',
                    pages: [
                        { name: 'Google Mail', url: 'https://mail.google.com/' },
                        { name: 'Yahoo Mail', url: 'https://mail.yahoo.com/' },
                        { name: 'Outlook', url: 'https://outlook.live.com/' }
                    ]
                },
                {
                    category: 'Finance',
                    pages: [
                        { name: 'Chase', url: 'https://www.chase.com/' },
                        { name: 'Bank of America', url: 'https://www.bankofamerica.com/' },
                        { name: 'Wells Fargo', url: 'https://www.wellsfargo.com/' }
                    ]
                },
                {
                    category: 'Shop',
                    pages: [
                        { name: 'Amazon', url: 'https://www.amazon.com/' },
                        { name: 'Walmart', url: 'https://www.walmart.com/' },
                        { name: 'eBay', url: 'https://www.ebay.com/' }
                    ]
                },
                {
                    category: 'Watch',
                    pages: [
                        { name: 'Netflix', url: 'https://www.netflix.com/' },
                        { name: 'Hulu', url: 'https://www.hulu.com/' },
                        { name: 'Amazon Video', url: 'https://www.primevideo.com/' }
                    ]
                }
            ]
        }
    }

    showFavorites() {
        var favorites = this.state.favorites;
        return favorites.map(favorite => {
            let pages = favorite['pages'].map(page => {
                // let domain = url.indexOf('//www') === -1 ? url.split('//')[1].split('/')[0] : url.split('//www.')[1].split('/')[0];
                // domain = domain.substring(0, domain.lastIndexOf('.')).toUpperCase();
                return (
                    <div>
                        <div className="chip">
                            <img className="url-logo" src={'//logo.clearbit.com/spotify.com' + page.url} />
                            {page.name}
                        </div>
                        <br />
                    </div>
                )
            })
            return (
                <div className='custom-card'>
                    <h5>{favorite.category}</h5>
                    {pages}
                </div>
            )
        })
    }

    render() {
        return (
            <div id='card-container'>
                {this.showFavorites()}
            </div>
        )
    }
}