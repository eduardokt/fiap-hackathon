import firebase from '../firebase.js';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const auth = getAuth(firebase);

export const createUser = async (req, res, next) => {
  const data = req.body;
  await createUserWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    res.status(200).send(user);
  })
  .catch((error) => {
    res.status(400).send(error.message);
  });
};

export const login = async (req, res, next) => {
  const data = req.body;
  await signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
    const user = userCredential.user;
    res.status(200).send(user);
  })
  .catch((error) => {
    res.status(400).send(error.message);
  });
};

export const logout = async (req, res, next) => {
  await signOut(auth).then(() => {
    // Sign-out successful.
    res.status(200).send('Sign-out successful');
  }).catch((error) => {
    res.status(400).send(error.message);
  });
};