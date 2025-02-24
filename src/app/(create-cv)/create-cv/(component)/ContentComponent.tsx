import React, { useContext } from "react";
import { RenderComponent } from "./RenderComponent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Move, MoveDown } from "lucide-react";
import { CvFormContext } from "./CvFormComponent";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
type Props = {
  content: any;
};
const ContentComponent = ({ content }: Props) => {
  const context = useContext(CvFormContext);
  const { handleChange, layoutInstance } = context;
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
    transform: CSS.Transform.toString(transform),
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
        >
        </div>
      ) : (
        <RenderComponent type={content?.type} handleChange={handleChange} />
      )}

      {!content?.FE_PlaceholderContent && (
        <div className="absolute -top-4 left-2 rounded-t-md group-hover/content:w-14 bg-secondaryColor  group-hover/content:flex group-hover/content:justify-center  -translate-y-1/2  p-2 hidden">
          <div className="bg-secondaryColor w-fit flex items-center justify-center z-40 gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger {...listeners}>
                  <Move className="w-4 h-4 text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Kéo thả để di chuyển mục</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MoveDown className="w-4 h-4 text-white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Kéo thả để di chuyển mục</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentComponent;
