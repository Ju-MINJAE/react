import useFirestore from '../../hooks/useFirestore';
import styles from './Home.module.css';

const ItemList = ({ items }) => {
  const { deleteDocument } = useFirestore('Sharemarket');

  return (
    <>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <strong className={styles.title}>{item.title}</strong>
            <p className={styles.description}>{item.description}</p>

            <button
              type='button'
              onClick={() => {
                deleteDocument(item.id);
              }}
            >
              삭제
            </button>
            {/* TODO : 삭제버튼 확인 문구 & 편집 버튼 추가 */}
          </li>
        );
      })}
    </>
  );
};

export default ItemList;
