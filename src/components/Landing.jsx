import {Header, Footer, Hero, Container} from "./components"

const Landing = () => {
  return (
    <Container className="flex flex-col">
        <Header/>
        <Hero/>
        <Footer/>
    </Container>
  )
}

export default Landing