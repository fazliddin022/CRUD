import {
  ArrowLeftOutlined,
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, Select } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../hooks";
import { FormatDate } from "../../../components";
import CustomSelect from "../../../components/CustomSelect";

const StackMore = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["stacks-more"],
    queryFn: () =>
      instance(cookies.token)
        .get(`/stacks/${id}`)
        .then((res) => res.data.data),
  });

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
          <Button
            size="large"
            className="bg-red-500!"
            type="primary"
            icon={<DeleteFilled />}
          ></Button>
          <Button size="large" type="primary" icon={<EditFilled />}>
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
      <div className="bg-slate-200 p-5 rounded-md mt-10">
        <h2 className="text-[20px] font-bold mb-2">{data.name} / groups</h2>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Input className="w-70!" size="large" allowClear placeholder="Search group by name"/>
            <CustomSelect id={id} requestTitle="/teachers" />
          </div>
          <Button size="large" icon={<PlusCircleOutlined />} type="primary">
            Create Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StackMore;
