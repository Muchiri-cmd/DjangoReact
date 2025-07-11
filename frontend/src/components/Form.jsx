import { useState } from "react";
import api from '../api'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN,REFRESH_TOKEN  } from "../constants";
import "../styles/Form.css"

const Form = ({route,method}) => {
  const [ username,setUsername ] = useState("")
  const [ password,setPassword ] = useState("")
  const [ loading,setLoading ] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const res = await api.post(route,{username,password})
      if(method === "login"){
        localStorage.setItem(ACCESS_TOKEN,res.data.access)
        localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
        navigate('/')
      } else {
        navigate('/login')
      }
    }catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  const header = method === "login" ? "Login" : "Register"

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{header}</h1>

      <input 
        className='form-input'
        type='text'
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input 
        className='form-input'
        type='password'
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='form-button' type='submit'>
        {header}
      </button>

    </form>
  )
}

export default Form
