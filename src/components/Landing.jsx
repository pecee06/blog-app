import {Header, Footer, Hero, Container} from "./components"

const Landing = () => {
  return (
    <Container className="flex flex-col gap-3">
        <Header/>
        <Hero/>
        <Footer/>
    </Container>
  )
}

export default Landing