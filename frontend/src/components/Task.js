import React, { Component } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskServices';

class Task extends Component {
  state = {
    tasks: [],
    currTask: "",
    msgError: {
      severity: '',
      msg: ''
    }
  };

  async componentDidMount() {
    try {
      const { data } = await getTasks();

      if (!data) return;

      const mapTasks = data?.map(element => ({
        ...element,
        isEditable: false
      }));
      
      this.setState({
        tasks: mapTasks
      });
    } catch (error) {
      console.log(error);
      this.setState({
        msgError: {
          severity: 'error',
          msg: error.message
        }
      });
    }
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ currTask: input.value });
  };

  handleChangeTaskTitle = (currentTask, value) => {
    const originalTasks = this.state.tasks;

    const tasks = [...originalTasks];
    const index = tasks.findIndex(tsk => tsk._id === currentTask);

    tasks[index] = {...tasks[index]};
    tasks[index].title = value;

    this.setState({ tasks });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const originalTasks = this.state.tasks;

    try {
      const { data } = await createTask({
        title: this.state.currTask,
        done: false
      });

      const tasks = originalTasks;
      tasks.push(data.task);

      this.setState({
        tasks,
        currTask: ""
      });
    } catch (error) {
      console.log(error);
      this.setState({
        msgError: {
          severity: 'error',
          msg: error.message
        }
      });
    }
  };

  handleChangeTitle = (currentTask) => {
    const originalTasks = this.state.tasks;

    const tasks = [...originalTasks];
    const index = tasks.findIndex(tsk => tsk._id === currentTask);

    tasks[index] = {...tasks[index]};
    tasks[index].isEditable = !tasks[index].isEditable;

    this.setState({ tasks });
  };

  handleUpdate = async (currentTask, type) => {
    const originalTasks = this.state.tasks;

    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex(tsk => tsk._id === currentTask);

      tasks[index] = {...tasks[index]};
      
      switch (type) {
        case 'check':
          tasks[index].done = !tasks[index].done;
          break;
      
        default:
          tasks[index].isEditable = !tasks[index].isEditable;
          break;
      }

      this.setState({ tasks });

      await updateTask(currentTask, tasks[index]);
    } catch (error) {
      console.log(error);
      this.setState({
        tasks: originalTasks,
        msgError: {
          severity: 'error',
          msg: error.message
        }
      });
    }
  };

  handleDelete = async (currentTask) => {
    const originalTasks = this.state.tasks;

    try {
      const tasks = originalTasks.filter(tsk => tsk._id !== currentTask);

      this.setState({ tasks });

      await deleteTask(currentTask);
    } catch (error) {
      console.log(error);
      this.setState({
        tasks: originalTasks,
        msgError: {
          severity: 'error',
          msg: error.message
        }
      });
    }
  };
}

export default Task;