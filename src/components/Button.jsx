const Button = ({label="", functionality=()=>{}}) => {
  return (
    <button className="focus:outline-0 py-2 px-5 rounded bg-violet-900 text-white text-lg uppercase font-bold hover:bg-purple-950 transition-all" onClick={functionality}>
      {label}
    </button>
  )
}

export default Button