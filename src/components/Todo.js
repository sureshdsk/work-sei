import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, Grid, Icon} from 'semantic-ui-react';
import { MorphReplace } from 'react-svg-morph';
import {Motion, spring} from 'react-motion';


class ToggleButton extends Component {
  static defaultProps = {
    height: '1.5em'
  };

  render() {
    const style = {
      container: {
        cursor: 'pointer'
      },
        inner: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '3',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      },
      ...this.props.style
    }

    const totalLength = 72.7977294921875
    const circleLength = 50.24085998535156
    const checkedLength = -22.55687141418457

    const defaultSpring = -totalLength
    const circleSpring = spring(circleLength, {stiffness: 60, damping: 11})
    const checkedSpring = spring(checkedLength, {stiffness: 120, damping: 13.8})

    return (
      <svg {...this.props} style={style.container} viewBox="0 0 24 24" >
        <g style={style.inner}>
          <Motion
            defaultStyle={{offset: defaultSpring}}
            style={{offset: this.props.active ? circleSpring : checkedSpring}}
          >
          {({ offset }) =>
            <path
              strokeDasharray={`${totalLength} ${totalLength}`}
              strokeDashoffset={offset}
              d="M20 6.7L9.3 17.3 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8"
            />
          }
          </Motion>
        </g>
      </svg>
    )
  }
}


class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }
    componentDidMount() {
      this.setState({checked:this.props.done});
    }
    toggleChecked() {
        this.props.handleToggleTodo(this.props.id, !this.state.checked);
        this.setState({checked: !this.state.checked});
    }

    render() {

    let title = this.props.title,
    checked = this.props.done;

    var itemCompleted = 'ui medium header task-title pending'
    if (checked){
      itemCompleted = 'ui medium header task-title completed'
    }

    const titleStyle = {
      display: 'inline-block'
    }
    const deleteStyle = {
      float:'right',
      cursor: 'pointer'
    }
    const checkboxStyle = {
      fontSize: '1.2em',
      margin: '0px 5px 0px 10px',
      position: 'relative',
      transform: 'translate(-50%, -50%)',
      top: 5
    }
    return (
            <List.Item>
                <List.Content verticalAlign="middle">
                    <Grid textAlign='center' verticalAlign='middle'>
                        <Grid.Column textAlign='left'>

                            <span style={checkboxStyle} onClick={this.toggleChecked.bind(this)}>
                              <ToggleButton active={checked} />
                            </span>

                            <span className={itemCompleted} style={titleStyle}>
                            {title}
                            </span>

                            <Icon className="hidden delete" name='remove' size='large' style={deleteStyle} onClick={() => this.props.handleDeleteTodo(this.props.id)}/>

                        </Grid.Column>

                    </Grid>
                </List.Content>
            </List.Item>

    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  done: PropTypes.bool,
  handleToggleTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired
};

export default TodoItem;
