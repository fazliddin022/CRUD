import { Route, Routes } from "react-router-dom";
import { PATH } from "../components";
import {
  DashboardHome,
  GroupMore,
  Groups,
  GroupsCrud,
  Rooms,
  StackCrud,
  StackMore,
  Stacks,
  Teachers,
  TeacherMore,
  TeacherCrud,
  Students,
  StudentMore,
  StudentCrud,
} from "../pages";
import { Header, Sitebar } from "../modules";
import { useContext } from "react";
import { Context } from "../context/Context";

const DashboardRoute = () => {
  const { collapsed } = useContext(Context);
  const list = [
    { id: 1, path: PATH.home, element: <DashboardHome /> },
    { id: 2, path: PATH.stacks, element: <Stacks /> },
    { id: 3, path: PATH.stacksMore, element: <StackMore /> },
    { id: 4, path: PATH.stacksCreate, element: <StackCrud /> },
    { id: 5, path: PATH.stacksUpdate, element: <StackCrud /> },
    { id: 6, path: PATH.groups, element: <Groups /> },
    { id: 7, path: PATH.groupsCreate, element: <GroupsCrud /> },
    { id: 8, path: PATH.stacksCreateByGroup, element: <GroupsCrud /> },
    { id: 9, path: PATH.groupsMore, element: <GroupMore /> },
    { id: 10, path: PATH.groupsUpdate, element: <GroupsCrud /> },
    { id: 11, path: PATH.rooms, element: <Rooms /> },
    { id: 12, path: PATH.teachers, element: <Teachers /> },
    { id: 13, path: PATH.teachersMore, element: <TeacherMore /> },
    { id: 14, path: PATH.teachersCreate, element: <TeacherCrud /> },
    { id: 15, path: PATH.teachersUpdate, element: <TeacherCrud /> },
    { id: 16, path: PATH.students, element: <Students /> },
    { id: 17, path: PATH.studentsMore, element: <StudentMore /> },
    { id: 18, path: PATH.studentsCreate, element: <StudentCrud /> },
    { id: 19, path: PATH.studentsUpdate, element: <StudentCrud /> },
  ];
  return (
    <div className="flex">
      <Sitebar />
      <div
        className={`${collapsed ? "w-full" : "w-[78%]"}  duration-300 h-screen overflow-y-auto`}
      >
        <Header />
        <Routes>
          {list.map((item) => (
            <Route key={item.id} path={item.path} element={item.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardRoute;
