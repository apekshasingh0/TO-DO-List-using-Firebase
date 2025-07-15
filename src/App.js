import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, doc, getDoc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

const App = () => {
  const [task, setTask] = useState('');
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const collectionRef = collection(db, 'collectionName');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // Updating an existing task
      const docRef = doc(db, 'collectionName', editId);
      await updateDoc(docRef, { task });
      setEditId(null);
    } else {
      // Adding a new task
      await addDoc(collectionRef, { task });
    }
    setTask('');
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleDelete = async (id) => {
    const docRef = doc(db, 'collectionName', id);
    await deleteDoc(docRef);
  };

  const handleUpdate = async (id) => {
    const docRef = doc(db, 'collectionName', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTask(docSnap.data().task);
      setEditId(id);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <h1>Firebase ToDo List</h1>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Add your task"
        />
        <br />
        <br />
        <input type="submit" value={editId ? 'Update Task' : 'Add Task'} />
      </form>

      <div className="data">
        <h2>Todo Task List</h2>
        {data.map((item) => (
          <div key={item.id}>
            <h3>
              {item.task}{' '}
              <button onClick={() => handleDelete(item.id)}>Delete</button>{' '}
              <button onClick={() => handleUpdate(item.id)}>Update</button>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
