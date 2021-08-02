import React, { ChangeEvent, useEffect, useState, VFC } from 'react';
import { db } from './firebase';
import TaskItem from './TaskItem';
import './App.css';

import { FormControl, List, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const App: VFC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title })),
      );
    });

    return () => unSub();
  }, []);

  // 新しいタスクの作成
  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').add({ title: input });
  };

  return (
    <div className="App">
      <h1>Todo App by React and Firebase</h1>

      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="New task?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button disabled={!input} onClick={newTask}>
        <AddIcon />
      </button>

      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
