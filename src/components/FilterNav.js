import React, { Component } from 'react';
import { Dropdown, Menu, Input, Label } from 'semantic-ui-react';

class FilterNav extends Component {

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item
          name='all'
          active={this.state.activeItem === 'all'}
          onClick={this.handleFilter}
        >
          All Tasks
        </Menu.Item>

        <Menu.Item
          name='pending'
          active={this.state.activeItem === 'pending'}
          onClick={this.handleFilter}
        >
          Pending
        </Menu.Item>

        <Menu.Item
          name='completed'
          active={this.state.activeItem === 'completed'}
          onClick={this.handleFilter}
        >
          Completed
        </Menu.Item>

      </Menu>
    )
  }
}

export default FilterNav;
