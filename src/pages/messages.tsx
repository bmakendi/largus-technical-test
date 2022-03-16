import { useContext, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { CurrentUserContext } from '../utils/context/user.context';
import { useGetMessages } from '../utils/hooks/messages';
import { useGetConversation } from '../utils/hooks/conversations';
import Header from '../components/Header/Header';
import Message from '../components/Message/Message';
import styles from '../styles/pages.module.scss';

const Messages = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();
  const { conv } = router.query;
  const messageUrl = `http://localhost:3005/messages/${conv}`;
  const conversationUrl = `http://localhost:3005/conversations/${currentUser?.id}`;

  const { conversation } = useGetConversation(conversationUrl, currentUser?.id);
  const { messages, isLoading, error } = useGetMessages(messageUrl);
  const userName = currentUser?.nickname;
  const senderName = conversation?.senderNickname;
  const recipientName = conversation?.recipientNickname;
  const contactName = userName === senderName ? recipientName : senderName;
  console.log(messages, isLoading, error);

  return (
    <>
      <Header contactName={contactName} />
      <main className='main_messages'>
        <div className={styles.messages_container}>
          {messages.map(({ id, authorId, body }) => {
            return <Message key={id} authorId={authorId} body={body} />;
          })}
        </div>
        <div className={styles.text_input}>
          <form>
            <label htmlFor='name'></label>
            <input
              type='text'
              name='message'
              id='message'
              placeholder='Votre message'
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default Messages;
