import {
  AlertCircle,
  Inbox,
  LoaderCircle,
} from "lucide-react"
import type { ReactNode } from "react"

type StateMessageProps = {
  type: "loading" | "empty" | "error"
  title?: string
  message?: string
  action?: ReactNode
}

function StateMessage({
  type,
  title,
  message,
  action,
}: StateMessageProps) {
  const config = {
    loading: {
      icon: LoaderCircle,
      defaultTitle: "Loading...",
      defaultMessage: "Please wait while we load your products.",
    },
    empty: {
      icon: Inbox,
      defaultTitle: "Nothing here yet",
      defaultMessage: "There are no items to display right now.",
    },
    error: {
      icon: AlertCircle,
      defaultTitle: "Something went wrong",
      defaultMessage:
        "We couldn't load this content. Please try again.",
    },
  }

  const current = config[type]
  const Icon = current.icon

  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl bg-[#f8fafc] px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
        <Icon
          size={24}
          className={
            type === "loading"
              ? "animate-spin text-purple-600"
              : type === "error"
                ? "text-red-500"
                : "text-neutral-400"
          }
        />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-neutral-900">
        {title ?? current.defaultTitle}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        {message ?? current.defaultMessage}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default StateMessage