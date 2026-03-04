import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { FormatDate, QueryPATH } from "../../../components"
import { useState } from "react"
import { Delete, GetById } from "../../../services"
import { useQueryClient } from "@tanstack/react-query"

const StudentMore = () => {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])
  const queryClient = useQueryClient()
  const [deleteModal, setDeleteModal] = useState(false)

  const { data = {}, isLoading } = GetById(QueryPATH.studentMore, studentId, cookies.token, "/students")
  const { mutate: StudentDelete, isPending } = Delete("/students", cookies.token, studentId, navigate, QueryPATH.students, queryClient)

  const student = data as any

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[25px] duration-300 hover:scale-[1.2] cursor-pointer">
            <ArrowLeftOutlined />
          </button>
          <h1 className="font-bold text-[25px]">
            {isLoading ? "Loading..." : `${student.firstName ?? ""} ${student.lastName ?? ""}`}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setDeleteModal(true)} size="large" className="bg-red-500!" type="primary" icon={<DeleteFilled />} />
          <Button onClick={() => navigate("update")} icon={<EditFilled />} size="large" type="primary">Update</Button>
        </div>
      </div>

      <div className="p-5 mb-10 flex justify-between border mt-5 border-slate-400 rounded-xl w-[60%]">
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">#ID</span>
            <strong>{student.id}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">First Name</span>
            <strong>{student.firstName}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Last Name</span>
            <strong>{student.lastName}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Email</span>
            <strong>{student.email}</strong>
          </li>
        </ul>
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Phone</span>
            <strong>{student.phone}</strong>
          </li>
          <li className="flex flex-col">
  <span className="text-[10px] text-slate-400">Groups</span>
  <strong>
    {student.groups?.length 
      ? student.groups.map((g: any) => g.name).join(", ") 
      : "—"}
  </strong>
</li>
<li className="flex flex-col">
  <span className="text-[10px] text-slate-400">Stacks</span>
  <strong>
    {student.stacks?.length 
      ? student.stacks.map((s: any) => s.name).join(", ") 
      : "—"}
  </strong>
</li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Created At</span>
            <strong>{FormatDate(student.createdAt)}</strong>
          </li>
        </ul>
      </div>

      <Modal
        confirmLoading={isPending}
        onOk={() => StudentDelete()}
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        title="Do you want to delete this student?"
      />
    </div>
  )
}

export default StudentMore
