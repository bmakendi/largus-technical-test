import styles from './header.module.scss';

interface HeaderProps {
  homepage?: boolean;
  contactName?: string;
}

const Header = ({ homepage, contactName }: HeaderProps) => {
  return (
    <header className={styles.container}>
      <p>{homepage ? 'Messages' : contactName}</p>
    </header>
  );
};

export default Header;
