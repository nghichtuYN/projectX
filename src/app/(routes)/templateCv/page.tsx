"use client";
import CVPreviewDialogComponent from "@/app/(create-cv)/create-cv/(component)/CVPreviewDialogComponent";
import { templates } from "@/data/template";
import { Eye, SquarePen } from "lucide-react";
import Image from "next/image";
import React from "react";

const TemplateCvPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-primaryColor">
        <section className=" mx-auto py-8 px-4 bg-primaryColor h-60">
          banner
        </section>
      </div>
      <div className="w-3/4 pt-3 pb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="group relative">
            <div className="relative overflow-hidden bg-white rounded-lg shadow-lg transform perspective-1000 hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[3/4]  transform hover:scale-105 transition-transform duration-500">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className=" absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute z-50 bottom-0 left-0 right-0 flex justify-center gap-4 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <CVPreviewDialogComponent
                    content={{ maniContent: "Xem mẫu", icon: Eye }}
                  />
                  <CVPreviewDialogComponent
                    content={{ maniContent: "Dùng mẫu này", icon: SquarePen }}
                  />
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="mt-4 flex items-center gap-2">
              {template.tags.map((tag, index) => (
                <span key={index} className="text-sm text-gray-600">
                  {tag}
                  {index < template.tags.length - 1 && " •"}
                </span>
              ))}
              <span className="text-sm text-blue-500">{template.score}</span>
            </div>
            <h3 className="mt-2 text-lg font-medium">{template.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateCvPage;
