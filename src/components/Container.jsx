const Container = ({children, className="", ...props}) => {
  return (
    <div className={`min-h-screen w-screen p-[2vw] ${className}`} {...props}>
        {children}
    </div>
  )
}

export default Container