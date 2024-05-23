import {Logo, Button} from "./components"
import {useUserContext} from "../contexts/user.context"
import { useNavigate } from "react-router-dom"
import authService from "../services/auth.service"
import { userIcon } from "../assets/assets"

const Header = () => {
  const {loggedIn, logout, userData} = useUserContext()
  const navigate = useNavigate()

  return (
    <nav className="flex justify-between items-center rounded-lg shadow m-4 p-4">
        <Logo/>
        {
          loggedIn?
          <div className="flex gap-10">
            <div className="bg-gray-300 px-4 py-1 rounded-xl flex flex-col items-center">
              <img src={userIcon} width={25} />
              <span>{userData.name || "User"}</span>
            </div>
            <Button label="Logout" className="px-4" functionality={()=>{
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
            <Button label="Signup" className="p-2" functionality={()=>{
              navigate("/signup")
            }} />
            <Button label="Sign In" className="p-2" functionality={()=>{
              navigate("/signin")
            }} />
          </div>
        }
    </nav>
  )
}

export default Header