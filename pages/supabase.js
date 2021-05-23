import Link from 'next/link'
import useSWR from 'swr'
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui'
import { supabase } from '../utils/initSupabase'
import { useEffect, useState } from 'react'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Index = () => {
  const { user, session } = Auth.useUser()
  const { data, error } = useSWR(
    session ? ['/api/getUser', session.access_token] : null,
    fetcher
  )
  const [authView, setAuthView] = useState('sign_in')

  useEffect(() => {
    console.log('hello world')
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('update_password')
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000)
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const onClick = ({email, password}) => {
    supabase.auth
      .signUp({ email, password })
      .then((response) => {
        response.error ? alert(response.error.message) : setToken(response)
      })
      .catch((err) => {
        console.log('err', err);
        // alert(err.response.text)
      })
  }

  const setToken = (response) => {
    if (response.data.confirmation_sent_at && !response.data.access_token) {
      alert('Confirmation Email Sent')
    } else {
      document.querySelector('#access-token').value = response.data.access_token
      document.querySelector('#refresh-token').value = response.data.refresh_token
      alert('Logged in as ' + response.user.email)
    }
  }

  const View = () => {
    if (!user)
      return (
        <Space direction="vertical" size={8}>
          <Auth
            supabaseClient={supabase}
            // providers={['google', 'github']}
            // view={authView}
            // socialLayout="horizontal"
            // socialButtonSize="xlarge"
          />
        </Space>
      )

    return (
      <Space direction="vertical" size={6}>
        {authView === 'update_password' && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {user && (
          <>
            <Typography.Text>You're signed in</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>

            <Button
              icon={<Icon type="LogOut" />}
              type="outline"
              onClick={() => supabase.auth.signOut()}
            >
              Log out
            </Button>
            {error && (
              <Typography.Text danger>Failed to fetch user!</Typography.Text>
            )}
            {data && !error ? (
              <>
                <Typography.Text type="success">
                  User data retrieved server-side (in API route):
                </Typography.Text>

                <Typography.Text>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </Typography.Text>
              </>
            ) : (
              <div>Loading...</div>
            )}

            <Typography.Text>
              <Link href="/supabase-profile">
                <a>SSR example with getServerSideProps</a>
              </Link>
            </Typography.Text>
          </>
        )}
      </Space>
    )
  }

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>

      <Card>
        <Button
          onClick={() => {
            onClick({
              'email': 'dccabs@gmail.com',
              password: 'NYmets45!'
            })
          }}
        >Hello world</Button>
        <View />
      </Card>
    </div>
  )
}

export default Index
