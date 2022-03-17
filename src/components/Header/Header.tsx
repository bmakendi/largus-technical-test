import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useGetUser } from '../../utils/hooks/user';
import styles from './header.module.scss';

interface HeaderProps {
  homepage?: boolean;
}

const Header = ({ homepage }: HeaderProps) => {
  const [headerName, setHeaderName] = useState<string>('');
  const router = useRouter();
  const contactId = router.query.contactId as string;
  const userUrl: string =
    contactId && `http://localhost:3005/users/${contactId}`;
  const { user } = useGetUser(userUrl);

  useEffect(() => {
    contactId && user && setHeaderName(user.nickname);
  }, [contactId, user]);

  return (
    <header className={styles.container}>
      <p>{homepage ? 'Messages' : headerName}</p>
    </header>
  );
};

export default Header;
