import React, { useContext } from "react";
import { RenderComponent } from "./RenderComponent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Move, MoveDown, MoveUp, Trash } from "lucide-react";
import { CvFormContext } from "./CvFormComponent";
import { arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { ContentType } from "@/types/content";
import { cloneDeep } from "lodash";

type Props = {
  content: any;
  index: number;
  length: number;
  contents: any;
};
const ContentComponent = ({ content, index, contents, length }: Props) => {
  const context = useContext(CvFormContext);
  const { handleChange, layoutInstance, setLayoutInstance } = context;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: content.id,
    data: { ...content },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    backgroundColor: !content.FE_PlaceholderContent
      ? `${layoutInstance.color}`
      : "",
    height: "100%",
  };
  const style1: React.CSSProperties = {
    opacity: content.FE_PlaceholderContent ? 0 : 1,
  };

  const handleMoveUp = () => {
    const orderedContents = arrayMove<ContentType>(contents, index, index - 1);
    setLayoutInstance((prevLayout) => {
      const newLayout = cloneDeep(prevLayout);
      const targetColum =
        newLayout.rows
          .flatMap((row) => row.columns)
          .find((col) => col.id === content?.column_id) || null;
      if (targetColum) {
        targetColum.content = orderedContents;
      }

      return newLayout;
    });
  };
  const handleMoveDown = () => {
    const orderedContents = arrayMove<ContentType>(contents, index, index + 1);
    setLayoutInstance((prevLayout) => {
      const newLayout = cloneDeep(prevLayout);
      const targetColum =
        newLayout.rows
          .flatMap((row) => row.columns)
          .find((col) => col.id === content?.column_id) || null;
      if (targetColum) {
        targetColum.content = orderedContents;
      }

      return newLayout;
    });
  };
  const handleDelete = () => {
    setLayoutInstance((prevLayout) => {
      const newRows = prevLayout.rows.map((row) => {
        // Bước 1: Cập nhật content trong các cột
        const newColumns = row.columns.map((column) => {
          // Nếu cột chứa content cần xóa
          if (column.content.some((c) => c.id === content.id)) {
            // Lọc bỏ content
            const newContent = column.content.filter(
              (c) => c.id !== content.id
            );
            return {
              ...column,
              content: newContent,
            };
          }
          return column;
        });

        // Bước 2: Lọc các cột trống (content.length === 0)
        const filteredColumns = newColumns.filter(
          (col) => col.content.length > 0
        );

        // Bước 3: Chỉ cập nhật width nếu có cột bị xóa
        const adjustedColumns = filteredColumns.map((col) => {
          // Nếu số cột giảm đi (tức là có cột bị xóa), cập nhật width
          if (filteredColumns.length < row.columns.length) {
            return {
              ...col,
              width: Math.floor(100 / filteredColumns.length).toString(),
            };
          }
          // Ngược lại, giữ nguyên width cũ
          return col;
        });

        return {
          ...row,
          columns: adjustedColumns,
        };
      });

      // Bước 4: Lọc các row trống
      const filteredRows = newRows.filter((row) => row.columns.length > 0);

      return {
        ...prevLayout,
        rows: filteredRows,
      };
    });
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={cn(
        "text-sm relative group/content rounded-md h-full flex items-center justify-center w-full"
      )}
    >
      {!content?.type ? (
        <div
          style={style1}
          className="w-full h-28 flex items-center justify-center"
        ></div>
      ) : (
        <RenderComponent type={content?.type} handleChange={handleChange} />
      )}

      {!content?.FE_PlaceholderContent && (
        <div className="absolute -top-8 left-2 rounded-t-md group-hover/content:bg-hoverColor  group-hover/content:flex group-hover/content:items-center gap-2 p-1 hidden">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger {...listeners} asChild>
                <div className="p-1 bg-secondaryColor rounded-md">
                  <Move className="w-4 h-4 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Kéo thả để di chuyển mục</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {index > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleMoveUp} asChild>
                  <div className="p-1 bg-secondaryColor rounded-md">
                    <MoveUp className="w-4 h-4 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Di chuyển lên trên</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {index < length - 1 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleMoveDown} asChild>
                  <div className="p-1 bg-secondaryColor rounded-md">
                    <MoveDown className="w-4 h-4 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Di chuyển xuống dưới</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {content?.required && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleDelete}>
                  <div className="p-1 bg-red-500 rounded-md">
                    <Trash className="w-4 h-4 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xóa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentComponent;
