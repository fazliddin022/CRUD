import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { Create, GetById, Update } from "../../../services"
import { CustomSelect, QueryPATH } from "../../../components"

const StudentCrud = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [cookies] = useCookies(["token"])
  const { studentId } = useParams()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [groupId, setGroupId] = useState<number | string | null>(null)

  const { mutate: studentCreate, isPending } = Create("/students", cookies.token, navigate, queryClient, QueryPATH.students)
  const { mutate: studentUpdate } = Update("/students", cookies.token, studentId, navigate, queryClient, QueryPATH.students, QueryPATH.studentMore)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const body: any = { firstName, lastName, email, phone, groupId }
    if (!studentId) body.password = password
    studentId ? studentUpdate(body) : studentCreate(body)
  }

  const { data: singleInfo = {} } = studentId
    ? GetById(QueryPATH.studentMore, studentId, cookies.token, "/students")
    : {}

  useEffect(() => {
    const info = singleInfo as any
    if (info && studentId) {
      setFirstName(info.firstName ?? "")
      setLastName(info.lastName ?? "")
      setEmail(info.email ?? "")
      setPhone(info.phone ?? "")
      setGroupId(info.groups?.[0]?.id ?? null)
    }
  }, [singleInfo])

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" />
          </button>
          <h2 className="font-bold text-[25px]">Student {studentId ? "update" : "create"}</h2>
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
          {!studentId && (
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} size="large" placeholder="Password" />
          )}
          <CustomSelect value={groupId} setValue={setGroupId} extraClass="w-full!" queryKey={QueryPATH.groups} requestTitle="/groups" />
        </div>
      </div>
    </form>
  )
}

export default StudentCrud
