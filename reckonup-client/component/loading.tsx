import { useRouter } from 'next/router';
import { Translate } from '../locales';
import styles from '../styles/loading.module.scss';

export const Loading = () => {
  const router = useRouter();

  const t = new Translate(router.locale);

  return <>
    <div className={styles.loading}>
      <div>
        <img src="/Bars-1s-200px.svg" alt="Loading..." />
        <p>{t.t('Loading...')}</p>
      </div>
    </div>
  </>
};

export default Loading;