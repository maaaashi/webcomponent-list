import { useEffect, useState } from 'react'
import { supabase } from '../libs/supabaseClient'
import type { Session } from '@supabase/supabase-js'
import Avatar from 'boring-avatars'

export const AuthMenu = () => {
  const [session, setSession] = useState<null | Session>(null)
  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      setSession(session.data.session)
    })
  }, [])

  const signUp = async () => {
    window.location.href = '/auth/sign_up'
  }
  const signIn = async () => {
    window.location.href = '/auth/sign_in'
  }
  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (session) {
    return (
      <div>
        <div className='avatar flex items-center gap-2'>
          <div className='w-9 rounded-full'>
            <Avatar
              size={40}
              name={session.user.user_metadata.name}
              variant='marble'
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
          </div>
          {session.user.user_metadata.name}
          <button className='btn' onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex gap-2'>
        <button className='btn btn-outline' onClick={signUp}>
          Sign Up
        </button>
        <button className='btn' onClick={signIn}>
          Sign In
        </button>
      </div>
    )
  }
}
