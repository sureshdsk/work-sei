import React, { Component }  from 'react';
import {Dropdown, Menu, Header, Progress, Segment, Input, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Clock from 'react-live-clock';



class BottomNav extends Component {

  render() {
    return (
      <Menu fixed="bottom" inverted>

          <Menu.Menu position='right'>

            <Menu.Item>
                <Clock format={'dddd, Mo MMMM YYYY hh:mm:ss A'} ticking={true} />
            </Menu.Item>

          </Menu.Menu>
      </Menu>
    )
  }
}

export default BottomNav;
