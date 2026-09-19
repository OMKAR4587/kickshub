import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

import {
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  X,
} from "lucide-react"

import { createPortal } from "react-dom"

type ToastType = "success" | "error" | "info" | "warning"

type Toast = {
  id: number
  message: string
  type: ToastType
}

type ToastContextType = {
  showToast: (
    message: string,
    type?: ToastType,
  ) => void
}

const ToastContext = createContext<
  ToastContextType | undefined
>(undefined)

type ToastProviderProps = {
  children: ReactNode
}

export function ToastProvider({
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (
    message: string,
    type: ToastType = "success",
  ) => {
    const id = Date.now() + Math.random()

    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id,
        message,
        type,
      },
    ])

    window.setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id),
      )
    }, 3500)
  }

  const removeToast = (id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    )
  }

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case "error":
        return <XCircle size={20} />
      case "warning":
        return <AlertTriangle size={20} />
      case "info":
        return <Info size={20} />
      default:
        return <CheckCircle size={20} />
    }
  }

  const getToastColor = (type: ToastType) => {
    switch (type) {
      case "error":
        return "text-red-600 bg-red-50"
      case "warning":
        return "text-amber-600 bg-amber-50"
      case "info":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-green-600 bg-green-50"
    }
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {createPortal(
       <div className="fixed bottom-5 left-1/2 z-100 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-3">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getToastColor(
                  toast.type,
                )}`}
              >
                {getToastIcon(toast.type)}
              </div>

              <p className="flex-1 pt-2 text-sm font-medium text-neutral-800">
                {toast.message}
              </p>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider",
    )
  }

  return context
}