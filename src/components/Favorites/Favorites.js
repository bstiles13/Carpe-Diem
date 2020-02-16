import React from 'react';
import placeholder from '../../assets/images/placeholder.png';
import CategoryMaker from '../CategoryMaker/CategoryMaker';
import ModalEdit from '../ModalEdit/ModalEdit';
import axios from 'axios';
import { get, map } from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Icon, Input } from 'semantic-ui-react';

import './Favorites.scss';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      favorites: defaultFavorites,
      editFavorite: '',
      toggledCategory: null,
      toggledFavorite: null
    }
    this.handleNewFavorite = this.handleNewFavorite.bind(this);
    this.saveFavorite = this.saveFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.saveNameEdit = this.saveNameEdit.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.toggleCategory = this.toggleCategory.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getFavorites();
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  getFavorites() {
    if (this.props.user) {
      axios.post('/findfavorites', { user: this.props.user }).then(data => {
        this.setState({
          favorites: get(data, 'data.0.favorites')
        })
      })
    } else {
      this.setState({
        favorites: defaultFavorites
      })
    }
  }

  openFavorite(url) {
    window.open(url)
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  saveNameEdit(newName) {
    let favorites = this.state.favorites;
    let categoryIndex = this.state.toggledCategory;
    let urlIndex = this.state.toggledFavorite;
    let edit = newName;
    favorites[categoryIndex].pages[urlIndex].name = edit;

    if (!this.props.user) {
      this.setState({ favorites });
      this.handleClose();
    } else {
      axios.post('/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
        let result = data.data;
        if (result) {
          this.setState({
            toggledFavorite: null
          })
          this.getFavorites();
          this.handleClose();
        }
      })
    }
  }

  handleNewFavorite(e) {
    this.setState({
      newFavorite: e.target.value
    })
  }

  saveFavorite(index) {
    let favorites = this.state.favorites;
    let url = this.state.newFavorite

    if (!url || url.length < 1) return;

    let domain = '';
    let arr = url.split('www2.');
    arr = arr.length < 2 ? arr[0].split('www.') : arr[1].split('www.');
    arr = arr.length < 2 ? arr[0].split('https://') : arr[1].split('https://');
    arr = arr.length < 2 ? arr[0].split('http://') : arr[1].split('http://');
    arr = arr.length < 2 ? arr[0].split('/') : arr[1].split('/');
    domain = arr[0];
    this.setState({ toggledCategory: null })
    favorites[index].pages.push({ name: domain, url: 'http://' + domain });

    if (!this.props.user) {
      this.setState({ favorites });
    } else {
      axios.post('/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
        let result = data.data;
        if (result) {
          this.getFavorites();
        }
      })
    }
  }

  removeFavorite(categoryIndex, urlIndex) {
    let favorites = this.state.favorites;
    this.setState({ toggledCategory: null })
    favorites[categoryIndex].pages.splice(urlIndex, 1);

    if (!this.props.user) {
      this.setState({ favorites });
    } else {
      axios.post('/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
        let result = data.data;
        if (result) {
          this.getFavorites();
        }
      })
    }
  }

  addCategory(category) {
    let favorites = this.state.favorites;
    favorites.push({ category: category, pages: [] })

    if (!this.props.user) {
      this.setState({ favorites });
    } else {
      let index = favorites.length - 1;
      axios.post('/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
        let result = data.data;
        if (result) {
          this.getFavorites();
          this.toggleCategory(index);
        }
      })
    }
  }

  removeCategory(index) {
    let favorites = this.state.favorites;
    this.setState({ toggledCategory: null })
    favorites.splice(index, 1);

    if (!this.props.user) {
      this.setState({ favorites });
    } else {
      axios.post('/updatefavorites', { favorites: favorites, user: this.props.user }).then(data => {
        let result = data.data;
        if (result) {
          this.getFavorites();
        }
      })
    }
  }

  toggleCategory(index) {
    if (index !== this.state.toggledCategory) {
      this.setState({
        toggledCategory: index,
        toggledFavorite: null
      })
    } else {
      this.setState({
        toggledCategory: null,
        toggledFavorite: null
      })
    }
  }

  toggleFavorite(urlIndex) {
    this.setState({ toggledFavorite: urlIndex })
  }

  onDragEnd(result, index) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    let items = this.state.favorites;
    items[index].pages = reorder(items[index].pages, result.source.index, result.destination.index);
    if (this.props.user) {
      axios.post('/updatefavorites', { favorites: items, user: this.props.user }).then(data => {
        let result = data.data;
        if (result) {
          this.getFavorites();
        }
      })
    } else {
      this.setState({ items });
    }
  }

  renderFavorites() {
    let favorites = this.state.favorites;

    if (!favorites) return;

    return map(favorites, (favorite, categoryIndex) => {
      let list = map(favorite.pages, (page, urlIndex) => (
        <Draggable key={urlIndex} draggableId={urlIndex}>
          {(provided, snapshot) => (
            <div>
              <div className='card-item' key={urlIndex} ref={provided.innerRef} style={getItemStyle(provided.draggableStyle, snapshot.isDragging)} {...provided.dragHandleProps}>
                <div className='card-item-link favorite-text' onClick={() => this.openFavorite(page.url)}>
                  <img className='url-logo circle' src={'//logo.clearbit.com/spotify.com' + page.url} onError={(event) => event.target.setAttribute('src', placeholder)} alt='' />
                  <span>{page.name}</span>
                </div>
                {
                  this.state.toggledCategory == categoryIndex
                    ? <div onClick={() => this.toggleFavorite(urlIndex)}>
                      <Icon name='pencil' onClick={this.handleOpen} />
                      <Icon name='trash' onClick={() => this.removeFavorite(categoryIndex, urlIndex)} />
                    </div>
                    : <Icon name='arrows alternate' />
                }
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      ))
      return (
        <div className='custom-card'>
          <div className='card-header'>
            <div className='custom-header-child custom-delete'>
              {this.state.toggledCategory === categoryIndex ? <Icon name='trash' onClick={() => this.removeCategory(categoryIndex)} /> : false}
            </div>
            <div className='custom-header-child'>{favorite.category}</div>
            <div className='custom-header-child' id='custom-toggle'>
              <Icon name='pencil' onClick={() => this.toggleCategory(categoryIndex)} />
            </div>
          </div>
          <div className='card-body'>
            <DragDropContext onDragEnd={(result) => { this.onDragEnd(result, categoryIndex) }}>
              <Droppable droppableId='droppable'>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {list}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {
              this.state.toggledCategory === categoryIndex
                ? (
                  <div className='add-favorite-container'>
                    <div className='add-favorite-label'>ADD FAVORITE</div>
                    <div className='input-container'>
                      <Input size='large' placeholder='http://www.placeholder.com/' onChange={this.handleNewFavorite} />
                      <Icon circular name='plus' onClick={() => this.saveFavorite(categoryIndex)} />
                    </div>
                  </div>
                )
                : false
            }
          </div>
        </div>
      );
    })
  }

  render() {
    return (
      <div className='favorites-container'>
        <div className='card-container'>
          {this.renderFavorites()}
          <CategoryMaker addCategory={this.addCategory} />
        </div>
        <ModalEdit
          open={this.state.modalOpen}
          handleClose={this.handleClose}
          favorites={this.state.favorites}
          toggledCategory={this.state.toggledCategory}
          toggledFavorite={this.state.toggledFavorite}
          saveNameEdit={this.saveNameEdit}
        />
      </div>
    )
  }
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// using some little inline style helpers to make the app look okay
const getItemStyle = (draggableStyle, isDragging) => ({
  // change background colour if dragging
  background: isDragging ? 'dodgerblue' : false,

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : false,
  // width: 250,
});

let defaultFavorites = [
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