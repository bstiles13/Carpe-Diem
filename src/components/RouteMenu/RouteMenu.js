import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

import './RouteMenu.scss';

class RouteMenu extends React.Component {
  constructor(props) {
    super(props);
    this.routeClick = this.routeClick.bind(this);
  }

  routeClick(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <Menu className='route-menu' inverted>
        <Menu.Item as={NavLink} to="/" exact content="Today" />
        <Menu.Item as={NavLink} to="/mystuff" content="My Stuff" />
        <Menu.Item as={NavLink} to="/activities" content="Events" />
        <Menu.Menu position='right'>
          {this.props.user
            ? (
              <Menu.Item>
                <span>Hi {this.props.user}</span>
                <Icon className='logout-icon' name='sign-out' onClick={this.props.logout} />
              </Menu.Item>
            )
            : (
              <Menu.Item
                as={NavLink}
                to="/login" 
              >
                <Icon name='user' />
              </Menu.Item>
            )
          }
        </Menu.Menu>
      </Menu>
    )
  }

}

export default withRouter(RouteMenu);