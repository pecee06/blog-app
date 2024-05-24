import { forwardRef } from "react"

const Button = forwardRef(({children, label="", className="", functionality=()=>{}, ...props}, ref) => {
  return (
    <button ref={ref} className={`focus:outline-0 rounded text-white text-lg uppercase transition-all ${className}`} onClick={e => {
      e.preventDefault()
      functionality()
    }} {...props}>
      {children}
      {label}
    </button>
  )
})

export default Button