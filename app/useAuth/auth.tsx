import React, {createContext, useState, useContext, useEffect} from 'react';
import { getAccessToken } from '../utils/storage';
import { Buffer } from 'buffer'
import { Router } from './router';


type AuthContextData = {
  redirect?:number
  loading:boolean
  changeLoginStatus():void
};
interface IAuth {
  childrent : React.ReactNode
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = () => {
  const [redirect, setRedirect] = useState<number>()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const accessToken = await getAccessToken()
      console.log("accessToken", accessToken)
      if (accessToken) {
        setRedirect(1)
      } else {
        setRedirect(0)
      }
    } catch (error) {
      setRedirect(0)
    } finally {
      setLoading(false)
    }
  }

  const changeLoginStatus = async () => {
    await loadStorageData()
  }

  return (
    <AuthContext.Provider value={{redirect, loading, changeLoginStatus}}>
      <Router/>
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth}