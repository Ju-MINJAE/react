import { collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { appFireStore } from '../firebase/confing';

const useCollection = (transaction) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(appFireStore, transaction),
      (snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(result);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );

    return unsubscribe;
  }, [collection]);

  return { documents, error };
};

export default useCollection;
