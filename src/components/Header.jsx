import {Logo, Button} from "./components"
import {useUserContext} from "../contexts/user.context"
import { useNavigate } from "react-router-dom"
import authService from "../services/auth.service"

const Header = () => {
  const {loggedIn, logout} = useUserContext()
  const navigate = useNavigate()

  return (
    <nav className="flex justify-between items-center">
        <Logo/>
        {
          loggedIn?
          <Button label="Logout" functionality={()=>{
            authService.logout()
            .then(res => {
              if (res) logout()
            })
            .catch(err => {
              console.error(err);
            })
          }} />
          :
          <div className="flex gap-3">
            <Button label="Signup" functionality={()=>{
              navigate("/signup")
            }} />
            <Button label="Sign In" functionality={()=>{
              navigate("/signin")
            }} />
          </div>
        }
    </nav>
  )
}

export default Header