import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEnvVar(name: string) {
  // if unknown env var, throw error
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
  return process.env[`process.env.NEXT_PUBLIC_${name}`];
}
