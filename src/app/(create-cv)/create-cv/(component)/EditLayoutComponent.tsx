import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../components/ui/sheet";
import { Button } from "../../../../components/ui/button";
import { ArrowBigDown, PanelsTopLeft, Plus, X } from "lucide-react";
import { CvFormContext } from "./CvFormComponent";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizeable";
import { generatePlaceholderContent } from "@/lib/formater";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type Props = {
  setLayoutInstance: (layout: any) => void;
};
const EditLayoutComponent = ({ setLayoutInstance }: Props) => {
  const context = useContext(CvFormContext);
  const { layoutInstance } = context;
  console.log(layoutInstance);
  const [layoutInstane, setLayoutInstane] = useState(layoutInstance);
  useEffect(() => {
    setLayoutInstane(layoutInstance);
  }, [layoutInstance]);

  const handleAddRow = () => {
    const rowid = `row-${Date.now()}`;
    const newRow = {
      id: rowid,
      columns: [
        {
          id: `col-${Date.now()}`,
          width: "100",
          content: [generatePlaceholderContent({ id: rowid })],
        },
      ],
    };
    setLayoutInstane((prevLayout: any) => ({
      ...prevLayout,
      rows: [...prevLayout.rows, newRow],
    }));
  };
  const handleAddColumn = (rowId: string) => {
    setLayoutInstane((prevLayout: any) => ({
      ...prevLayout,
      rows: prevLayout.rows.map((row: any) => {
        if (row.id === rowId) {
          const newColumnCount = row.columns.length + 1;
          const newColumnWidth = 100 / newColumnCount;

          return {
            ...row,
            columns: [
              ...row.columns.map((col: any) => ({
                ...col,
                width: newColumnWidth.toString(),
              })),
              {
                id: `col-${Date.now()}`,
                width: newColumnWidth.toString(),
                content: [generatePlaceholderContent({ id: rowId })],
              },
            ],
          };
        }
        return row;
      }),
    }));
  };

  const handleRemoveColumn = (rowId: string) => {
    setLayoutInstane((prevLayout: any) => ({
      ...prevLayout,
      rows: prevLayout.rows
        .map((row: any) => {
          if (row.id === rowId) {
            if (row.columns.length === 1) {
              return null;
            }

            const updatedColumns = row.columns.slice(0, -1);
            const newColumnWidth = 100 / updatedColumns.length;

            return {
              ...row,
              columns: updatedColumns.map((col: any) => ({
                ...col,
                width: newColumnWidth.toString(),
              })),
            };
          }
          return row;
        })
        .filter(Boolean),
    }));
  };

  const handleResize = (size: number, rowId: string, colId: string) => {
    setLayoutInstane((prevLayout: any) => ({
      ...prevLayout,
      rows: prevLayout.rows.map((row: any) =>
        row.id === rowId
          ? {
              ...row,
              columns: row.columns.map((col: any) =>
                col.id === colId ? { ...col, width: size } : col
              ),
            }
          : row
      ),
    }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="text-secondaryColor outline-secondaryColor border-secondaryColor"
        >
          <PanelsTopLeft />
          Tùy chỉnh bố cục
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle>Bố cục CV</SheetTitle>
          <SheetDescription>Tùy chỉnh bố cục</SheetDescription>
        </SheetHeader>
        {layoutInstane?.rows.map((row: any) => (
          <div
            key={row.id}
            className="rounded-lg border max-h-[68px] mb-3 group hover:border-2 hover:border-gray-500 hover:border-dashed relative"
          >
            <ResizablePanelGroup direction="horizontal">
              {row.columns?.map((col: any, index: number) => (
                <Fragment key={col.id}>
                  <ResizablePanel
                    defaultSize={parseInt(col.width, 10)}
                    className="h-full z-0"
                    onResize={(size) => handleResize(size, row.id, col.id)}
                  >
                    <div className="flex flex-col h-16 w-full items-center gap-1 justify-center p-2">
                      {col.content.map((item: any) => (
                        <div
                          key={item.id}
                          className="text-sm bg-accent h-full flex items-center justify-center w-full"
                        >
                          {!item?.FE_PlaceholderContent && <p>{item.name}</p>}
                        </div>
                      ))}
                    </div>
                  </ResizablePanel>
                  {index < row.columns.length - 1 && (
                    <ResizableHandle withHandle />
                  )}
                  <div className="absolute -right-3 top-1/2  -translate-y-1/2 gap-3 p-1  group-hover:flex group-hover:flex-col hidden">
                    <div className="bg-green-600 rounded-3xl">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            className="w-4 h-4 z-50 text-white hover:text-black cursor-pointer"
                            onClick={() => handleAddColumn(row.id)}
                            asChild
                          >
                            <Plus />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Thêm cột</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="bg-red-600 rounded-3xl">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            className="w-4 h-4 z-50 text-white hover:text-black cursor-pointer"
                            onClick={() => handleRemoveColumn(row.id)}
                            asChild
                          >
                            <X />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {row.columns.length === 1
                                ? "Xóa hàng"
                                : "Xóa cột ngoài cùng bên phải"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </Fragment>
              ))}
            </ResizablePanelGroup>
          </div>
        ))}
        <div className="w-full flex items-center justify-center">
          <Button onClick={handleAddRow}>Thêm hàng</Button>
        </div>

        <SheetFooter className="flex items-center justify-end gap-4">
          <SheetClose asChild>
            <Button>Hủy</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={() => setLayoutInstance(layoutInstane)}>
              Lưu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditLayoutComponent;
