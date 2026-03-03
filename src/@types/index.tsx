export interface Stacktype {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface TeacherType {
  id:number,
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  stackId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
