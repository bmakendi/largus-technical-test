import type { FC } from 'react'
import Head from 'next/head'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { useGetUser } from '../utils/hooks/user'
import Header from '../components/Header/Header'

const Home: FC = () => {
  const loggedUser = getLoggedUserId()
  const url: string = `http://localhost:3005/users/${loggedUser}`
  const { user, isLoading, error } = useGetUser(url)

  console.log(user, isLoading, error);
  
  return (
    <div>
      <Head>
        <title>Vos conversations - Leboncoin</title>
        <meta name="description" content="L'application de messagerie de Leboncoin, retrouvez ici tous vos messages !"></meta>
      </Head>
      <Header/> {/*MOVE HEADER IN A LAYOUT COMPONENT*/}
      <h1>
        {`Bienvenue ${user?.nickname}`}
      </h1>
    </div>
  )
}

export default Home