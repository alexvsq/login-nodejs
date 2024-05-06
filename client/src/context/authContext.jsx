import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest , verifyTokenRequet } from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within a AuthProvider')
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuntheticated, setIsAunthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const singUp = async (values) => {
        try {
            const res = await registerRequest(values)
            console.log(res.data)
            setUser(res.data)
            setIsAunthenticated(true)

        } catch (error) {
            setErrors(error.response.data)
            console.log(error)
        }
    }

    const singIn = async (user) => {
        try {
            const res = await loginRequest(user)
            setIsAunthenticated(true)
            setUser(res.data)
            console.log(res);
        } catch (error) {
            if (Array.isArray(error.response.data)) {

                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          if (!cookies.token) {
            setIsAunthenticated(false);
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequet(cookies.token);
            console.log(res);
            if (!res.data) return setIsAunthenticated(false);
            setIsAunthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setIsAunthenticated(false);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);

      const logOut = () => {
        Cookies.remove('token');
        setIsAunthenticated(false);
        setUser(null);
      }


    return (
        <AuthContext.Provider value={{
            singUp, user, isAuntheticated, errors, singIn , loading , logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}
