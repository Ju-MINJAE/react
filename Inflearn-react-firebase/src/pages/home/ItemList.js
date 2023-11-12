import styles from './Home.module.css';

const ItemList = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <strong className={styles.title}>{item.title}</strong>
            <p className={styles.description}>{item.description}</p>
          </li>
        );
      })}
    </>
  );
};

export default ItemList;
