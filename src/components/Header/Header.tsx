import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import styles from './header.module.scss';

interface HeaderProps {
  homepage?: boolean;
  contactName?: string;
}

const Header = ({ homepage, contactName }: HeaderProps) => {
  const [contact, setContact] = useState<string>(contactName);
  const router = useRouter();
  const { conv } = router.query;
  if (contact !== contactName) setContact(contactName);

  return (
    <header className={styles.container}>
      <p>{homepage ? 'Messages' : contact}</p>
    </header>
  );
};

export default Header;
