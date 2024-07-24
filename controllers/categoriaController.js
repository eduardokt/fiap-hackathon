import firebase from '../firebase.js';
import Categoria from '../models/categoriaModel.js';
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
const docFirebase = 'categoria'

export const create = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, docFirebase), data);
    res.status(200).send('created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const get = async (req, res, next) => {
  try {
    const docs = await getDocs(collection(db, docFirebase));
    const array = [];

    if (docs.empty) {
      res.status(400).send('Not found');
    } else {
      docs.forEach((doc) => {
        console.log(doc.data());
        const data = new Categoria(
          doc.id,
          doc.data().nome
        );
        array.push(data);
      });

      res.status(200).send(array);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const docs = doc(db, docFirebase, id);
    const data = await getDoc(docs);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const docs = doc(db, docFirebase, id);
    await updateDoc(docs, data);
    res.status(200).send('updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const del = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, docFirebase, id));
    res.status(200).send('deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};