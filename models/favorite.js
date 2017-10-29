let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let favoriteSchema = new Schema({
    user: {
        type: String,
        index: {
            unique: true
        }
    },
    favorites: {
        type: [],
        default: [
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
    }
});

let Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;