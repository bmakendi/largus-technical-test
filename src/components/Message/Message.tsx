import { getLoggedUserId } from '../../utils/getLoggedUserId';
import styles from './message.module.scss';

interface MessageProps {
  body: string;
  authorId: number;
}

const Message = ({ authorId, body }: MessageProps) => {
  const loggedUser = getLoggedUserId();
  const currentUserIsAuthor = loggedUser === authorId;

  return (
    <>
      {currentUserIsAuthor ? (
        <p className={styles.author_message}>{body}</p>
      ) : (
        <p className={styles.contact_message}>{body}</p>
      )}
    </>
  );
};

export default Message;
