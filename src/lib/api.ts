
import { User } from "@/types";
import wretch, { WretchResponse } from "wretch";

const API = wretch("http://localhost:8081", { mode: "cors" });

export async function getAllUsers() {
  const res = await API.url('/users').get().res();
  handleError(res)
  return (await res.json()) as Array<User>;
}

type AddUserProps = {
  first_name: string;
  last_name: string;
  department: string;
}
export async function addUser(data: AddUserProps) {
  const res = await API.url(`/users`).json(data).post().res();
  await handleError(res)
}

type EditUserProps = Omit<User, 'user_name'>;
export async function editUser(data: EditUserProps) {
  const res = await API.url(`/users/${data.id}`).json(data).put().res();
  await handleError(res)
}

export async function deleteUser(user_id: number) {
  const res = await API.url(`/users/${user_id}`).delete().res();
  await handleError(res)
}

async function handleError(res: WretchResponse) {
  if (!res.ok) {
    return new Error(await res.text())
  }
}
