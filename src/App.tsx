import React, { useEffect, useState, VFC } from 'react';
import { db } from './firebase';
import './App.css';

const App: VFC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }]);

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title })),
      );
    });

    return () => unSub();
  }, []);

  return (
    <div className="App">
      {tasks.map((task) => (
        <h3>{task.title}</h3>
      ))}
    </div>
  );
};

export default App;
