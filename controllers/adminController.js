import firebase from '../firebase.js';
import Admin from '../models/adminModel.js';
import {
  getFirestore,
  collection,
  doc,
  where,
  query,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);
const docFirebase = 'admins'

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
        const data = new Admin(
          doc.id,
          doc.data().status,
          doc.data().uid
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

export const getByUid = async (req, res, next) => {
    try {
      const uid = req.body.uid;

      // Create a query against the collection.
      const q = query(collection(db, "admins"), where("uid", "==", uid));
      const data = await getDocs(q);

      if (data.empty) {
        res.status(200).send('not found');
      } else {
        // Access the data of the first matching document
        const adminData = data.docs[0].data();
        res.status(200).send(adminData);
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