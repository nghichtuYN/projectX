import React, { Suspense } from "react";
import OrderClient from "./components/OrderClient";

const OrderPage = () => {
  return (
    <div className="flex justify-center min-h-[80vh]">
      <Suspense>
        <OrderClient />
      </Suspense>
    </div>
  );
};

export default OrderPage;
