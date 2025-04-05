import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// cn serve para aplicar um estilo de forma dinamica
// clsx adiciona condição para o estilo de forma facilitada
// twMerge aplica o estilo sem precisar de "!important"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
