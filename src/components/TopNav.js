import React, { Component }  from 'react';
import {Dropdown, Menu, Header, Progress, Segment, Input, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MdFlashOn = require('react-icons/lib/md/flash-on');
const MdColorLens = require('react-icons/lib/md/color-lens');

const themeOptions = [
  { key: 'theme-default', value: 'default', label:{color: 'grey', empty: true, circular: true} },
  { key: 'theme-red', value: 'theme-red', label:{color: 'red', empty: true, circular: true} },
  { key: 'theme-blue', value: 'theme-blue', label:{color: 'blue', empty: true, circular: true} },
  { key: 'theme-yellow', value: 'theme-yellow', label:{color: 'yellow', empty: true, circular: true} },
  { key: 'theme-teal', value: 'theme-teal', label:{color: 'teal', empty: true, circular: true} }
]

const themeTrigger = (
  <React.Fragment>
    <MdColorLens />
  </React.Fragment>
)

class TopNav extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Menu attached='top' inverted>
          <Menu.Item>Work Sei</Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item title='theme'>

              <Dropdown trigger={themeTrigger} floating inline
                  options={themeOptions}
                  value={this.props.currentTheme}
                  onChange={(e, d) => this.props.handleThemeSettings(d.value)}
              />

            </Menu.Item>

            <Menu.Item title='Productivity Heat Level'>
                <MdFlashOn /> {this.props.score}
            </Menu.Item>

          </Menu.Menu>
      </Menu>
    )
  }
}

export default TopNav;
