import { useRouter } from 'next/dist/client/router';
import { Button } from '@mui/material';
import styles from '../styles/pages.module.scss';

const Custom500 = () => {
  const router = useRouter();

  return (
    <div className={styles.error}>
      <h1>Désolé on a eu un problème !</h1>
      <p>Revenez plutôt en lieu sûr.</p>
      <Button variant='outlined' onClick={() => router.push('/')}>
        Accueil
      </Button>
    </div>
  );
};

export default Custom500;
