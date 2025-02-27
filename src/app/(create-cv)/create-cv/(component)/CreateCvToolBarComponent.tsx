"use client";
import React from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ArrowDownToLine, Eye, Save } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
const CreateCvToolBarComponent = ({ printRef }) => {
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    // Cập nhật tất cả các thẻ <img> trong element để bypass cache
    const images = element.querySelectorAll("img");
    console.log(images);
    images.forEach((img) => {
      const src = img.src;
      if (src) img.src = `${src}?date=${Date.now()}`;
    });

    // Đợi một chút để ảnh tải lại trước khi chụp
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Chụp element thành canvas sau khi ảnh đã tải lại
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    // Khởi tạo jsPDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a5",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProperties = pdf.getImageProperties(data);
    const imgWidth = imgProperties.width;
    const imgHeight = imgProperties.height;

    const scale = pdfWidth / imgWidth;
    const scaledHeight = imgHeight * scale;
    const totalPages = Math.ceil(scaledHeight / pdfHeight);

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage();
      const offsetY = i * pdfHeight;
      pdf.addImage(data, "PNG", 0, -offsetY, pdfWidth, scaledHeight);
    }

    pdf.save("examplepdf.pdf");
  };

  return (
    <div className="bg-white w-full pl-3 pr-3 h-16 mx-auto flex items-center gap-4 justify-between">
      <Input
        placeholder="CV chưa đặt tên"
        className="placeholder:text-sm w-[300px]"
      />
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm sm:px-4 px-2"
        >
          <Eye className="w-4 h-4 mr-2" />
          Xem trước
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm sm:px-4 px-2"
          onClick={handleDownloadPdf}
        >
          <ArrowDownToLine className="w-4 h-4 mr-2" />
          Lưu và tải xuống
        </Button>
        <Button size="sm" className="text-xs sm:text-sm sm:px-4 px-2">
          <Save className="w-4 h-4 mr-2" />
          Lưu lại
        </Button>
      </div>
    </div>
  );
};

export default CreateCvToolBarComponent;
