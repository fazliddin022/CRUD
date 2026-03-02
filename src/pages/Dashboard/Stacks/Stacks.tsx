import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Caption from "../../../components/Caption";
import { Button, Card, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { debounce, instance } from "../../../hooks";
import { useCookies } from "react-cookie";
import type { Stacktype } from "../../../@types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Stacks = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(["token"]);
  
  // Search
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 500)


  const { data: stacks = [], isLoading } = useQuery<Stacktype[]>({
    queryKey: ["stacks", name],
    queryFn: () =>
      instance()
        .get("/stacks", {
          headers: { Authorization: `Bearer ${cookies.token}` },
          params:{name}
        })
        .then((res) => res.data.data),
  });
  // instance logikasi korib chiqamiz
  //  Loading qandaydir ideya
  return (
    <div className="p-5">
      <Caption title="Stacks" count={stacks.length} icon={<PlusCircleOutlined />} />
      <Input onChange={e => setSearch(e.target.value)}
        className="w-75! mt-5"
        allowClear
        size="large"
        placeholder="Search by name"
      />
      <ul className="flex justify-between flex-wrap gap-5 mt-5">
        {isLoading ? "Loading..." : stacks.map((item) => (
          <Card className="border! cursor-pointer border-black!" key={item.id}
            title={item.name}
            extra={<Button onClick={() => navigate(`${item.id}`)} className="bg-transparent! border! border-black! text-black!" type="primary" icon={<MoreOutlined/>}></Button>}
            style={{ width: 300 }}
          >
            <p>{item.description}</p>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Stacks;
