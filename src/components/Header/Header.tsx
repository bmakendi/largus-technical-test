import Image from 'next/image';
import styles from './header.module.scss';
import defaultPicture from '../../assets/profile.png';

const Header = () => {
  return (
    <header className={styles.container}>
      <Image
        src={defaultPicture}
        alt='Photo de profil'
        height={40}
        width={40}
      />
    </header>
  );
};

export default Header;
