import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import db from './db';
import {reactLocalStorage} from 'reactjs-localstorage';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import TodoList from './components/TodoList';
import NewTodoItem from './components/NewTodo';
import { Grid, Dropdown, Menu, Header, Progress, Segment, Input, Label } from 'semantic-ui-react'
import { Link, Route, Redirect } from 'react-router-dom'

import './App.css';

window.React = React;

class TodoApp extends Component {
  constructor() {
        super();
        this.state = {
          todolist: [],
          activeItem:'pending',
          displayFilter:'pending',
          theme:'default'
        };

        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.handleToggleTodo = this.handleToggleTodo.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }


  componentDidMount() {
     db.table('todos')
       .toArray()
       .then((todolist) => {
         let filteredList = todolist.filter((todo) => todo.done == false)
         this.setState({ todolist:filteredList });
       });

     var score = reactLocalStorage.get('score', 0);
     var theme = reactLocalStorage.get('theme', 'default');
     this.setState({score:score, theme:theme});

   }

   handleKeyPress(e) {
     if (e.key === 'Enter') {
       e.preventDefault();
       this.handleAddTodo(e.target.value)
     }
   }
   handleAddTodo(title) {
     if (title==''){
       return
     }
     const todo = {
       title,
       done: false,
     };
     db.table('todos')
       .add(todo)
       .then((id) => {
         const newList = [...this.state.todolist, Object.assign({}, todo, { id })];
         this.setState({ todolist: newList });
       });
   }

   handleToggleTodo(id, done) {
     db.table('todos')
       .update(id, { done })
       .then(() => {
         const todoToUpdate = this.state.todolist.findIndex(todo => todo.id === id);

         var task = {'id': id, done: done}
         if (done === true){
           var magic = ReactDOM.findDOMNode(this.refs.magic);
           magic.play();
         }
         var todolist = this.state.todolist;
         Object.assign(todolist[todoToUpdate], task)
         this.setState({ todolist: todolist });
         var score = reactLocalStorage.get('score', 0);
         this.setState({score:score});
       });
   }

   handleDeleteTodo(id) {
     db.table('todos')
       .delete(id)
       .then(() => {
         const newList = this.state.todolist.filter((todo) => todo.id !== id);
         this.setState({ todolist: newList });
       });
   }

  handleFilter(e, { name }){
     var status = name;
     db.table('todos')
       .toArray()
       .then((todolist) => {
         var filteredList;
         if (status == 'all'){
           filteredList = todolist;
         }else if (status=='pending') {
           filteredList = todolist.filter((todo) => todo.done == false)
         }else if (status=='completed') {
           filteredList = todolist.filter((todo) => todo.done === true)
         }
         this.setState({ todolist: filteredList, activeItem: status });

       }
      );
   }

  handleSearch(keyword){
     db.table('todos')
       .where("taskWords").startsWithIgnoreCase(keyword).toArray()
       .then((todolist) => {
         this.setState({ todolist });
       });
  }

  handleThemeSettings(theme_option){
    this.setState({theme:theme_option});
    reactLocalStorage.set('theme', theme_option);
  }

  render() {
    var ThemeClass = this.state.theme;
    var TodoFilerStyle= {}, AppRootStyle={marginTop:'10%',marginBottom:'2rem'};

    return (
    <div id='app-root' className={ThemeClass}>

            <TopNav score={this.state.score} currentTheme={this.state.theme} handleThemeSettings={this.handleThemeSettings.bind(this)} />

            <Header as='h2' icon textAlign='center' style={AppRootStyle} >
                <Header.Content>
                    Hi, there!
                </Header.Content>
            </Header>

            <div id='todo-container'>

              <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                  <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>

                      <NewTodoItem
                        handleAddTodo={this.handleAddTodo}
                        handleKeyPress={this.handleKeyPress}
                      />

                      <Menu pointing secondary >
                          <Menu.Item name='pending' active={this.state.activeItem === 'pending'} onClick={this.handleFilter}>Todo</Menu.Item>
                          <Menu.Item name='completed' active={this.state.activeItem === 'completed'} onClick={this.handleFilter}>Completed</Menu.Item>
                          <Menu.Item name='all' active={this.state.activeItem === 'all'} onClick={this.handleFilter}>All Tasks</Menu.Item>

                        </Menu>

                      <TodoList
                          todolist={this.state.todolist}
                          handleToggleTodo={this.handleToggleTodo}
                          handleDeleteTodo={this.handleDeleteTodo}
                      />


                  </Grid.Column>

              </Grid>


            </div>

            <BottomNav />

            <audio ref='magic' id="magic" src="/sounds/Beep_Short.mp3" preload="auto" style={{display:'none'}} />
    </div>

    );
  }
}



const App = () => (
  <React.Fragment>
      <Route exact path="/" component={TodoApp}/>
  </React.Fragment>
)

export default App;
