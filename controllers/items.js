import {
    collection,
    doc,
    getDoc,
    getDocs,
    deleteDoc,
    addDoc,
    updateDoc,
} from 'firebase/firestore';
import Items from '../Items.js';
import {db} from '../firebase.config.js';
import {v4} from 'uuid';
import {async} from '@firebase/util';

const uuidv4 = v4;
let items = Items;

const getItems = async (req, reply) => {
    let theList = [];
    const querySnapshot = await getDocs(collection(db, 'listings'));
    querySnapshot.forEach((doc) => {
        theList.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    reply.send(theList);
};

const getItem = async (req, reply) => {
    const {key} = req.params;

    // const item = items.find((item) => item.id === id);

    const docRef = doc(db, 'listings', key);
    const docSnap = await getDoc(docRef);

    reply.send({id: docSnap.id, ...docSnap.data()});
};

const addItem = (req, reply) => {
    const {name} = req.body;
    // const item = {
    //     id: uuidv4(),
    //     name,
    // };

    // items = [...items, item];

    const docRef = collection(db, 'listings');
    addDoc(docRef, {
        // id: uuidv4(),
        name,
    })
        .then((docItm) => reply.code(201).send({id: docItm.id, name}))
        .catch((e) => reply.send(`adding error: ${e}`));
};

const deleteItem = (req, reply) => {
    const {key} = req.params;

    // items = items.filter((item) => item.id !== key);

    const docRef = doc(db, 'listings', key);
    deleteDoc(docRef)
        .then(() =>
            reply.send({
                message: `Item ${key} has been removed`,
            }),
        )
        .catch((e) => {
            reply.send(`deleting error: ${e}`);
        });
};

const updateItem = (req, reply) => {
    const {key} = req.params;
    const {name} = req.body;

    // items = items.map((item) => (item.id === key ? {key, name} : item));

    // item = items.find((item) => item.id === key);

    const docRef = doc(db, 'listings', key);

    updateDoc(docRef, {
        name,
    })
        .then(() => reply.send({id: key, name}))
        .catch((e) => reply.send(`updating error: ${e}`));
};

export {getItems, getItem, addItem, deleteItem, updateItem};
