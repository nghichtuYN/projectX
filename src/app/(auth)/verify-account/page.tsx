import { Suspense } from "react";
import VerifyAccountClient from "./VerifyAccountClient";

const VerifyAccountPage = () => {
  return (
    <Suspense>
      <VerifyAccountClient />;
    </Suspense>
  );
};

export default VerifyAccountPage;
