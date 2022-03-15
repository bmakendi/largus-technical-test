import Image from 'next/image';
import { useGetLastMessage } from '../../utils/hooks/messages';
import { useConvertTimeStamp } from '../../utils/hooks/helper';

import styles from './conversation.module.scss';
import defaultPicture from '../../assets/profile.png';

interface ConversationProps {
  convsersationId: number;
  currentUserName: string;
  senderName: string;
  recipientName: string;
}

const Conversation = ({
  convsersationId,
  currentUserName,
  senderName,
  recipientName,
}: ConversationProps) => {
  const url = `http://localhost:3005/messages/${convsersationId}`;
  const { lastMessage, isLoading, error } = useGetLastMessage(url);
  const isSender = currentUserName === senderName; //boolean to know which name to display
  const date = useConvertTimeStamp(lastMessage?.timestamp);

  console.log(lastMessage, isLoading, error, date);

  return (
    <div className={styles.container}>
      <Image
        src={defaultPicture}
        alt='Photo de profil'
        className='conversation_picture'
        height={35}
        width={35}
      />
      <div className={styles.text_container}>
        <div className={styles.upper_text}>
          <p>{isSender ? recipientName : senderName}</p>
          {lastMessage && <p>{date}</p>}
        </div>
        <p className={styles.last_message}>
          {lastMessage ? lastMessage.body : 'Pas encore de message'}{' '}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
