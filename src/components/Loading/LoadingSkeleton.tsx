import styles from './loading.module.scss';

const LoadingSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.conv_skeleton}>
        <div className={styles.picture}></div>
        <div className={styles.text}></div>
      </div>
      <div className={styles.conv_skeleton}>
        <div className={styles.picture}></div>
        <div className={styles.text}></div>
      </div>
      <div className={styles.conv_skeleton}>
        <div className={styles.picture}></div>
        <div className={styles.text_small}></div>
      </div>
      <div className={styles.conv_skeleton}>
        <div className={styles.picture}></div>
        <div className={styles.text_medium}></div>
      </div>
      <div className={styles.conv_skeleton}>
        <div className={styles.picture}></div>
        <div className={styles.text}></div>
      </div>
      <div className={styles.conv_skeleton}>
        <div className={styles.picture}></div>
        <div className={styles.text_medium}></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
