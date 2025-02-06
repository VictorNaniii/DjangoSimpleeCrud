import { useState } from 'react'
import api from '../assets/api'
import { ACCES_TOKEN, REFRESH_TOKEN } from '../constant'
import { useNavigate } from 'react-router-dom'
import '../styles/Form.css'

function Form({ route, method }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const name = method === 'login' ? 'Login' : 'Register'

  const handleSubmit = async (e: React.FormEvent) => {
    {
      setLoading(true)
      e.preventDefault()

      try {
        const res = await api.post(route, { username, password })
        if (method === 'login') {
          localStorage.setItem(ACCES_TOKEN, res.data.access)
          localStorage.setItem(REFRESH_TOKEN, res.data.reactRefresh)
          navigate('/')
        } else {
          navigate('/login')
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="from-container">
      <h1>{name}</h1>
      <input
        className="from-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        className="from-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  )
}
export default Form
