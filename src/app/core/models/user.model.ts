export interface User {
  id: number,
  token: string;
  login: string,
  password: string,
  avatar: string,
  firstName: string,
  birthday: Date,
  email: string,
  phone: string,
  registerAt: Date,
  lastVisitAt: Date,
  updatedAt: Date
}
