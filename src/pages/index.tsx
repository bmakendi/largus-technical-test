import { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import { useGetUser } from '../utils/hooks/user';
import { useGetConversations } from '../utils/hooks/conversations';
import { CurrentUserContext } from '../utils/context/user.context';

import { Chat } from '@mui/icons-material';
import Head from 'next/head';

import Header from '../components/Header/Header';
import Conversation from '../components/Conversation/Conversation';
import Modal from '../components/Modal/Modal';
import LoadingSkeleton from '../components/Loading/LoadingSkeleton';
import styles from '../styles/pages.module.scss';

const Home: FC = () => {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);
  const loggedUser = getLoggedUserId();
  const userUrl: string = `http://localhost:3005/users/${loggedUser}`;
  const conversationsUrl: string = `http://localhost:3005/conversations/${loggedUser}`;
  const { user, userLoading } = useGetUser(userUrl);
  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext);
  const { conversations, isLoading, error, updateConversations } =
    useGetConversations(conversationsUrl);

  useEffect(() => {
    !userLoading && updateCurrentUser(user);
  });

  const handleModal = () => {
    setModalOpened(false);
  };

  if (error) router.push('/500');

  return (
    <>
      <Head>
        <title>Vos conversations - Leboncoin</title>
        <meta
          name='description'
          content="L'application de messagerie de Leboncoin, retrouvez ici tous vos messages !"
        ></meta>
      </Head>
      <Header homepage />
      <main className='main_homepage'>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          conversations.map(
            ({
              id,
              senderNickname,
              recipientNickname,
              senderId,
              recipientId,
            }) => {
              return (
                <Conversation
                  key={id}
                  conversationId={id}
                  currentUserName={currentUser?.nickname}
                  senderName={senderNickname}
                  senderId={senderId}
                  recipientName={recipientNickname}
                  recipientId={recipientId}
                />
              );
            }
          )
        )}
        <div
          className={styles.icon_wrapper}
          onClick={() => {
            setModalOpened(true);
          }}
        >
          <Chat />
        </div>
        {modalOpened && (
          <Modal
            handleModal={handleModal}
            updateConversations={updateConversations}
          />
        )}
      </main>
    </>
  );
};

export default Home;
