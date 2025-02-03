import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Phone } from "lucide-react";

const RuleRegisterComponent = () => {
  return (
    <Accordion
      defaultValue="item-1"
      type="single"
      className="w-2/3 border-secondaryColor outline-secondaryColor mt-3"
      collapsible
    >
      <AccordionItem
        className=" border-secondaryColor outline-secondaryColor"
        value="item-1"
      >
        <AccordionTrigger className="border-secondaryColor outline-secondaryColor text-secondaryColor font-semibold">
          <h1 className="text-xl">Quy định</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-5 text-md pl-3 pt-2">
          <p>
            Để đảm bảo chất lượng dịch vụ, ProjectX{" "}
            <span className="text-red-500">
              không cho phép một người dùng tạo nhiều tài khoản khác nhau.
            </span>
          </p>
          <p>
            Nếu phát hiện vi phạm, ProjectX sẽ ngừng cung cấp dịch vụ tới tất cả
            các tài khoản trùng lặp hoặc chặn toàn bộ truy cập tới hệ thống
            website của ProjectX.
          </p>
          <p>
            Sau khi đăng ký tài khoản nhà tuyển dụng (NTD) và cung cấp các thông
            tin cần thiết, NTD có thể được hỗ trợ hiển thị tin tuyển dụng cơ bản
            (standard), ngoại trừ một số vị trí nhất định. Số lượng tin đăng và
            cách thức hiển thị phụ thuộc vào quy định của ProjectX tại từng thời
            điểm.
          </p>
          <p>Mọi thắc mắc vui lòng liên hệ Hotline CSKH:</p>
          <div className="flex gap-16 items-center">
            <span className="flex items-center gap-2 font-semibold text-secondaryColor">
              <Phone className="bg-accent rounded-sm" /> 0972045499
            </span>
            <span className="flex items-center gap-2 font-semibold text-secondaryColor">
              <Phone className="bg-accent rounded-sm" /> 0972045499
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RuleRegisterComponent;
