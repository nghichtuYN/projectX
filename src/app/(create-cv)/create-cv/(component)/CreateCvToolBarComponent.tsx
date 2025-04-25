"use client";
import React, { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
type Props = {
  printRef: any;
};
const CreateCvToolBarComponent = ({ printRef }: Props) => {
  const [nameCv, setNameCv] = useState("");

  // const handleDownloadPdf = async () => {
  //   const element = printRef.current;
  //   if (!element) return;

  //   const images = element.querySelectorAll("img");
  //   images.forEach((img: any) => {
  //     const src = img.src;
  //     if (src) img.src = `${src}?date=${Date.now()}`;
  //   });

  //   await new Promise((resolve) => setTimeout(resolve, 500));

  //   const canvas = await html2canvas(element, { scale: 2 });
  //   const data = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "px",
  //     format: "a5",
  //   });

  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();
  //   const imgProperties = pdf.getImageProperties(data);
  //   const imgWidth = imgProperties.width;
  //   const imgHeight = imgProperties.height;

  //   const scale = pdfWidth / imgWidth;
  //   const scaledHeight = imgHeight * scale;
  //   const totalPages = Math.ceil(scaledHeight / pdfHeight);

  //   for (let i = 0; i < totalPages; i++) {
  //     if (i > 0) pdf.addPage();
  //     const offsetY = i * pdfHeight;
  //     pdf.addImage(data, "PNG", 0, -offsetY, pdfWidth, scaledHeight);
  //   }

  //   pdf.save(`${nameCv ? nameCv : "exampleCV"}.pdf`);
  // };
  // const handleDownloadPdf = async () => {
  //   const element = printRef.current;
  //   if (!element) return;

  //   // Xử lý ảnh
  //   const images = element.querySelectorAll("img");
  //   images.forEach((img: any) => {
  //     const src = img.src;
  //     if (src) img.src = `${src}?date=${Date.now()}`;
  //   });

  //   await new Promise((resolve) => setTimeout(resolve, 500));

  //   const canvas = await html2canvas(element, {
  //     scale: 1.2,
  //     useCORS: true,
  //     logging: false, // Tắt logging để cải thiện hiệu suất
  //     allowTaint: true
  //   });

  //   // Dùng JPEG thay vì PNG, điều chỉnh chất lượng (0.7-0.9)
  //   const data = canvas.toDataURL("image/jpeg", 0.85);

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm", // Dùng mm thay vì px
  //     format: "a5",
  //     compress: true
  //   });

  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const imgProperties = pdf.getImageProperties(data);
  //   const imgWidth = pdfWidth;
  //   const imgHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  //   let heightLeft = imgHeight;
  //   let position = 0;
  //   let pageHeight = pdf.internal.pageSize.getHeight();

  //   pdf.addImage(data, 'JPEG', 0, position, imgWidth, imgHeight);
  //   heightLeft -= pageHeight;

  //   // Thêm các trang tiếp theo nếu cần
  //   while (heightLeft >= 0) {
  //     position = heightLeft - imgHeight;
  //     pdf.addPage();
  //     pdf.addImage(data, 'JPEG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //   }

  //   pdf.save(`${nameCv ? nameCv : "exampleCV"}.pdf`);
  // };
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    // Lấy tất cả ảnh
    const images = element.querySelectorAll(
      "img"
    ) as NodeListOf<HTMLImageElement>;
    const loadPromises = Array.from(images).map(
      (img) =>
        new Promise((resolve, reject) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.onload = () => resolve(null);
            img.onerror = () =>
              reject(new Error(`Failed to load image: ${img.src}`));
          }
        })
    );

    try {
      await Promise.all(loadPromises);

      const canvas = await html2canvas(element, {
        scale: 1.2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const data = canvas.toDataURL("image/jpeg", 0.85);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProperties = pdf.getImageProperties(data);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      let heightLeft = imgHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(data, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(data, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${nameCv || "exampleCV"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Không thể tạo PDF do lỗi tải ảnh.");
    }
  };
  return (
    <div className="bg-white w-full pl-3 pr-3 h-16 mx-auto flex items-center gap-4 justify-between">
      <Input
        placeholder="CV chưa đặt tên"
        className="placeholder:text-sm w-[300px]"
        onChange={(e) => setNameCv(e.target.value)}
      />
      <Button
        variant="outline"
        size="sm"
        className="text-xs sm:text-sm sm:px-4 px-2"
        onClick={handleDownloadPdf}
      >
        <ArrowDownToLine className="w-4 h-4 mr-2" />
        Lưu và tải xuống
      </Button>
    </div>
  );
};

export default CreateCvToolBarComponent;
