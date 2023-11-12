import ItemForm from './ItemForm';
import useAuthContext from '../../hooks/useAuthContext';

import ItemList from './ItemList';
import styles from './Home.module.css';
import useCollection from '../../hooks/ useCollection';

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('Sharemarket');

  return (
    <main className={styles.container}>
      <aside className={styles.side_menu}>
        <ItemForm uid={user.uid}></ItemForm>
      </aside>
      <ul className={styles.content_list}>
        <h1>Item list</h1>
        {error && <strong>{error}</strong>}
        {documents && <ItemList items={documents} />}
      </ul>
    </main>
  );
};

export default Home;
