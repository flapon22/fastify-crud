import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDs25h0NPdDABISAdWzTo9SC80ai7vik2U',
    authDomain: 'api-fastify.firebaseapp.com',
    projectId: 'api-fastify',
    storageBucket: 'api-fastify.appspot.com',
    messagingSenderId: '1061832341968',
    appId: '1:1061832341968:web:8d624641544018355ea1d5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
