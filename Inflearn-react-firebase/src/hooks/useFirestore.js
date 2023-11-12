import { collection, addDoc } from 'firebase/firestore';
import { useReducer } from 'react';
import { appFireStore, timestamp } from '../firebase/confing';

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'isPending':
      return { isPending: true, document: null, success: false, error: null };
    case 'addDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'error':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// 저장할 컬랙션을 인자로 전달
const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  // colRef : 컬랙션의 참조를 요구
  const colRef = collection(appFireStore, transaction);

  // 컬랙션에 문서를 추가
  const addDocument = async (doc) => {
    dispatch({ type: 'isPending' });

    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: 'addDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  // 컬랙션에서 문서를 제거
  const deleteDocument = (id) => {};

  return { addDocument, deleteDocument, response };
};

export default useFirestore;
