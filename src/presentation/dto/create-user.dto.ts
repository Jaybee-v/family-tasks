export interface CreateUserDto {
  name: string;
  password: string;
  role: "ADMIN" | "USER";
}
