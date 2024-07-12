import React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


type TModalState = "open" | "closed"

export const useModalState = () => {
	const [state, setState] = React.useState<TModalState>("closed");
	return { state, set: setState } as const;
}

export type ModalState = ReturnType<typeof useModalState>
