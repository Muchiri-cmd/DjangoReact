import { Navigate } from 'react-router-dom'
import {jwtDecode } from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN,ACCESS_TOKEN } from '../constants'
import { useState,useEffect } from 'react'


function ProtectedRoute ({ children }) {
  const [isAuthorized,setisAuthorized] = useState(null)
  useEffect(() => {
    auth().catch(() => setisAuthorized(false))
  }, [])

  const refreshToken = async() => {
    //refreshes accessToken
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      const res = await api.post('/api/token/refresh/',{
        refresh:refreshToken
      })
      if (res.status === 200){
        localStorage.setItem(ACCESS_TOKEN,res.data.access)
        setisAuthorized(true)
      } else {
        setisAuthorized(false)
      }
    } catch (error){
      console.log(error)

    }
  }

  const auth = async() => {
    //check if we need to refresh token
    //see if access token , if expired ,refresh 

    const token = localStorage.getItem(ACCESS_TOKEN)
    if(!token){
      setisAuthorized(false)
      return
    }
    const decodedToken =jwtDecode(token)
    const tokenExpiration = decodedToken.exp
    const now = Date.now() / 1000

    if (tokenExpiration < now){
      await refreshToken()
    } else {
      setisAuthorized(true)
    }
      
    
  }

  if (isAuthorized === null ){
    return <div>Loading ...</div>
  }

  return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute
