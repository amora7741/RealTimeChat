import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chatLinkConstructor(userID1: string, userID2: string) {
  const sortedIDs = [userID1, userID2].sort();

  return `${sortedIDs[0]}--${sortedIDs[1]}`;
}
