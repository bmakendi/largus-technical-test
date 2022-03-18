import { useState } from 'react';
import { useGetUsers } from '../../utils/hooks/user';
import CloseIcon from '@mui/icons-material/Close';
import LoadingCircle from '../Loading/LoadingCircle';
import styles from './modal.module.scss';

interface ModalProps {
  handleModal: () => void;
}

const Modal = ({ handleModal }: ModalProps) => {
  const [filter, setFilter] = useState('');
  const { users, isLoading, error } = useGetUsers(
    'http://localhost:3005/users'
  );

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
              .map(({ id, nickname }) => {
                return (
                  <p key={id} className={styles.contact}>
                    {nickname}
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
