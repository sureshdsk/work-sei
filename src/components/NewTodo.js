import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Grid, Form, Input} from 'semantic-ui-react'

class NewTodoItem extends Component {
  constructor() {
    super();
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  onKeyPress(ths, e){
    if (e.key == 'Enter') {
      e.preventDefault();
      this.props.handleAddTodo(e.target.value)
      this.setState({value: ''});
    }
  }

  handleChange(newValue) {
    this.setState({value: newValue});
  }
  // <Button animated positive>
  //   <Button.Content visible>Add</Button.Content>
  //   <Button.Content onClick={this.addTodo} hidden>
  //     <Icon name='right arrow' />
  //   </Button.Content>
  // </Button>
  render() {
    const required = value => (value ? undefined : 'Required');

    return (
      <div className="new-todo-container">
        <Form>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>

              <div style={{ borderRadius:'2px' }}>
              <Input fluid placeholder='What do you want to accomplish today?' name="new-todo"
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e.target.value)}
                  onKeyPress={(e) => this.onKeyPress(this, e)}
                  className='new-todo-input'
              />
              </div>

            </Grid.Column>
        </Grid>
        </Form>
      </div>
    );
  }
}

NewTodoItem.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default NewTodoItem;
