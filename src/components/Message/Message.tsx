import { useState } from 'react';
import { getLoggedUserId } from '../../utils/getLoggedUserId';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ClickAwayListener, IconButton } from '@mui/material';
import styles from './message.module.scss';

interface MessageProps {
  body: string;
  authorId: number;
  messageId: number;
}

const Message = ({ authorId, body, messageId }: MessageProps) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [deleteOption, setDeleteOption] = useState(false);
  const loggedUser = getLoggedUserId();
  const currentUserIsAuthor = loggedUser === authorId;
  const url = `http://localhost:3005/message/${messageId}`;
  const handleClickAway = () => {
    setDeleteOption(false);
    setOptionsVisible(false);
  };

  const handleDeleteMessage = async () => {
    const body = JSON.stringify({ messageId, authorId });
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUserIsAuthor ? (
        <>
          <p
            className={styles.author_message}
            onMouseLeave={() => setOptionsVisible(false)}
            onMouseEnter={() => setOptionsVisible(true)}
          >
            {body}
            {optionsVisible && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <IconButton
                  onClick={() => {
                    setDeleteOption(true);
                  }}
                >
                  <MoreHorizIcon className={styles.more_icon_author} />
                </IconButton>
              </ClickAwayListener>
            )}
            {deleteOption && (
              <span
                className={styles.delete_author}
                onClick={handleDeleteMessage}
              >
                Supprimer
              </span>
            )}
          </p>
        </>
      ) : (
        <>
          <p
            className={styles.contact_message}
            onMouseLeave={() => setOptionsVisible(false)}
            onMouseEnter={() => setOptionsVisible(true)}
          >
            {body}
            {optionsVisible && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <IconButton
                  onClick={() => {
                    setDeleteOption(true);
                  }}
                >
                  <MoreHorizIcon className={styles.more_icon_recipient} />
                </IconButton>
              </ClickAwayListener>
            )}
            {deleteOption && (
              <span
                className={styles.delete_recipient}
                onClick={handleDeleteMessage}
              >
                Supprimer
              </span>
            )}
          </p>
        </>
      )}
    </>
  );
};

export default Message;
