import "./App.css";
import React from "react";
import Task from "./components/Task";
import {
  Paper,
  TextField,
  Checkbox,
  Button,
  List,
  ListItem,
  Alert,
  Stack,
} from "@mui/material";

class App extends Task {
  state = {
    tasks: [],
    currTask: "",
    msgError: {
      severity: '',
      msg: ''
    }
  };

  render() {
    const { tasks, msgError } = this.state;
    return (
      <div className="App flex">
        <Paper elevation={3} className="container">
          <div className="heading">TO-DO</div>
          <form
            onSubmit={this.handleSubmit}
            className="flex"
            style={{
              margin: "15px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              value={this.state.currTask}
              required={true}
              onChange={this.handleChange}
              placeholder="Add new task"
              style={{
                width: "75%",
              }}
            />
            <Button
              style={{ height: "40px" }}
              color="success"
              variant="outlined"
              type="submit"
            >
              Add Task
            </Button>
          </form>
          <div>
            <List style={{ maxHeight: 250, overflow: "auto" }}>
              {msgError.msg && (
                <Stack sx={{ width: "99%" }} spacing={2}>
                  <Alert severity={msgError.severity}>{msgError.msg}</Alert>
                </Stack>
              )}
              {tasks.map((tsk) => (
                <Paper className="flex task_container">
                  <ListItem key={tsk._id}>
                    <Checkbox
                      checked={tsk.done}
                      onClick={() => this.handleUpdate(tsk._id, 'check')}
                      style={{
                        color: '#81f782'
                      }}
                    />
                    {tsk.isEditable ? (
                      <>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={tsk.title}
                          required={true}
                          onChange={(e) =>
                            this.handleChangeTaskTitle(tsk._id, e.target.value)
                          }
                          style={{
                            width: "75%",
                            marginRight: "10px",
                          }}
                        />
                        <Button
                          size="small"
                          color="success"
                          variant="contained"
                          onClick={() => this.handleUpdate(tsk._id, 'title')}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <div
                          className={tsk.done ? "task line_trough" : "task"}
                          onClick={() => this.handleChangeTitle(tsk._id)}
                        >
                          {tsk.title}
                        </div>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          onClick={() => this.handleDelete(tsk._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </ListItem>
                </Paper>
              ))}
            </List>
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;
