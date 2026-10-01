import { useState, useEffect } from "react";
import { X, Eye, EyeOff, ArrowUpRight } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import sneakerImage from "../../assets/products/air-runner.png";

function AuthModal() {
  const {
    isAuthenticated,
    loading,
    login,
    register,
    authModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
  } = useAuth();

  const { showToast } = useToast();

  const [mode, setMode] =
    useState<"login" | "register">(authModalMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync local form mode with AuthContext modal state.
  useEffect(() => {
    setMode(authModalMode);

    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  }, [authModalMode, authModalOpen]);

  // Open the auth modal automatically on first visit.
  useEffect(() => {
    if (loading || isAuthenticated || authModalOpen) {
      return;
    }

    const hasSeenAuthModal =
      localStorage.getItem("kickshub_auth_seen");

    if (!hasSeenAuthModal) {
      openAuthModal("login");
    }
  }, [
    loading,
    isAuthenticated,
    authModalOpen,
    openAuthModal,
  ]);

  if (loading || isAuthenticated || !authModalOpen) {
    return null;
  }

  const handleClose = () => {
    localStorage.setItem(
      "kickshub_auth_seen",
      "true",
    );

    closeAuthModal();
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast(
        "Email and password are required",
        "warning",
      );
      return;
    }

    if (mode === "register" && !name.trim()) {
      showToast(
        "Name is required",
        "warning",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const result =
        mode === "login"
          ? await login(
              email.trim(),
              password,
            )
          : await register(
              name.trim(),
              email.trim(),
              password,
            );

      if (!result.success) {
        showToast(
          result.message ||
            "Authentication failed",
          "warning",
        );
        return;
      }

      localStorage.setItem(
        "kickshub_auth_seen",
        "true",
      );

      closeAuthModal();

      setPassword("");

      showToast(
        mode === "login"
          ? "Welcome back to KicksHub"
          : "Welcome to KicksHub",
        "success",
      );
    } catch {
      showToast(
        "Something went wrong. Please try again.",
        "warning",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    const nextMode =
      mode === "login"
        ? "register"
        : "login";

    openAuthModal(nextMode);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-neutral-950/70 px-3 py-4 backdrop-blur-md sm:px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-[1.75rem] lg:grid-cols-2">
        {/* Close */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close authentication modal"
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur transition hover:bg-white hover:text-black sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X size={18} />
        </button>

        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden bg-neutral-950 lg:flex lg:min-h-[540px]">
          <div
            className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex h-full w-full flex-col p-7 xl:p-9">
            {/* Brand */}
            <div>
              <p className="text-xl font-black tracking-tighter text-white xl:text-2xl">
                Kicks
                <span className="text-neutral-500">
                  Hub
                </span>
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Move Different
              </p>
            </div>

            {/* Sneaker */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <div
                className="absolute h-56 w-56 rounded-full bg-gradient-to-br from-blue-500/40 via-indigo-500/30 to-purple-600/40 blur-2xl"
                aria-hidden="true"
              />

              <div
                className="absolute h-64 w-64 rounded-full border border-white/10"
                aria-hidden="true"
              />

              <div
                className="absolute h-72 w-72 rounded-full border border-dashed border-white/10"
                aria-hidden="true"
              />

              <img
                src={sneakerImage}
                alt="KicksHub sneaker"
                className="relative z-10 w-[82%] max-w-md -rotate-12 object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute bottom-8 right-4 z-20 flex h-16 w-16 rotate-12 items-center justify-center rounded-full bg-white text-center text-[8px] font-black uppercase leading-tight tracking-widest text-neutral-950 shadow-xl xl:h-20 xl:w-20 xl:text-[9px]">
                Step
                <br />
                Different
              </div>
            </div>

            {/* Bottom copy */}
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                Premium Streetwear
              </p>

              <h3 className="max-w-sm text-3xl font-black leading-[0.95] tracking-[-0.04em] text-white xl:text-4xl">
                Your next
                <br />
                move starts here.
              </h3>

              <p className="mt-3 max-w-sm text-xs leading-5 text-neutral-400">
                Discover curated sneakers built
                for people who never follow the
                crowd.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex max-h-fit min-h-0 flex-col justify-center overflow-y-auto px-5 py-7 [&::-webkit-scrollbar]:hidden sm:px-8 sm:py-9 lg:px-9 xl:px-11">
          <div className="mx-auto w-full max-w-sm">
            {/* Mobile logo */}
            <div className="mb-6 lg:hidden">
              <p className="text-xl font-black tracking-tighter text-neutral-950">
                Kicks
                <span className="text-neutral-400">
                  Hub
                </span>
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Move Different
              </p>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600">
                {mode === "login"
                  ? "Welcome back"
                  : "Create account"}
              </p>

              <h2
                id="auth-modal-title"
                className="text-3xl font-black tracking-[-0.04em] text-neutral-950 sm:text-4xl"
              >
                {mode === "login"
                  ? "Sign in."
                  : "Join KicksHub."}
              </h2>

              <p className="mt-2 text-xs leading-5 text-neutral-500 sm:text-sm">
                {mode === "login"
                  ? "Sign in to continue your sneaker journey."
                  : "Create your account and discover your next pair."}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name */}
              {mode === "register" && (
                <div>
                  <label
                    htmlFor="auth-name"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-neutral-600"
                  >
                    Full name
                  </label>

                  <input
                    id="auth-name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Your name"
                    autoComplete="name"
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="auth-email"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-neutral-600"
                >
                  Email address
                </label>

                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="auth-password"
                    className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600"
                  >
                    Password
                  </label>

                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          "Password reset will be available soon.",
                          "info",
                        )
                      }
                      className="text-[10px] font-medium text-purple-600 transition hover:text-purple-700"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="auth-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete={
                      mode === "login"
                        ? "current-password"
                        : "new-password"
                    }
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 pr-12 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:text-neutral-800"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-11 w-full items-center justify-center gap-3 rounded-xl bg-neutral-950 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-600 hover:shadow-xl hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? mode === "login"
                    ? "Signing in..."
                    : "Creating account..."
                  : mode === "login"
                    ? "Sign in"
                    : "Create account"}

                {!isSubmitting && (
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />

              <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                Or
              </span>

              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Switch */}
            <p className="text-center text-xs text-neutral-500 sm:text-sm">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={switchMode}
                className="ml-1 font-semibold text-neutral-950 transition hover:text-purple-600"
              >
                {mode === "login"
                  ? "Create one"
                  : "Sign in"}
              </button>
            </p>

            {/* Terms */}
            <p className="mt-5 text-center text-[9px] leading-4 text-neutral-400">
              By continuing, you agree to KicksHub's
              Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;