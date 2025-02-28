"use client";
import React, { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ArrowDownToLine, Eye } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
type Props = {
  printRef: any;
};
const CreateCvToolBarComponent = ({ printRef }: Props) => {
  const [nameCv, setNameCv] = useState("");

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    const images = element.querySelectorAll("img");
    images.forEach((img: any) => {
      const src = img.src;
      if (src) img.src = `${src}?date=${Date.now()}`;
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

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

    pdf.save(`${nameCv ? nameCv : "exampleCV"}.pdf`);
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
