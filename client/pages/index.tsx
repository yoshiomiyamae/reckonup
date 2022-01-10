import type { GetServerSideProps, NextPage } from 'next'
import Layout from '../components/layout'
import { User } from '../gql/types'
import { getLoginUser } from '../lib/system'

import nookies from 'nookies';
import { Translate } from '../locales';
import { useRouter } from 'next/router';

interface HomeProps {
  user?: User
}

const Home: NextPage<HomeProps> = ({ user }) => {
  const router = useRouter();

  const t = new Translate(router.locale);
  return <>
    <Layout user={user}>
      <div className="hero is-link">
        <div className="hero-body">
          <div className="title">
            {t.t('Travel Expenditure Management System')}
          </div>
          <div className="subtitle">
            {t.t('Reckonup is ....')}
          </div>
        </div>
      </div>
    </Layout>
  </>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const user = await getLoginUser(ctx);
    return {
      props: {
        user,
      }
    };
  } catch {
    return { props: {} };
  }
}

export default Home
