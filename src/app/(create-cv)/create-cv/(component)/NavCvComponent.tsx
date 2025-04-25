import React, { useContext } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/navCvItems";
import CvTemplateComponent from "./CvTemplateComponent";
import { LayoutType } from "@/types/layoutCv";
import { CvFormContext } from "./CvFormComponent";
import { ContentType } from "@/types/content";
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RenderIconComponent from "./RenderIconComponent";
import { allPossibleFields } from "@/data/CvElement";
import { Info, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NavCvComponent = () => {
  const { layoutInstance } = useContext(CvFormContext);
  const [activeContent, setActiveContent] = useState<string>("");
  const getFieldsFromLayout = (
    layoutInstance: LayoutType,
    allFields: ContentType[]
  ) => {
    const usedFields: ContentType[] = [];
    layoutInstance.rows.forEach((row) => {
      row.columns.forEach((column) => {
        column.content.forEach((content) => {
          if (content.type) {
            usedFields.push(content);
          }
        });
      });
    });

    const unusedFields = allFields.filter((field) => {
      return !usedFields.some(
        (usedField) => usedField.type === field.type && field.type
      );
    });

    return { usedFields, unusedFields };
  };
  const { usedFields, unusedFields } = getFieldsFromLayout(
    layoutInstance,
    allPossibleFields
  );
  const handleNavClick = (content: string) => {
    setActiveContent(activeContent === content ? "" : content);
  };

  const SortableField = ({ field }: { field: ContentType }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: field.id,
      data: { ...field },
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : undefined,
      height: "100%",
    };
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-2  flex items-center gap-2 border rounded cursor-move hover:border-hoverColor bg-gray-100 hover:bg-secondaryColor hover:text-white"
      >
        <RenderIconComponent keyName={field.type!} />
        {field.name}
      </div>
    );
  };
  return (
    <div className="flex h-fit md:scale-[0.5] lg:scale-100 scale-[0.4]  origin-top-left ">
      {/* Sidebar Navigation */}
      <div className="w-[92px] flex flex-col items-center justify-start py-4 gap-2">
        {navItems.map((item) => (
          <div
            key={item.title}
            className={cn(
              "w-[85px] h-[85px]  cursor-pointer flex flex-col group justify-center rounded-lg items-center space-y-1 hover:bg-secondaryColor hover:text-white bg-white",
              "text-center px-2",
              activeContent === item.content && "bg-secondaryColor text-white"
            )}
            onClick={() => handleNavClick(item.content)}
          >
            <item.icon
              size={24}
              className={cn(
                "text-secondaryColor group-hover:text-white",
                activeContent === item.content && " text-white"
              )}
            />
            <p className="text-xs font-medium text-center leading-tight break-normal whitespace-normal select-none">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Side Panel for Navigation Content */}
      <div
        className={cn(
          "w-0 bg-white transition-all duration-300 overflow-hidden ",
          activeContent && "w-[340px] "
        )}
      >
        {activeContent && (
          <div className="w-[340px] h-[500px]">
            <div
              className={cn(
                "p-4 flex items-center justify-between",
                activeContent && "border-b"
              )}
            >
              <h2 className="text-lg font-semibold">
                {navItems.find((item) => item.content === activeContent)?.title}
              </h2>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => setActiveContent("")}
              >
                <X />
              </Button>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="p-4">
                {activeContent === "sections" && (
                  <div className="flex flex-col">
                    <div>
                      <h3 className="font-medium mb-2">Mục chưa sử dụng</h3>
                      <div className="space-y-2">
                        <SortableContext
                          items={unusedFields?.map((field) => field?.id)}
                          strategy={horizontalListSortingStrategy}
                        >
                          {unusedFields &&
                            unusedFields.map((field) => (
                              <SortableField key={field.id} field={field} />
                            ))}
                        </SortableContext>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Mục đã sử dụng</h3>
                      <div className="space-y-2">
                        {usedFields.map((field) => (
                          <div
                            key={field?.id}
                            className="p-2 flex items-center gap-2 border rounded hover:text-black text-gray-500 bg-gray-50"
                          >
                            <RenderIconComponent keyName={field.type!} />
                            {field.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeContent === "guide" && (
                  <Card>
                    <CardHeader className="flex flex-col gap-2 mb-3">
                      <CardTitle>Cách viết</CardTitle>
                      <CardDescription>
                        CV cơ bản cần có thông tin cá nhân, kỹ năng, học vấn và
                        kinh nghiệm làm việc. Lưu ý ghi rõ tên bạn vào tiêu đề
                        khi tải CV về máy.
                      </CardDescription>
                      <CardDescription className="flex items-center gap-2 rounded-lg  text-sm">
                        <Info className="h-4 w-4  text-secondaryColor" />
                        <p
                          title="Một số lỗi sai thường gặp:"
                          className="line-clamp-1 text-ellipsis"
                        >
                          Một số lỗi sai thường gặp:
                        </p>
                      </CardDescription>
                      <CardDescription>
                        <p>
                          • Mục tiêu nghề nghiệp chung chung "tìm kiếm cơ hội",
                          "thăng tiến", "phát triển bản thân".
                        </p>
                        <p>• Thiếu thông tin kỹ năng trong CV.</p>
                        <p>
                          • Kinh nghiệm làm việc hoặc hoạt động chưa có kết quả
                          thể hiện bằng con số.
                        </p>
                        <p>
                          • Kinh nghiệm làm việc chưa sắp xếp từ gần nhất đến xa
                          nhất.
                        </p>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

    </div>
  );
};

export default NavCvComponent;
