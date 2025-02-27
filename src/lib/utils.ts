import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function moveElement<T>(
  arr: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  if (toIndex < 0 || toIndex >= arr.length) return arr;
  const newArr = [...arr];
  const [movedElement] = newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, movedElement);
  return newArr;
}
export function removeElement<T>(arr: T[], index: number): T[] {
  if (index < 0) return arr;
  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
}
