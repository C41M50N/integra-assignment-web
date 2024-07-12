
import { User } from "@/types";
import wretch from "wretch";

const API = wretch("http://localhost:8080", { mode: "cors" });

export async function getAllUsers() {
  return (await API.url('/users').get().json()) as Array<User>;
}

export async function 

export async function deleteUser(user_id: number) {
  await API.url(`/${user_id}`).delete().res();
}
