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

// ============================================================
// USER TYPE
// This is the user information we keep on the frontend.
// ============================================================

type AuthUser = {
  id: string
  name: string
  email: string
}

// ============================================================
// AUTH CONTEXT TYPE
// Everything related to authentication is exposed from here.
// ============================================================

type AuthContextType = {
  // Logged-in user
  user: AuthUser | null

  // JWT token returned by backend
  token: string | null

  // Used while checking an existing session
  loading: boolean

  // Easy way to know if user is logged in
  isAuthenticated: boolean

  // ----------------------------------------------------------
  // AUTH MODAL STATE
  // ----------------------------------------------------------

  // Is the login/register modal currently visible?
  authModalOpen: boolean

  // Which screen should the modal show?
  // "login" = Sign in
  // "register" = Create account
  authModalMode: "login" | "register"

  // Open modal
  openAuthModal: (mode?: "login" | "register") => void

  // Close modal
  closeAuthModal: () => void

  // ----------------------------------------------------------
  // AUTH ACTIONS
  // ----------------------------------------------------------

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

// ============================================================
// CREATE CONTEXT
// ============================================================

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
)

// ============================================================
// AUTH PROVIDER
// This wraps the entire application.
// ============================================================

function AuthProvider({ children }: { children: ReactNode }) {
  // ----------------------------------------------------------
  // RESTORE USER FROM LOCAL STORAGE
  // ----------------------------------------------------------

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

  // ----------------------------------------------------------
  // RESTORE JWT TOKEN
  // ----------------------------------------------------------

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("kickshub_token"),
  )

  // ----------------------------------------------------------
  // SESSION CHECK LOADING STATE
  // ----------------------------------------------------------

  const [loading, setLoading] = useState(true)

  // ==========================================================
  // AUTH MODAL STATE
  // ==========================================================

  // Controls whether AuthModal is visible.
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Controls whether AuthModal shows Login or Register.
  const [authModalMode, setAuthModalMode] =
    useState<"login" | "register">("login")

  // ==========================================================
  // OPEN AUTH MODAL
  //
  // Anywhere in the application we can now do:
  //
  // openAuthModal("login")
  //
  // or:
  //
  // openAuthModal("register")
  // ==========================================================

  function openAuthModal(
    mode: "login" | "register" = "login",
  ) {
    setAuthModalMode(mode)
    setAuthModalOpen(true)
  }

  // ==========================================================
  // CLOSE AUTH MODAL
  // ==========================================================

  function closeAuthModal() {
    setAuthModalOpen(false)
  }

  // ==========================================================
  // CHECK EXISTING LOGIN SESSION
  //
  // When the page refreshes:
  //
  // 1. Get token from localStorage
  // 2. Ask backend if token is valid
  // 3. Restore user
  // ==========================================================

  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await getCurrentUser(token)

        if (!data.success) {
          throw new Error(
            data.message || "Session expired",
          )
        }

        // Backend confirmed the user.
        setUser(data.user)

        // Keep user information available after refresh.
        localStorage.setItem(
          "kickshub_user",
          JSON.stringify(data.user),
        )
      } catch {
        // Token is invalid or expired.
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

  // ==========================================================
  // LOGIN
  // ==========================================================

  async function login(
    email: string,
    password: string,
  ) {
    const data = await loginUser({
      email,
      password,
    })

    // Backend rejected login.
    if (!data.success) {
      return {
        success: false,
        message:
          data.message ||
          "Invalid email or password",
      }
    }

    // Save authenticated user.
    setUser(data.user)

    // Save JWT token.
    setToken(data.token)

    // Persist login across page refreshes.
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

  // ==========================================================
  // REGISTER
  // ==========================================================

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

    // Backend rejected registration.
    if (!data.success) {
      return {
        success: false,
        message:
          data.message ||
          "Registration failed",
      }
    }

    // Automatically log the new user in.
    setUser(data.user)
    setToken(data.token)

    // Persist session.
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

  // ==========================================================
  // LOGOUT
  // ==========================================================

  function logout() {
    localStorage.removeItem("kickshub_token")
    localStorage.removeItem("kickshub_user")

    setToken(null)
    setUser(null)
  }

  // ==========================================================
  // PROVIDER
  // ==========================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,

        // User is authenticated only when BOTH exist.
        isAuthenticated: Boolean(user && token),

        // Modal controls
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,

        // Auth functions
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ============================================================
// CUSTOM HOOK
//
// Components can now simply use:
//
// const { user, openAuthModal } = useAuth()
// ============================================================

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