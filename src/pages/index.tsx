import { FC, useContext, useEffect } from 'react';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import { useGetUser } from '../utils/hooks/user';
import { useGetConversations } from '../utils/hooks/conversations';
import { CurrentUserContext } from '../utils/context/user.context';

import Head from 'next/head';
import Header from '../components/Header/Header';
import Conversation from '../components/Conversation/Conversation';

const Home: FC = () => {
  const loggedUser = getLoggedUserId();
  const userUrl: string = `http://localhost:3005/users/${loggedUser}`;
  const conversationsUrl: string = `http://localhost:3005/conversations/${loggedUser}`;
  const { user, userLoading } = useGetUser(userUrl);
  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext);
  const { conversations, isLoading, error } =
    useGetConversations(conversationsUrl);

  useEffect(() => {
    !userLoading && updateCurrentUser(user);
  });

  return (
    <>
      <Head>
        <title>Vos conversations - Leboncoin</title>
        <meta
          name='description'
          content="L'application de messagerie de Leboncoin, retrouvez ici tous vos messages !"
        ></meta>
      </Head>
      <Header homepage /> {/*MOVE HEADER IN A LAYOUT COMPONENT*/}
      <div>
        {conversations.map(({ id, senderNickname, recipientNickname }) => {
          return (
            <Conversation
              key={id}
              conversationId={id}
              currentUserName={currentUser?.nickname}
              senderName={senderNickname}
              recipientName={recipientNickname}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
