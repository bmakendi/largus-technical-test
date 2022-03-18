import { useRouter } from 'next/dist/client/router';
import { Button } from '@mui/material';
import styles from '../styles/pages.module.scss';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className={styles.error}>
      <h1>Mauvais chemin !</h1>
      <p>Revenez plutôt en lieu sûr.</p>
      <Button variant='outlined' onClick={() => router.push('/')}>
        Accueil
      </Button>
    </div>
  );
};

export default Custom404;
