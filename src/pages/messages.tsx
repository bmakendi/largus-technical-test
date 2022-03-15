import { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { CurrentUserContext } from '../utils/context/user.context';
import { useGetMessages } from '../utils/hooks/messages';
import Header from '../components/Header/Header';

const Messages = () => {
  const router = useRouter();
  const { conv } = router.query;
  const url = `http://localhost:3005/messages/${conv}`;
  const { messages, isLoading, error } = useGetMessages(url);
  const { currentUser } = useContext(CurrentUserContext);

  console.log(messages, isLoading, error);

  return (
    <>
      <Header />
    </>
  );
};

export default Messages;
