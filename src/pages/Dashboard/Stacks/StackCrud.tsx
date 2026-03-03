import { SaveOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import { use, useState, type SubmitEvent } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

const StackCrud = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['token'])
  const {id} = useParams()
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  
  const {mutate:stackCreate, isPending} = useMutation({
    mutationFn:(body:{name:string, description:string}) => instance(cookies.token).post("/stacks", body),
    onSuccess:() => {
      toast.success("Succesfully created!")
      setTimeout(() => {
        navigate(-1)
        queryClient.invalidateQueries({queryKey:['stacks']})
      }, 1000)
    },
    onError:(err) => toast.error(err.message)
  })

  function handleSubmit(e:SubmitEvent<HTMLFormElement>){
    e.preventDefault()
    const data = {name, description}
    stackCreate(data)
  }
  
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