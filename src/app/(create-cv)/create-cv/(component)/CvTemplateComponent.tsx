import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/data/templateCv";
import Image from "next/image";

const CvTemplateComponent = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
        >
          <CardContent className="p-3">
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-center mt-2 font-medium">{template.title}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CvTemplateComponent;
