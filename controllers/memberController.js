import firebase from '../firebase.js';
import Member from '../models/memberModel.js';
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

export const createMembers = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'members'), data);
    res.status(200).send('member created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getMembers = async (req, res, next) => {
  try {
    const members = await getDocs(collection(db, 'members'));
    const memberArray = [];

    if (members.empty) {
      res.status(400).send('No members found');
    } else {
      members.forEach((doc) => {
        console.log(doc.data());
        const member = new Member(
          doc.id,
          doc.data().email,
          doc.data().function,
          doc.data().name
        );
        memberArray.push(member);
      });

      res.status(200).send(memberArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getMember = async (req, res, next) => {
  try {
    const id = req.params.id;
    const member = doc(db, 'members', id);
    const data = await getDoc(member);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('member not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateMember = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const member = doc(db, 'members', id);
    await updateDoc(member, data);
    res.status(200).send('member updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'members', id));
    res.status(200).send('member deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};