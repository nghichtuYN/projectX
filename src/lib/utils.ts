import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
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
export const handleSelect = (
  field: any,
  isSelected: boolean,
  fieldId: string
) => {
  const currentValues = field.value || [];
  const newValues = isSelected
    ? currentValues.filter((id: string) => id !== fieldId)
    : [...currentValues, fieldId];
  field.onChange(newValues);
};
export const roles: { [key: string]: string } = {
  "employer-login": "Business",
  "employer-register": "Business",
  freelanceRecruiter: "FreelanceRecruiter",
  admin: "Admin",
  login: "Candidate",
  register: "Candidate",
};
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const handeCompanyName = (
  pathname: string,
  searchParams: string,
  router: any,
  term: string | null
) => {
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set("companyName", term);
  } else {
    params.delete("companyName");
  }
  router.replace(`${pathname}?${params.toString()}`);
};
export const getTimeSincePosted = (created: string): string => {
  // Lấy ngày hiện tại
  const currentDate = new Date(); // 19/04/2025

  // Chuyển created thành Date object
  const createdDate = new Date(created); // "2025-04-19T08:09:39.5687802"

  // Kiểm tra xem createdDate có hợp lệ không
  if (isNaN(createdDate.getTime())) {
    return "Ngày không hợp lệ";
  }

  // Tính khoảng cách thời gian (milliseconds)
  const timeDiff = currentDate.getTime() - createdDate.getTime();

  // Chuyển thành số ngày (làm tròn xuống)
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Nếu dưới 7 ngày, trả về số ngày
  if (daysDiff < 7) {
    return `Đăng ${daysDiff} ngày trước`;
  }

  // Nếu từ 7 đến dưới 30 ngày, làm tròn thành tuần
  if (daysDiff < 30) {
    const weeks = Math.round(daysDiff / 7);
    return `Đăng ${weeks} tuần trước`;
  }

  // Nếu từ 30 ngày trở lên, làm tròn thành tháng
  const months = Math.round(daysDiff / 30);
  return `Đăng ${months} tháng trước`;
};
export const getTimeSince = (created: string): string => {
  const currentDate = new Date();
  const createdDate = new Date(created);

  if (isNaN(createdDate.getTime())) {
    return "Ngày không hợp lệ";
  }

  // Cộng thêm 7 giờ (7 * 60 * 60 * 1000 milliseconds)
  createdDate.setTime(createdDate.getTime() + 7 * 60 * 60 * 1000);

  const timeDiff = currentDate.getTime() - createdDate.getTime();

  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;
  if (days < 30) return `${Math.round(days / 7)} tuần trước`;

  const months = Math.round(days / 30);
  return `${months} tháng trước`;
};
export function formatDateTime(isoString: string) {
  // Parse chuỗi ISO thành Date object
  const date = new Date(isoString);

  // Thêm 7 giờ để chuyển sang UTC+7
  date.setTime(date.getTime() + 7 * 60 * 60 * 1000);

  // Lấy ngày, tháng, năm, giờ, phút theo thời gian đã điều chỉnh
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Định dạng DD/MM/YYYY - HH:mm
  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
export const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array?.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
export const formatDateForInput = (date: Date | undefined) => {
  return date ? date.toISOString().split("T")[0] : "";
};
export function formatDate(isoString: string) {
  // Parse chuỗi ISO thành Date object
  const date = new Date(isoString);

  // Thêm 7 giờ để chuyển sang UTC+7
  date.setTime(date.getTime() + 7 * 60 * 60 * 1000);

  // Lấy ngày, tháng, năm, giờ, phút theo thời gian đã điều chỉnh
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Định dạng DD/MM/YYYY - HH:mm
  return `${day}/${month}/${year}`;
}
export function formatDateForInputTime(date:Date| undefined) {
  if (!date || isNaN(new Date(date).getTime())) {
    return ""; // Trả về chuỗi rỗng nếu date không hợp lệ hoặc undefined
  }
  return new Date(date).toISOString().slice(11, 16); // Định dạng HH:mm cho input type="time"
}