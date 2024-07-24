import firebase from '../firebase.js';
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

// Inicialize o Firestore
const db = getFirestore(firebase);

export const getGroupByMember = async (req, res, next) => {
  try {
    // Buscar todos os documentos da coleção members_tasks
    const memberTasks = []
    const membersTasksSnapshot = await getDocs(collection(db, 'members_tasks'));
    const membersTasks = membersTasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).send(membersTasks);
    // // Criar mapas para armazenar os membros e as tarefas
    // const membersMap = {};
    // const tasksMap = {};

    // // Iterar sobre members_tasks para buscar os membros e as tarefas
    // for (const memberTask of membersTasks) {
    //   const { member, task } = memberTask;

    //   // Buscar membro se ainda não estiver no mapa
    //   const memberId = member.id;
    //   if (!membersMap[memberId]) {
    //     const memberDoc = await getDoc(doc(db, 'members', memberId));
    //     if (memberDoc.exists()) {
    //       membersMap[memberId] = { id: memberDoc.id, ...memberDoc.data() };
    //     }
    //   }

    //   // Buscar tarefa se ainda não estiver no mapa
    //   const taskId = task.id;
    //   if (!tasksMap[taskId]) {
    //     const taskDoc = await getDoc(doc(db, 'tasks', taskId));
    //     if (taskDoc.exists()) {
    //       tasksMap[taskId] = { id: taskDoc.id, ...taskDoc.data() };
    //     }
    //   }
    // }

    // // Agrupar tarefas por membro
    // const groupedData = Object.keys(membersMap).map(memberId => {
    //   return {
    //     member: membersMap[memberId],
    //     tasks: membersTasks
    //       .filter(memberTask => memberTask.member.id === memberId)
    //       .map(memberTask => tasksMap[memberTask.task.id])
    //   };
    // });

    // res.status(200).send(groupedData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const createMemberTask = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'members_tasks'), data);
    res.status(200).send('member created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
 
export const updateMemberTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const member = doc(db, 'members_tasks', id);
    await updateDoc(member, data);
    res.status(200).send('members_tasks updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};