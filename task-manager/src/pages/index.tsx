import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert('Check your email to confirm sign up.')
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/tasks')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold">Task Manager Login</h1>
      <input
        className="border p-2 rounded"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-4">
        <button onClick={handleSignUp} className="bg-green-500 px-4 py-2 text-white rounded">Sign Up</button>
        <button onClick={handleSignIn} className="bg-blue-500 px-4 py-2 text-white rounded">Sign In</button>
      </div>
    </main>
  )
}
