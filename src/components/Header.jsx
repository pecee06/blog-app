import {Logo, Button} from "./components"
import {useUserContext} from "../contexts/user.context"
import { useNavigate } from "react-router-dom"
import authService from "../services/auth.service"
import { userIcon } from "../assets/assets"

const Header = () => {
  const {loggedIn, logout, userData} = useUserContext()
  const navigate = useNavigate()

  return (
    <nav className="flex justify-between items-center rounded-lg shadow m-4 px-4 py-2">
        <Logo/>
        {
          loggedIn?
          <div className="flex gap-3">
            <img src={userIcon} width={30} />
            <Button label="Logout" functionality={()=>{
              authService.logout()
              .then(res => {
                if (res) logout()
              })
              .catch(err => {
                console.error(err);
              })
            }} />
          </div>
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