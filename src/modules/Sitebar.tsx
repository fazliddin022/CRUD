import {AppleOutlined,HomeOutlined,PieChartOutlined,UserAddOutlined,UsergroupAddOutlined,UserOutlined,} from '@ant-design/icons';
import { Menu } from 'antd';
import { PATH } from '../components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/Context';

const items = [
  { key: '1', icon: <PieChartOutlined />, label:<Link to={PATH.home}>Stacks</Link> },
  { key: '2', icon: <UsergroupAddOutlined />, label: <Link to={PATH.groups}>Groups</Link> },
  { key: '3', icon: <UserOutlined />, label: <Link to={PATH.teachers}>Teachers</Link> },
  { key: '4', icon: <UserAddOutlined/>, label: <Link to={PATH.students}>Students</Link> },
  { key: '5', icon: <HomeOutlined/>, label: <Link to={PATH.rooms}>Rooms</Link> }
];

const SiteBar = () => {
  const {collapsed} = useContext(Context)
  return (
    <div className={`${collapsed ? "w-[7.5%]" : "w-[22%]"} duration-300 h-screen bg-[#031529]`}>
    <div className={`text-white border-b border-white py-3 flex ${collapsed ? "justify-center" : "pl-4"} items-center gap-2`}>
      <AppleOutlined className='text-[40px]'/>
      {!collapsed && <h1 className='font-bold'>Windows</h1>}
    </div>
      <Menu
      className='w-full'
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed }
      items={items}
      />
      </div>
  );
};

export default SiteBar;