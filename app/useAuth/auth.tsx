import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAccessToken } from '../utils/storage';
import { Router } from './router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { changeStatusLogin } from '../store/newsSlice';


type AuthContextData = {
  redirect?: number
  loading: boolean
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = () => {
  const [redirect, setRedirect] = useState<number>()
  const [loading, setLoading] = useState(true);
  const isLogin = useSelector((state: RootState) => state.newsReducer.isLogin)
  console.log('ISLOGIN', isLogin);
  const dispatch = useDispatch()
  
  useEffect(() => {
    loadStorageData();
  }, [isLogin]);

  async function loadStorageData() {
    try {
      const accessToken = await getAccessToken()
      // console.log("accessToken", accessToken)
      if (accessToken) {
        setRedirect(1)
        dispatch(changeStatusLogin(true))
      } else {
        setRedirect(0)
        dispatch(changeStatusLogin(false))

      }
    } catch (error) {
      dispatch(changeStatusLogin(false))
      setRedirect(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ redirect, loading }}>
      <Router />
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

export { AuthContext, AuthProvider, useAuth }