import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/api"

type AuthUser = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: AuthUser | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean

  login: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean
    message?: string
  }>

  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{
    success: boolean
    message?: string
  }>

  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
)

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem("kickshub_user")

    if (!storedUser) {
      return null
    }

    try {
      return JSON.parse(storedUser)
    } catch {
      localStorage.removeItem("kickshub_user")
      return null
    }
  })

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("kickshub_token"),
  )

  const [loading, setLoading] = useState(true)

  /*
   * Check existing JWT when the app starts.
   */
  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await getCurrentUser(token)

        if (!data.success) {
          throw new Error(data.message || "Session expired")
        }

        setUser(data.user)

        localStorage.setItem(
          "kickshub_user",
          JSON.stringify(data.user),
        )
      } catch {
        localStorage.removeItem("kickshub_token")
        localStorage.removeItem("kickshub_user")

        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [token])

  /*
   * Login
   */
  async function login(
    email: string,
    password: string,
  ) {
    const data = await loginUser({
      email,
      password,
    })

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Invalid email or password",
      }
    }

    setUser(data.user)
    setToken(data.token)

    localStorage.setItem(
      "kickshub_user",
      JSON.stringify(data.user),
    )

    localStorage.setItem(
      "kickshub_token",
      data.token,
    )

    return {
      success: true,
    }
  }

  /*
   * Register
   */
  async function register(
    name: string,
    email: string,
    password: string,
  ) {
    const data = await registerUser({
      name,
      email,
      password,
    })

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Registration failed",
      }
    }

    setUser(data.user)
    setToken(data.token)

    localStorage.setItem(
      "kickshub_user",
      JSON.stringify(data.user),
    )

    localStorage.setItem(
      "kickshub_token",
      data.token,
    )

    return {
      success: true,
    }
  }

  /*
   * Logout
   */
  function logout() {
    localStorage.removeItem("kickshub_token")
    localStorage.removeItem("kickshub_user")

    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    )
  }

  return context
}

export default AuthProvider