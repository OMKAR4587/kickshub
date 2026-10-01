type ButtonProps = {
  children: React.ReactNode
  varient?: 'primary' | 'secondary' | 'outline'
  className?: string;
  onClick?: () => void
  type?: "button" | "submit"
};

function Button({
  children,
  varient = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
    const baseStyle = 'inline-flex item-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200'

    const varients = {
        primary:'bg-black text-white hover:bg-neutral-800',
        secondary:'bg-neutral-100 text-black hover:bg-neutral-200',
        outline:'border border-neutral-300 text-black hover:bg-black hover:text-white'
    }

    return(
        <button
        type={type}
        onClick={onClick}
        className={`${baseStyle} ${varients[varient]} ${className}`}>
            {children}
        </button>
    )
}

export default Button