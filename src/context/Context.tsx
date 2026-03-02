import {createContext, useState, type ReactNode,} from "react"

interface ContextType {
    collapsed:boolean,
    setCollapsed:any
}

export const Context = createContext<ContextType>({} as ContextType)

export const GlobalContext = ({children}:{children:ReactNode}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    return <Context.Provider value={{collapsed, setCollapsed}}>{children}</Context.Provider>
}