import {Header, Footer, Hero, Container, Posts} from "./components"
import { useUserContext } from "../contexts/user.context"

const Landing = () => {
  const {loggedIn} = useUserContext()
  return (
    <Container className="flex flex-col gap-10">
        <Header/>
        {
          loggedIn?
          <Posts/>
          :
          <Hero/>
        }
        <Footer/>
    </Container>
  )
}

export default Landing