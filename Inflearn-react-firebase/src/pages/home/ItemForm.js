import { useEffect, useState } from 'react';
import useFirestore from '../../hooks/useFirestore';

const ItemForm = ({ uid }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addDocument, response } = useFirestore('Sharemarket');

  const handleData = (event) => {
    if (event.target.id === 'tit') {
      setTitle(event.target.value);
    } else if (event.target.id === 'txt') {
      setDescription(event.target.value);
    }
  };

  useEffect(() => {
    console.log(response);
    if (response.success) {
      setTitle('');
      setDescription('');
    }
  }, [response.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, description);
    addDocument({ uid, title, description });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>상품 </legend>
          <label htmlFor='tit'>이름 : </label>
          <input
            id='tit'
            type='text'
            value={title}
            required
            onChange={handleData}
          />

          <label htmlFor='tit'>설명 : </label>
          <textarea
            id='txt'
            type='text'
            value={description}
            required
            onChange={handleData}
          />

          <button type='submit'>제출</button>
        </fieldset>
      </form>
    </>
  );
};

export default ItemForm;
