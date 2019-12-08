import React, { Component } from "react";
import { connect } from 'react-redux';
import { postTask, deleteTask, patchTask, putTask } from "utils/api/task";
import { fetchTasks } from "modules/Task/store/actionCreator";

const TASK_IS_ACTIVE = 1;
const TASK_IS_COMPLEATED = 2;
class HomePage extends Component {
  constructor(props){
    super(props);
    this.state={
      title: '',
      tasks: []
    };
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchTasks());
  }

  handleKeyDown = (e) => {
    const { dispatch } = this.props;
    const {title } = this.state;
    if (e.key === 'Enter' && title) {
        postTask({title,status: TASK_IS_ACTIVE})
        .then(()=> {
          dispatch(fetchTasks());
        })
        .catch(e=>{
          console.log('e',e);
        });
        this.setState({title:''});
      
    }
  }

  removeTask = id => {
    const { dispatch } = this.props;
    deleteTask(id).then(res=>{
      dispatch(fetchTasks());
    }).catch(e=>{
      console.log('e',e);
    });
    
  }

  taggleAll =  e => {
    const { dispatch } = this.props;
     this.setState({checked:  e.target.checked},() => {
        putTask({ status: this.state.checked? TASK_IS_COMPLEATED : TASK_IS_ACTIVE}).then(() => {
          dispatch(fetchTasks());
        }).catch( e =>{
        });
    });
    
  }

  onChangeCheckBox = (id,e) => {
    const { dispatch } = this.props;
    patchTask(
      id,
      { status: e.target.checked? TASK_IS_COMPLEATED : TASK_IS_ACTIVE}
      ).then(()=> {
      dispatch(fetchTasks());
    });
  }

  isCheckToggleButton = () => {
    const { tasks } = this.props;
    return !tasks.find(i=>{
      return i.status === TASK_IS_ACTIVE;
    });
  }

  renderTaskList = () => {
    const { tasks, location } = this.props;
    let taskList = tasks;
    if(location.hash === '#/completed') {
      taskList =  tasks.filter(i => {
        return i.status === TASK_IS_COMPLEATED;
      });
    }
    else if(location.hash === '#/active'){
      taskList =  tasks.filter(i => {
        return i.status === TASK_IS_ACTIVE;
      });
    }
    return taskList.map(({title, _id, status}, key)=>{
      return (
        <li className={status === TASK_IS_COMPLEATED ? "completed": ""} key={key}>
          <div className="view">
            <input 
              className="toggle" 
              type="checkbox" 
              checked={status === TASK_IS_COMPLEATED ? true: false} 
              onChange={(e)=>this.onChangeCheckBox(_id,e)} 
            />
            <label>{title}</label>
            <button className="destroy" onClick={()=>this.removeTask(_id)}></button>
          </div>
          <input className="edit"  />
        </li>
      );
    });
  }

  render() {
    const { title } = this.state;
    const { location } = this.props;
    const checked = this.isCheckToggleButton();
    
    return (
      <section className="todo-app">
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={ title }
              onChange={({ target })=> this.setState({title: target.value})}
              onKeyDown={this.handleKeyDown}
            />
          </header>
          <section className="main">
            <input 
              id="toggle-all" 
              className="toggle-all" 
              type="checkbox" 
              checked={checked} 
              onChange={this.taggleAll} 
             />
            <label htmlFor="toggle-all"></label>
            <ul className="todo-list">
              {this.renderTaskList()}
            </ul>
          </section>
          <footer className="footer">
            <span className="todo-count">
              <strong>{this.renderTaskList().length}</strong>
              <span> </span>
              <span>items</span>
              <span> left</span>
            </span>
            <ul className="filters">
              <li>
                <a href="#/" className={location.hash === '#/' ? "selected" : ""}>
                  All
                </a>
              </li>
              <span> </span>
              <li>
                <a href="#/active" className={location.hash === '#/active' ? "selected" : ""}>
                  Active
                </a>
              </li>
              <span> </span>
              <li>
                <a href="#/completed" className={location.hash === '#/completed' ? "selected" : ""}>
                  Completed
                </a>
              </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
          </footer>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state =>{
  return {
    tasks: state.toDo.tasks
  };
};

export default connect(mapStateToProps)(HomePage);
