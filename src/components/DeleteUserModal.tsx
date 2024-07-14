import React from "react"
import useSWR, { Fetcher } from "swr"
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
import * as api from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type DeleteSubscriptionModalProps = {
  state: ModalState;
  user_id: User["id"];
  name: string;
}

export default function DeleteUserModal ({ state, user_id, name }: DeleteSubscriptionModalProps) {

  const queryClient = useQueryClient();

  const { mutateAsync: deleteUser, isPending: isDeleteUserLoading } = useMutation({
    mutationKey: ['deleteUser', user_id],
    mutationFn: api.deleteUser,
    onSuccess(data) {
      toast({
        variant: 'default',
        title: `Successfully deleted user: ${name}`
      })
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] })
    },
    onError(err) {
      toast({
        variant: 'destructive',
        title: `Error: ${err.message}`
      })
    }
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
            This action cannot be undone. Are you sure you want to permanently delete this user?
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