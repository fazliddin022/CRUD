
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { instance } from '../../hooks';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { PATH } from '../../components';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const [,setCookie,] = useCookies(['token']);
  // query -> get useQuery
  // mutation -> post, put, , useMutation

  const LoginFn = useMutation({
    mutationFn:(data: {email:string, password:string}) => instance().post("/auth/login", data),
    onSuccess:(res) => {
      toast.success("Successfully signed!")
      console.log(res)
       setCookie("token", res.data.data.tokens.accessToken, { path: '/' })
      navigate(PATH.home)
    },
    onError:(error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed")
        return
      }
      toast.error((error as Error).message || "Login failed")
    }
  })

  const onFinish = (values: {email:string, password:string}) => {
    LoginFn.mutate(values)
  };

  return (
    <div className='h-screen bg-slate-900/50 flex items-center justify-center'>
      <Form
      className='bg-white p-5! rounded-xl'
      autoComplete='off'
      name="login"
      style={{ minWidth: 400 }}
      onFinish={onFinish} //submit
    >
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
        <Input allowClear size='large' prefix={<UserOutlined className='text-[18px] text-[#c6c6c6]!'/>} placeholder="example@gmail.com" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input.Password  allowClear size='large' prefix={<LockOutlined className='text-[18px] text-[#c6c6c6]!'/>} type="password" placeholder="******" />
      </Form.Item>
      <Form.Item>
        <Button className='bg-amber-600! font-bold' size='middle' block type="primary" htmlType="submit">Log in </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;