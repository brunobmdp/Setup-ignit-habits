import './lib/dayjs'
import { Header } from './components/Header'
import { SummaryTables } from './components/SummaryTable'
import './styles/global.css'
import { useEffect, useState } from 'react'
import { api } from './lib/axios'

export interface Summary {
  id: string
  date: string
  completed: number
  amount: number
}



export function App() {
  const [summary, setSummary] = useState<Summary[]>([])
  const [loading, setLoading] = useState(true)
  const [reloadSummary, setReloadSummary] = useState(false)

  function onReloadPage() {
    setReloadSummary(state => !state)
  }

  async function fetchSummary() {
    try {
      setLoading(true)
      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (err) {
      console.log(err)
      alert('Não foi possível carregar os as informações')

    } finally {
      setLoading(false)
    }

  }
  useEffect(() => {
    fetchSummary()

  }, [reloadSummary])


  if (loading) {
    return null
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header pageReloader={onReloadPage} />
        <SummaryTables summary={summary} pageReloader={onReloadPage} />
      </div>

    </div>
  )
}


