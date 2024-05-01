import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



import * as jose from 'jose';

export async function getUserFromToken(token) {
  try {
    const privateKey = 'sdasrsvjnfjgfgroejregler'; 
    const { payload } = await jose.jwtVerify(
      token, new TextEncoder().encode(privateKey)
    );
    return payload.email;

  } catch (error) {
    
    
    return null;
  }
}