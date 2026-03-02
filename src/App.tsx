import { AuthRoute, DashboardRoute } from "./routes"
import { useCookies } from "react-cookie"

const App = () => {
  const [cookies] = useCookies(['token'])
  // const cookies = {token:true} 
  return cookies.token ? <DashboardRoute /> : <AuthRoute />
}

export default App