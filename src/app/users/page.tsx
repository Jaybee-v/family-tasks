import { findAllUsers } from "@/infrastructure/actions/user.actions";
import React from "react";

export default async function UsersPage() {
  const users = await findAllUsers();

  console.log(users);
  return <div>UsersPage</div>;
}
