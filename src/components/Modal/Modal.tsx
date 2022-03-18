import { useContext, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useGetUsers } from '../../utils/hooks/user';
import { CurrentUserContext } from '../../utils/context/user.context';
import { User } from '../../types/user';
import CloseIcon from '@mui/icons-material/Close';
import LoadingCircle from '../Loading/LoadingCircle';
import styles from './modal.module.scss';

interface ModalProps {
  handleModal: () => void;
  updateConversations: (url: string) => Promise<void>;
}

const Modal = ({ handleModal, updateConversations }: ModalProps) => {
  const router = useRouter();
  const { currentUser } = useContext(CurrentUserContext);
  const [filter, setFilter] = useState('');
  const { users, isLoading, error } = useGetUsers(
    'http://localhost:3005/users'
  );

  /**
   * Creating a conversation and updating the list of conversations on the homepage
   */
  const createConversation = async (contact: User) => {
    const url = `http://localhost:3005/conversations/${currentUser.id}`;
    const body = {
      recipientId: contact.id,
      recipientNickname: contact.nickname,
      senderId: currentUser.id,
      senderNickname: currentUser.nickname,
      lastMessageTimeStamp: 0,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      updateConversations(
        `http://localhost:3005/conversations/${currentUser.id}`
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      handleModal();
    }
  };

  if (error) router.push('/500');

  return (
    <>
      <div className={styles.background} />
      <div className={styles.wrapper}>
        <div className={styles.close_btn} onClick={handleModal}>
          <CloseIcon />
        </div>
        <p className={styles.title}>Nouvelle conversation</p>
        <input
          type='text'
          placeholder='Saissez un nom'
          className={styles.searchbar}
          onInput={(e) => {
            setFilter(e.currentTarget.value);
          }}
        />
        <div className={styles.contacts}>
          {isLoading ? (
            <LoadingCircle />
          ) : (
            users
              .filter((contact) => {
                if (filter === '') return contact;
                if (
                  contact.nickname.toLowerCase().includes(filter.toLowerCase())
                )
                  return contact;
              })
              .map((contact) => {
                return (
                  <p
                    key={contact.id}
                    className={styles.contact}
                    onClick={() => createConversation(contact)}
                  >
                    {contact.nickname}
                  </p>
                );
              })
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
