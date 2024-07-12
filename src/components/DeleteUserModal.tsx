import React from "react"
import useSWR from "swr"
import { IconTrash } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { ModalState } from "@/lib/utils"
import { User } from "@/types"

type DeleteSubscriptionModalProps = {
  state: ModalState;
  user_id: User["id"];
}

export default function DeleteUserModal ({ state, user_id }: DeleteSubscriptionModalProps) {

  const { mutate: deleteUser, isLoading: isDeleteUserLoading } = useSWR('deleteUser', () => {}, {
    onSuccess() {
      toast({})
    },
  });

  async function onSubmit() {
    await deleteUser(user_id)
    state.set("closed")
  }

  return (
    <Dialog open={state.state === "open" ? true : false} onOpenChange={(open) => !open && state.set("closed")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this user from the server?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant={"destructive"} isLoading={isDeleteUserLoading} onClick={onSubmit} className="gap-1">
            <IconTrash size={20} strokeWidth={1.75} />
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}