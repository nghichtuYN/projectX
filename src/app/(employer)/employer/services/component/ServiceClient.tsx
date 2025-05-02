"use client";
import { Info, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ServiceClient = () => {
  return (
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container mx-auto px-4 py-6">
        {/* Alert Banner */}
        <Alert className="border-l-4 border-l-blue-500 bg-white mb-6">
          <div className="flex gap-2">
            <Info className="w-6 h-6 text-blue-600" />
            <AlertTitle className="text-blue-600 font-bold text-base">
              Lưu ý quan trọng
            </AlertTitle>
          </div>
          <AlertDescription className="text-gray-700 text-sm">
            Nhằm tránh rủi ro mạo danh và lừa đảo, ProjectX khuyến nghị Quý
            khách hàng không chuyển khoản vào bất cứ tài khoản cá nhân nào và
            chỉ thực hiện thanh toán vào các tài khoản chính thức của chúng tôi
          </AlertDescription>
        </Alert>

        {/* Main Title */}
        <div className="mb-4">
          <h2 className="text-xl font-medium text-secondaryColor">
            X JOBS TRIAL |{" "}
            <span className="text-gray-800">ĐĂNG TIN TUYỂN DỤNG</span>
          </h2>
          <p className="text-gray-700 mt-1">
            Trải nghiệm công hưởng sức mạnh công nghệ tạo ra hiệu quả đột phá
            cho tin tuyển dụng của Doanh nghiệp với chi phí tối ưu
          </p>
          {/* <p className="text-red-500">
            Nhà tuyển dụng sẽ chỉ được mua và kích hoạt duy nhất 1 gói Top Job
            Trial
          </p> */}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* TOP MAX TRIAL */}
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold text-gray-800">X MAX TRIAL</h3>
              <p className="text-2xl font-bold text-secondaryColor">
                2.887.500 VND<span className="text-red-500">*</span>
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm font-medium">
                Trải nghiệm đăng tin tuyển dụng hiệu quả với vị trí nổi bật
                trong Việc làm tốt nhất kết hợp cùng các dịch vụ cao cấp, giá
                đúng thứ hạng dẫn.
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1 bg-secondaryColor hover:bg-secontext-secondaryColor text-white">
                Mua ngay
              </Button>
            </CardFooter>
          </Card>

          {/* TOP PRO TRIAL */}
        </div>

        {/* Bottom Section */}
        <div>
          <h2 className="text-xl font-medium">
            <span className="text-secondaryColor text-xl font-normal">
              X ADD - ON
            </span>{" "}
            |{" "}
            <span className="text-gray-800 text-xl font-medium">
              DỊCH VỤ CỘNG THÊM
            </span>
          </h2>
          <p className="text-gray-700 mt-1 text-sm font-medium leading-5">
            Thêm tuỳ chọn giúp tin tuyển dụng nổi bật hơn với ứng viên. Dịch vụ
            chỉ được áp dụng cho tin đang chạy dịch vụ X Jobs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold text-[18px] text-gray-800">
                ADD-ON LABEL: GẤP
              </h3>
              <p className="text-2xl font-bold text-secondaryColor">
                1.000.000 VND<span className="text-red-500">*</span>
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm font-medium">
                Tin tuyển dụng được gán nhán
                <span className="text-red-500 leading-6"> GẤP </span>
                lên tiêu đề tin
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1 bg-secondaryColor hover:bg-secontext-secondaryColor text-white">
                Mua ngay
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold text-gray-800">
                ADD-ON LABEL: HOT
              </h3>
              <p className="text-2xl font-bold text-secondaryColor">
                1.000.000 VND<span className="text-red-500">*</span>
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm font-medium">
                Tin tuyển dụng được gán nhán
                <span className="text-orange-500 leading-6"> HOT </span>
                lên tiêu đề tin
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1 bg-secondaryColor hover:bg-secontext-secondaryColor text-white">
                Mua ngay
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceClient;
