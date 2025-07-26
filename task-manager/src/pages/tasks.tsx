import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Task {
  id: string
  title: string
  description: string
  is_done: boolean
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const user = (await supabase.auth.getUser()).data.user
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user?.id)

    if (data) setTasks(data)
    if (error) console.error(error)
  }

  const addTask = async () => {
    const user = (await supabase.auth.getUser()).data.user
    const { error } = await supabase.from('tasks').insert({
      title,
      description,
      is_done: false,
      user_id: user?.id
    })
    if (error) return alert(error.message)
    setTitle('')
    setDescription('')
    fetchTasks()
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>
      <div className="mb-4">
        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="p-4 border rounded bg-gray-100">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.is_done ? '✅ Done' : '❌ Not Done'}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
