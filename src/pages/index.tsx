import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { trpc } from '../utils/trpc'

import { Box, Center, Heading } from '@chakra-ui/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return <Box>Carregando...</Box>
  if (status === 'unauthenticated') router.push('/api/auth/signin')

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_HEAD_TITLE}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
  // const hello = trpc.example.hello.useQuery({ text: 'from tRPC' })

  /*return (
    <>
      <Head>
        <title>Evolution System</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Create <span className={styles.pinkSpan}>T3</span> App
          </h1>
          <div className={styles.cardRow}>
            <Link className={styles.card} href="https://create.t3.gg/en/usage/first-steps" target="_blank">
              <h3 className={styles.cardTitle}>First Steps →</h3>
              <div className={styles.cardText}>
                Just the basics - Everything you need to know to set up your database and authentication.
              </div>
            </Link>
            <Link className={styles.card} href="https://create.t3.gg/en/introduction" target="_blank">
              <h3 className={styles.cardTitle}>Documentation →</h3>
              <div className={styles.cardText}>
                Learn more about Create T3 App, the libraries it uses, and how to deploy it.
              </div>
            </Link>
          </div>
          <div className={styles.showcaseContainer}>
            <p className={styles.showcaseText}>{hello.data ? hello.data.greeting : 'Loading tRPC query...'}</p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  )*/
}

export default Home

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession()

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  )

  return (
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button onClick={sessionData ? () => signOut() : () => signIn()}>{sessionData ? 'Sign out' : 'Sign in'}</button>
    </div>
  )
}
