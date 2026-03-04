import { ArrowLeftOutlined, DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Modal } from "antd"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Delete, GetById } from "../../../services"
import { CustomTable, FormatDate, QueryPATH } from "../../../components"

const GroupMore = () => {
    const { groupId } = useParams()
    const navigate = useNavigate()
    const [cookies] = useCookies(["token"])
    const queryClient = useQueryClient()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    const { data = {}, isLoading } = GetById(QueryPATH.groupMore, groupId, cookies.token, "/groups")
    const { mutate: GroupDelete, isPending } = Delete("/groups", cookies.token, groupId, navigate, QueryPATH.groups, queryClient)

    const group = data as any
    const students: any[] = group?.students ?? []

    const studentColumns = [
        { title: "ID", dataIndex: "id" },
        { title: "First Name", dataIndex: "firstName" },
        { title: "Last Name", dataIndex: "lastName" },
        { title: "Email", dataIndex: "email" },
        { title: "Phone", dataIndex: "phone" },
        { title: "Actions", dataIndex: "actions" },
    ]

    const studentData = students.map((item: any, index: number) => ({
        ...item,
        key: index + 1,
        actions: (
            <Button
                onClick={() => navigate(`/students/${item.id}`)}
                type="primary"
                icon={<MoreOutlined />}
            />
        ),
    }))

    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="text-[25px] duration-300 hover:scale-[1.2] cursor-pointer">
                        <ArrowLeftOutlined />
                    </button>
                    <h1 className="font-bold text-[25px]">{isLoading ? "loading..." : group.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setDeleteModal(true)} size="large" className="bg-red-500!" type="primary" icon={<DeleteFilled />} />
                    <Button onClick={() => navigate("update")} icon={<EditFilled />} size="large" type="primary">Update</Button>
                </div>
            </div>

            <div className="p-5 mb-10 flex justify-between border mt-5 border-slate-400 rounded-xl w-[50%]">
                <ul className="flex flex-col gap-5">
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">#ID</span>
                        <strong>{group.id}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Name</span>
                        <strong>{group.name}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Stack name</span>
                        <strong>{group?.stack?.name}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Teacher name</span>
                        <strong>{group?.teacher?.firstName} {group?.teacher?.lastName}</strong>
                    </li>
                </ul>
                <ul className="flex flex-col gap-5">
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Start Date</span>
                        <strong>{FormatDate(group.startDate)}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">End Date</span>
                        <strong>{FormatDate(group.endDate)}</strong>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400">Status</span>
                        <strong>{group.status}</strong>
                    </li>
                </ul>
            </div>

            <Modal
                confirmLoading={isPending}
                onOk={() => GroupDelete()}
                open={deleteModal}
                onCancel={() => setDeleteModal(false)}
                title="Do you want to delete this group?"
            />

            <div className="bg-slate-100 rounded-md p-5">
                <h2 className="font-bold text-[18px] mb-4">
                    Students in this group ({students.length})
                </h2>
                <CustomTable loading={isLoading} columns={studentColumns} data={studentData} />
            </div>
        </div>
    )
}

export default GroupMore
