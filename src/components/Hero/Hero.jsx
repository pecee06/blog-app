import "./Hero.css"

const Hero = () => {
  return (
    <main className="flex flex-wrap">
      <div id="hero-left" className="w-1/2">
        <h2 className="uppercase font-bold">Live</h2>
        <h2 className="uppercase font-bold text-pink-800">Love</h2>
        <h2 className="uppercase font-bold text-violet-800">Blog</h2>
      </div>
      <div id="hero-right" className="w-1/2 h-[85vh] relative">
        <div id="hero-circle" className="absolute bg-white w-40 h-40"></div>
      </div>
    </main>
  )
}

export default Hero