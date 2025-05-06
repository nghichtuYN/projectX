export type PaymentMethod = {
  labels: string;
  value: number;
};
export const PaymentMethod: PaymentMethod[] = [
  {
    labels: "SePay",
    value: 1,
  },
  {
    labels: "VnPay",
    value: 0,
  },
];
