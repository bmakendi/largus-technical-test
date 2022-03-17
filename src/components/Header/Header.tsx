import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useGetUser } from '../../utils/hooks/user';
import styles from './header.module.scss';
import Link from 'next/dist/client/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
      {homepage ? (
        <p>Messages</p>
      ) : (
        <div className={styles.contact_back}>
          <Link href='/'>
            <a>
              <ArrowBackIcon />
            </a>
          </Link>
          <p>{headerName}</p>
        </div>
      )}
    </header>
  );
};

export default Header;
