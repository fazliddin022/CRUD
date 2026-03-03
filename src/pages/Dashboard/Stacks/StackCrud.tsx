import { SaveOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState, type SubmitEvent } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Create, GetById, Update } from "../../../services"
import { QueryPATH } from "../../../components"

const StackCrud = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['token'])
  const {id} = useParams()


  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  // Create Logikasi  
  const {mutate:stackCreate, isPending} = Create("/stacks", cookies.token, navigate, queryClient, QueryPATH.stacks)
  // Update Logikasi 
  const {mutate:stackUpdate} = Update("/stacks", cookies.token, id, navigate, queryClient, QueryPATH.stacks, QueryPATH.stacksMore)

  // Create and Update Logic
  function handleSubmit(e:SubmitEvent<HTMLFormElement>){
    e.preventDefault()
    const data = {name, description}
    id ? stackUpdate(data) : stackCreate(data)
  }

  // Get For Update Single info
  const { data:singleInfo = {} } = id ? GetById("stacks-more", id, cookies.token, "stacks") : {}
  useEffect(() => {
    if(singleInfo && id){
      setName(singleInfo.name)
      setDescription(singleInfo.description)
    }
  },[singleInfo])
  
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-[25px]">Stacks {id ? "update" : "create"}</h2>
        <Button loading={isPending} type="primary" htmlType="submit" icon={<SaveOutlined/>} size="large">Save</Button>
      </div>
      <div className="flex items-center justify-center flex-col gap-5 mt-10">
        <Input onChange={(e) => setName(e.target.value)} value={name} className="w-[60%]!" size="large" allowClear name="name" placeholder="Enter stack name"/>
        <TextArea onChange={(e) => setDescription(e.target.value)} value={description} rows={8} className="w-[60%]!" allowClear name="name" placeholder="Enter stack name"/>
      </div>
    </form>
  )
}

export default StackCrud