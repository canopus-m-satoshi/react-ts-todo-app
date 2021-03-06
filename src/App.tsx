import React, { ChangeEvent, useEffect, useState, VFC } from 'react';
import { db, auth } from './firebase';
import TaskItem from './TaskItem';
import styles from './App.module.css';

import { FormControl, List, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: 'auto',
    width: '40%',
  },
});

const App: VFC = (props: any) => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push('login');
    });
    return () => unSub();
  });

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

  // const Logout = () => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //   async () => {
  //     try {
  //       await auth.signOut();
  //       props.history.push('login');
  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   };
  // };

  return (
    <div className={styles.app__root}>
      <h1>Todo App by React and Firebase</h1>
      <button
        className={styles.app__logout}
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push('login');
          } catch (error) {
            alert(error.message);
          }
        }}>
        <ExitToAppIcon />
      </button>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
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
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
