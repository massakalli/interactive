import {clientDb} from './firebase.js';
import { collection, query, getDocs } from 'firebase/firestore';

console.log("clientDb fetched");

export const getItems = async () => {
    try {
        const q = query(collection(clientDb, 'artworksData'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return []; // Return an empty array or handle the error as needed
    }
};

