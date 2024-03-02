import styled from 'styled-components';
import { ITweet } from './timeline';
import { auth, db, storage } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteBtn = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  margin-left: 10px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditBtn = styled.button`
  background-color: pink;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  background-color: pink;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  margin-left: 10px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  margin: 10px 0px;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;

  const [edit, setEdit] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);

  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  const onEdit = () => {
    setEdit(!edit);
  };

  const onSaveEdit = async () => {
    try {
      await updateDoc(doc(db, 'tweets', id), { tweet: editedTweet });
      setEdit(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const onCancel = () => {
    setEditedTweet(tweet);
    setEdit(false);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {edit ? (
          <TextArea
            value={editedTweet}
            onChange={(e) => setEditedTweet(e.target.value)}
            rows={4}
            cols={50}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          edit ? (
            <>
              <EditBtn onClick={onSaveEdit}>Save</EditBtn>
              <CancelBtn onClick={onCancel}>Cancel</CancelBtn>
            </>
          ) : (
            <EditBtn onClick={onEdit}>Edit</EditBtn>
          )
        ) : null}
        {user?.uid === userId ? (
          <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
