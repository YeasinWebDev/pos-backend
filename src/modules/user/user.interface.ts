export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Waiter" | "kitchen" | "Cashier";
  image: string;
}
