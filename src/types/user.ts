export type UserRole = "Admin" | "Doctor" | "Nurse" | "Patient" | "Support";
export type UserDepartment =
  | "Cardiology"
  | "Neurology"
  | "General"
  | "Emergency"
  | "Admin";
export type UserStatus = "active" | "inactive" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: UserDepartment;
  status: UserStatus;
  avatar: string;
  joinedAt: string;
  lastActive: string;
  phone: string;
  location: string;
}
