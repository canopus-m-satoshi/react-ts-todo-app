import { useState } from 'react';
import firebase from 'firebase/app';
import { db } from './firebase';
import styles from './TaskItem.module.css';

import { ListItem, TextField, Grid } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.VFC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection('tasks').doc(props.id).set({ title }, { merge: true });
  };
  const deleteTask = () => {
    db.collection('tasks').doc(props.id).delete();
  };

  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justify="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Edit task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Grid>
      <button className={styles.taskitem__icon} onClick={editTask}>
        <EditIcon />
      </button>
      <button className={styles.taskitem__icon} onClick={deleteTask}>
        <DeleteOutlineIcon />
      </button>
    </ListItem>
  );
};

export default TaskItem;
