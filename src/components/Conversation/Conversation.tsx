import { useGetLastMessage } from '../../utils/hooks/messages';
import { useConvertTimeStamp } from '../../utils/hooks/helper';
import Image from 'next/image';
import Link from 'next/dist/client/link';
import styles from './conversation.module.scss';
import defaultPicture from '../../assets/profile.png';

interface ConversationProps {
  conversationId: number;
  currentUserName: string;
  senderName: string;
  recipientName: string;
}

const Conversation = ({
  conversationId,
  currentUserName,
  senderName,
  recipientName,
}: ConversationProps) => {
  const url = `http://localhost:3005/messages/${conversationId}`;
  const { lastMessage, isLoading, error } = useGetLastMessage(url);
  const isSender = currentUserName === senderName; //boolean to know which name to display
  const date = useConvertTimeStamp(lastMessage?.timestamp);

  console.log(lastMessage, isLoading, error, date);

  return (
    <Link href={`/messages?conv=${conversationId}`}>
      <a>
        <div className={styles.container}>
          <Image
            src={defaultPicture}
            alt='Photo de profil'
            className='conversation_picture'
            height={35}
            width={35}
            layout='fixed'
          />
          <div className={styles.text_container}>
            <div className={styles.upper_text}>
              <p className={styles.contact_name}>
                {isSender ? recipientName : senderName}
              </p>
              {lastMessage && <p className={styles.message_date}>{date}</p>}
            </div>
            <p className={styles.last_message}>
              {lastMessage ? lastMessage.body : 'Pas encore de message...'}{' '}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Conversation;
