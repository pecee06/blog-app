const Button = ({children, label="", functionality=()=>{}, className="", ...props}) => {
  return (
    <button className={`focus:outline-0 py-2 px-4 rounded bg-violet-700 text-white text-lg uppercase hover:bg-violet-800 transition-all ${className}`} onClick={functionality} {...props}>
      {children}
      {label}
    </button>
  )
}

export default Button