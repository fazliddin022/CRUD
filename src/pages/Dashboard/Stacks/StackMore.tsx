import {
  ArrowLeftOutlined,
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal,  } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { CustomSelect, CustomTable, FormatDate, QueryPATH } from "../../../components";
import { useEffect, useState } from "react";
import { Delete, GetAll, GetById } from "../../../services";

const StackMore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient()

  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  // Get Single Data 
  const { data = {}, isLoading } = GetById(QueryPATH.stacksMore, id , cookies.token, "/stacks") 

  // Delete part
  const {mutate:StackDelete, isPending} = Delete("/stacks", cookies.token, id, navigate, QueryPATH.stacks, queryClient)

  // Stack by group part
  const columns = [
    {
      title: 'ID',
      dateIndex: 'id'
    },
    {
      title: 'Name',
      dateIndex: 'name'
    },
    {
      title: 'Stacks name',
      dateIndex: 'stackName'
    },
    {
      title: 'Teacher name',
      dateIndex: 'teacherName'
    },
    {
      title: 'Status',
      dateIndex: 'status'
    },
    {
      title: 'Actions',
      dateIndex: 'actions'
    },
  ]
  const {data:stackByGroups = [], isLoading:groupsLoading} = GetAll([id], "/groups", cookies.token, QueryPATH.groups, {stackId:id})
  // const [groups, setGroups] = useState<any>([])
  // useEffect(() => {
  //   if(stackByGroups){
  //     setGroups(stackByGroups.map((item) => {
  //       item.stackName = item.stack.name
  //       item.teacherName = `${item.teacher.firstName} ${item.teacher.lastName}`
  //       return item
  //     }))
  //   }
  // },[stackByGroups])
  
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
            {isLoading ? "Loading..." : data.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setDeleteModal(true)} size="large" className="bg-red-500!" type="primary" icon={<DeleteFilled />}></Button>
          <Button onClick={() => navigate('update')} size="large" type="primary" icon={<EditFilled />}>
            Update
          </Button>
        </div>
      </div>
      <div className="p-5 flex justify-between border mt-5 border-slate-400 rounded-xl w-[50%]">
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">#ID</span>
            <strong>{data.id}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Name</span>
            <strong>{data.name}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Description</span>
            <strong>{data.description}</strong>
          </li>
        </ul>
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Create At</span>
            <strong>{FormatDate(data.createdAt)}</strong>
          </li>
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Updated At</span>
            <strong>{FormatDate(data.updatedAt)}</strong>
          </li>
        </ul>
      </div>
      <Modal confirmLoading={isPending} onOk={() => StackDelete()} open={deleteModal} onCancel={() => setDeleteModal(false)} title="Do you want to delete!"></Modal>

      {/* Stack by groups */}
      <div className="bg-slate-200 p-5 rounded-md mt-10">
        <h2 className="text-[20px] font-bold mb-2">{data.name} / groups</h2>
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-3">
            <Input className="w-70!" size="large" allowClear placeholder="Search group by name"/>
            <CustomSelect id={id} requestTitle="/teachers" />
          </div>
          <Button size="large" icon={<PlusCircleOutlined />} type="primary">
            Create Group
          </Button>
        </div>
        <CustomTable loading={groupsLoading} columns={columns} data={[]}/>
      </div>
    </div>
  );
};

export default StackMore;
