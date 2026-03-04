import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { debounce } from "../../../hooks"
import { useCookies } from "react-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetAll } from "../../../services"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"

const Students = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])
  const [search, setSearch] = useState("")
  const [stackId, setStackId] = useState<number | string | null>(null)
  const [teacherId, setTeacherId] = useState<number | string | null>(null)
  const name = debounce(search, 500)

  const { data: students = [], isLoading } = GetAll(
    [name, stackId, teacherId],
    "/students",
    cookies.token,
    QueryPATH.students,
    { name, stackId, teacherId }
  )

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Actions", dataIndex: "actions" },
  ]

  const data = (students as any[]).map((item: any, index: number) => ({
    ...item,
    key: index + 1,
    actions: (
      <Button onClick={() => navigate(String(item.id))} type="primary" icon={<MoreOutlined />} />
    ),
  }))

  return (
    <div className="p-5">
      <Caption title="Students" count={students.length} icon={<PlusCircleOutlined />} />
      <div className="flex gap-3 my-5 flex-wrap">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="w-70!"
          size="large"
          allowClear
          placeholder="Search by name"
        />
        <CustomSelect value={stackId} setValue={setStackId} queryKey={QueryPATH.stacks} requestTitle="/stacks" />
        <CustomSelect value={teacherId} setValue={setTeacherId} queryKey={QueryPATH.teachers} requestTitle="/teachers" />
      </div>
      <CustomTable loading={isLoading} columns={columns} data={data} />
    </div>
  )
}

export default Students
