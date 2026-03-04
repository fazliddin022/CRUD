import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { Create, GetById, Update } from "../../../services"
import { CustomSelect, QueryPATH } from "../../../components"

const TeacherCrud = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [cookies] = useCookies(["token"])
  const { teacherId } = useParams()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [stackId, setStackId] = useState<number | string | null>(null)

  const { mutate: teacherCreate, isPending } = Create("/teachers", cookies.token, navigate, queryClient, QueryPATH.teachers)
  const { mutate: teacherUpdate } = Update("/teachers", cookies.token, teacherId, navigate, queryClient, QueryPATH.teachers, QueryPATH.teacherMore)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const body: any = { firstName, lastName, email, phone, stackId }
    if (!teacherId) body.password = password
    teacherId ? teacherUpdate(body) : teacherCreate(body)
  }

  const { data: singleInfo = {} } = teacherId ? GetById(QueryPATH.teacherMore, teacherId, cookies.token, "/teachers") : {}

  useEffect(() => {
    const info = singleInfo as any
    if (info && teacherId) {
      setFirstName(info.firstName ?? "")
      setLastName(info.lastName ?? "")
      setEmail(info.email ?? "")
      setPhone(info.phone ?? "")
      setStackId(info.stack?.id ?? null)
    }
  }, [singleInfo])

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" />
          </button>
          <h2 className="font-bold text-[25px]">Teacher {teacherId ? "update" : "create"}</h2>
        </div>
        <Button loading={isPending} type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">Save</Button>
      </div>
      <div className="flex justify-center gap-5 mt-10">
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} size="large" allowClear placeholder="First name" />
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} size="large" allowClear placeholder="Last name" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} size="large" allowClear placeholder="Email" type="email" />
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} size="large" allowClear placeholder="Phone" />
          {!teacherId && (
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} size="large" placeholder="Password" />
          )}
          <CustomSelect value={stackId} setValue={setStackId} extraClass="w-full!" queryKey={QueryPATH.stacks} requestTitle="/stacks" />
        </div>
      </div>
    </form>
  )
}

export default TeacherCrud
