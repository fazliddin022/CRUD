import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboardHome, Groups, Rooms, StackCrud, StackMore, Stacks, Students, Teachers } from "../pages"
import { Header, Sitebar } from "../modules"
import { useContext } from "react"
import { Context } from "../context/Context"


const DashboardRoute = () => {
const {collapsed} = useContext(Context) 
  const list = [
        {id:1, path:PATH.home, element:<DashboardHome/>},
        {id:2, path:PATH.stacks, element:<Stacks/>},
        {id:3, path:PATH.stacksMore, element:<StackMore/>},
        {id:4, path:PATH.stacksCreate, element:<StackCrud/>},
        {id:5, path:PATH.stacksUpdate, element:<StackCrud/>},
        {id:6, path:PATH.groups, element:<Groups/>},
        {id:7, path:PATH.teachers, element:<Teachers/>},
        {id:8, path:PATH.students, element:<Students/>},
        {id:9, path:PATH.rooms, element:<Rooms/>},
    ]
return(
    <div className="flex">
        <Sitebar/>
        <div className={`${collapsed ? "w-full" : "w-[78%]"}  duration-300 h-screen overflow-y-auto`}>
            <Header/>
            <Routes>{list.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
        </div>
    </div>
    )
}

export default DashboardRoute