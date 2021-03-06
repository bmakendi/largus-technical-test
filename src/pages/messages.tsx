import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useGetMessages } from '../utils/hooks/messages';
import { getLoggedUserId } from '../utils/getLoggedUserId';

import { InputAdornment, FormControl } from '@mui/material';
import InputUnstyled from '@mui/base/InputUnstyled';
import Header from '../components/Header/Header';
import Message from '../components/Message/Message';
import LoadingCirle from '../components/Loading/LoadingCircle';
import styles from '../styles/pages.module.scss';

const Messages = () => {
  const loggedUser = getLoggedUserId();
  const [inputMessage, setInputMessage] = useState('');
  const router = useRouter();
  const conv = router.query.conv as string;
  const messageUrl = `http://localhost:3005/messages/${conv}`;
  const { messages, isLoading, error, updateMessages } =
    useGetMessages(messageUrl);

  /**
   * Submitting a new message when it's not empty.
   */
  const handleSubmit = async () => {
    if (inputMessage !== '') {
      const timestamp = parseInt(Date.now().toString().substring(0, 10));
      const body = JSON.stringify({
        body: inputMessage,
        timestamp: timestamp,
        conversationId: conv,
        authorId: loggedUser,
      });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      };
      try {
        const response = await fetch(messageUrl, requestOptions);
        const data = await response.json();
        console.log(data);
        updateMessages(messageUrl);
        setInputMessage('');
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (error) router.push('/500');

  return (
    <>
      <Header />
      <main className='main_messages'>
        <div className={styles.messages_container}>
          {isLoading ? (
            <LoadingCirle />
          ) : (
            messages.map(({ id, authorId, body }) => {
              return (
                <Message
                  key={id}
                  authorId={authorId}
                  body={body}
                  messageId={id}
                />
              );
            })
          )}
        </div>
        <div className={styles.input_container}>
          <FormControl>
            <InputUnstyled
              value={inputMessage}
              name='message'
              id='message'
              placeholder='Votre message'
              className={styles.text_input}
              endAdornment={
                <InputAdornment position='end'>
                  <p
                    className={
                      inputMessage === ''
                        ? styles.submit_message
                        : styles.submit_message_enabled
                    }
                    onClick={handleSubmit}
                  >
                    Envoyer
                  </p>
                </InputAdornment>
              }
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
          </FormControl>
        </div>
      </main>
    </>
  );
};

export default Messages;
