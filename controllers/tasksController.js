import firebase from '../firebase.js';
import Task from '../models/taskModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createTasks = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'tasks'), data);
    res.status(200).send('task created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await getDocs(collection(db, 'tasks'));
    const taskArray = [];

    if (tasks.empty) {
      res.status(400).send('No tasks found');
    } else {
      tasks.forEach((doc) => {
        const task = new Task(
          doc.id,
          doc.data().description,
          doc.data().deadline,
          doc.data().priority,
          doc.data().etc
        );
        taskArray.push(task);
      });

      res.status(200).send(taskArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = doc(db, 'tasks', id);
    const data = await getDoc(task);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('task not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateTasks = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const task = doc(db, 'tasks', id);
    await updateDoc(task, data);
    res.status(200).send('task updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteTasks = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'tasks', id));
    res.status(200).send('task deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};