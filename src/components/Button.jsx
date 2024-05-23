import { forwardRef } from "react"

const Button = forwardRef(({children, label="", className="", functionality=()=>{}, ...props}, ref) => {
  return (
    <button ref={ref} className={`focus:outline-0 rounded bg-violet-700 text-white text-lg uppercase hover:bg-violet-800 transition-all ${className}`} onClick={e => {
      e.preventDefault()
      functionality()
    }} {...props}>
      {children}
      {label}
    </button>
  )
})

export default Button