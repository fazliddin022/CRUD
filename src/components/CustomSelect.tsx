import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { instance } from "../hooks";
import type { FC } from "react";
import { useCookies } from "react-cookie";

interface CustomSelectType {
  extraClass?: string;
  requestTitle: "/teachers" | "/students" | "/groups" | "/rooms";
  id?:string
}

const CustomSelect: FC<CustomSelectType> = ({ extraClass, requestTitle, id }) => {
  const [cookies] = useCookies(["token"]);
  const { data = [] } = useQuery({
    queryKey: ["teachers-select", id],
    queryFn: () => instance(cookies.token).get(requestTitle, {
        params:id ? {stackId:id} : {}
        // filter params o'zgarishi mumkin
    }).then((res) => res.data.data.map((item:any) => {
        const data = {
            label: requestTitle == "/teachers" || requestTitle == "/students" ? `${item.firstName} ${item.lastName}` : `${item.name}`,
            value: item.id
        }
        return data
    })),
  });
  console.log(data)

  return (
    <Select
      className={`w-70! ${extraClass}`}
      allowClear
      size="large"
      showSearch={{ optionFilterProp: "label" }}
      placeholder={`Choose ${requestTitle.split("").splice(1).join("")}`}
      options={data}
    />
  );
};

export default CustomSelect;
