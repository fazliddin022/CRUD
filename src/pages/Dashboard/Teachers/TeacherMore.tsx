import { ArrowLeftOutlined, DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { FormatDate, QueryPATH, CustomTable } from "../../../components"
import { useState } from "react"
import { Delete, GetAll, GetById } from "../../../services"
import { useQueryClient } from "@tanstack/react-query"

const TeacherMore = () => {
  const { teacherId } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"])
  const queryClient = useQueryClient()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  // Get Single Teacher
  const { data = {}, isLoading } = GetById(QueryPATH.teacherMore, teacherId, cookies.token, "/teachers")

  // Get Teacher's Groups
  const { data: groups = [], isLoading: groupsLoading } = GetAll(
    [teacherId],
    `/teachers/${teacherId}/groups`,
    cookies.token,
    `${QueryPATH.teacherMore}-groups-${teacherId}`
  )

  // Delete Teacher
  const { mutate: TeacherDelete, isPending } = Delete(
    "/teachers",
    cookies.token,
    teacherId,
    navigate,
    QueryPATH.teachers,
    queryClient
  )

  const groupColumns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Stack", dataIndex: "stackName" },
    { title: "Status", dataIndex: "status" },
    { title: "Start Date", dataIndex: "startDateFormatted" },
    { title: "Actions", dataIndex: "actions" },
  ]

  const groupData = (groups as any[]).map((item: any, index: number) => ({
    ...item,
    key: index + 1,
    stackName: item.stack?.name ?? "—",
    startDateFormatted: FormatDate(item.startDate),
    actions: (
      <Button
        onClick={() => navigate(`/groups/${item.id}`)}
        type="primary"
        icon={<MoreOutlined />}
      />
    ),
  }))

  const teacher = data as any

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-[25px] duration-300 hover:scale-[1.2] cursor-pointer"
          >
            <ArrowLeftOutlined />
          </button>
          <h1 className="font-bold text-[25px]">
            {isLoading ? "Loading..." : `${teacher.firstName ?? ""} ${teacher.lastName ?? ""}`}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setDeleteModal(true)}
            size="large"
            className="bg-red-500!"
            type="primary"
            icon={<DeleteFilled />}
          />
          <Button
            onClick={() => navigate("update")}
            icon={<EditFilled />}
            size="large"
            type="primary"
          >
            Update
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <div className="p-5 mb-10 flex justify-between border mt-5 border-slate-400 rounded-xl w-[60%]">
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">#ID</span>
            <strong>{teacher.id}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">First Name</span>
            <strong>{teacher.firstName}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Last Name</span>
            <strong>{teacher.lastName}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Email</span>
            <strong>{teacher.email}</strong>
          </li>
        </ul>
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Phone</span>
            <strong>{teacher.phone}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Stack</span>
            <strong>{teacher.stack?.name ?? "—"}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Created At</span>
            <strong>{FormatDate(teacher.createdAt)}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Updated At</span>
            <strong>{FormatDate(teacher.updatedAt)}</strong>
          </li>
        </ul>
      </div>

      <Modal
        confirmLoading={isPending}
        onOk={() => TeacherDelete()}
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        title="Do you want to delete this teacher?"
      />

      {/* Teacher's Groups */}
      <div className="bg-slate-100 rounded-md p-5">
        <h2 className="font-bold text-[18px] mb-4">
          Groups ({(groups as any[]).length})
        </h2>
        <CustomTable loading={groupsLoading} columns={groupColumns} data={groupData} />
      </div>
    </div>
  )
}

export default TeacherMore
