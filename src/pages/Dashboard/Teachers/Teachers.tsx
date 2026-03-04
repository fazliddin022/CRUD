import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { debounce } from "../../../hooks"
import { useCookies } from "react-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetAll } from "../../../services"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"

const Teachers = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])
  const [search, setSearch] = useState<string>("")
  const [stackId, setStackId] = useState<number | string | null>(null)
  const name = debounce(search, 500)

  const { data: teachers = [], isLoading } = GetAll(
    [name, stackId],
    "/teachers",
    cookies.token,
    QueryPATH.teachers,
    { name, stackId }
  )

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Stack", dataIndex: "stackName" },
    { title: "Actions", dataIndex: "actions" },
  ]

  const data = (teachers as any[]).map((item: any, index: number) => ({
    ...item,
    key: index + 1,
    stackName: item.stack?.name ?? "—",
    actions: (
      <Button
        onClick={() => navigate(String(item.id))}
        type="primary"
        icon={<MoreOutlined />}
      />
    ),
  }))

  return (
    <div className="p-5">
      <Caption title="Teachers" count={teachers.length} icon={<PlusCircleOutlined />} />
      <div className="flex gap-3 my-5">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="w-70!"
          size="large"
          allowClear
          placeholder="Search by name"
        />
        <CustomSelect
          value={stackId}
          setValue={setStackId}
          queryKey={QueryPATH.stacks}
          requestTitle="/stacks"
        />
      </div>
      <CustomTable loading={isLoading} columns={columns} data={data} />
    </div>
  )
}

export default Teachers
