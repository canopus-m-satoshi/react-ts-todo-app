import firebase from 'firebase/app';

import { ListItem, TextField, Grid } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.VFC<PROPS> = (props) => {
  return (
    <div>
      <ListItem>
        <h2>{props.title}</h2>
      </ListItem>
    </div>
  );
};

export default TaskItem;
