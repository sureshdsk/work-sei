import React from 'react';
import TodoItem from './Todo';
import PropTypes from 'prop-types';
import {List} from 'semantic-ui-react';

const TodoList = ({todolist, handleToggleTodo, handleDeleteTodo}) => <List style={{background: '#fff', borderRadius: '2px'}}  relaxed>
  {todolist.map((todo) => <TodoItem
    key={todo.id}
    {...todo}
    handleToggleTodo={handleToggleTodo}
    handleDeleteTodo={handleDeleteTodo}
  />)}
</List>;

TodoList.propTypes = {
    todolist: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    done: PropTypes.bool,
  })),
  handleToggleTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired
};


export default TodoList;
