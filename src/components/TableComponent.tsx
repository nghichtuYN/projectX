"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities"; // For transform styles
import { Button } from "./ui/button";
import { GripVerticalIcon, Search, SearchX } from "lucide-react";
import NotFoundedComponent from "./NotFoundedComponent";

// Define column type
export type TableColumn<R extends Record<string, any>> = {
  key: Extract<string, string>;
  title?: string | React.ReactNode;
  renderColumn?: (row: R) => React.ReactNode;
  classname?: string;
};

// Define table props type
export type TableProps<R extends Record<string, any>> = {
  rows: R[];
  columns: TableColumn<R>[];
  className?: string;
  rowKey: Extract<keyof R, string>;
  rowClassName?: string;
  content: string;
};

// Draggable row component
const DragContentComponent = <R extends Record<string, any>>({
  row,
  columns,
  rowClassName,
}: {
  row: R;
  columns: TableColumn<R>[];
  rowClassName?: string;
}) => {
  const { attributes, setNodeRef, transform, transition, listeners } =
    useSortable({
      id: row.id ?? row.companyId ?? row.userId,
      data: { ...row },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      style={style}
      className={cn(rowClassName)}
      {...attributes}
      // {...listeners}
    >
      <TableCell className="border border-b-2">
        <Button
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          variant="ghost"
          size="icon"
          className="size-7 text-muted-foreground hover:bg-transparent"
        >
          <GripVerticalIcon className="size-3 text-muted-foreground" />
          <span className="sr-only">Drag to reorder</span>
        </Button>
      </TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.key}
          className={cn("border border-r-2 ", column.classname)}
        >
          {column.renderColumn ? column.renderColumn(row) : row[column.key]}
        </TableCell>
      ))}
    </TableRow>
  );
};

const arrayMove = <T,>(array: T[], from: number, to: number): T[] => {
  const newArray = [...array];
  const [movedItem] = newArray.splice(from, 1);
  newArray.splice(to, 0, movedItem);
  return newArray;
};

// Main table component
const TableComponent = <R extends Record<string, any>>({
  rows,
  columns,
  className,
  rowKey,
  rowClassName,
  content,
}: TableProps<R>) => {
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const [rowsToDrag, setRowsToDrag] = React.useState<R[]>(rows);
  React.useEffect(() => {
    setRowsToDrag(rows);
  }, [rows]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(event);
    if (!over?.id) return;
    if (active && over && active.id !== over.id) {
      setRowsToDrag((data) => {
        const dataIds = data.map((item) => item.id);
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }
  const handleDragStart = (event: DragEndEvent) => {
    console.log("Dragging", event.active.id);
  };
  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      id={sortableId}
    >
      <Table className={cn(className)}>
        <TableHeader>
          <TableRow>
            <TableHead className="border border-r-2 w-[30px] bg-fourthColor text-secondaryColor font-semibold"></TableHead>
            {columns?.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  column.classname,
                  "border border-r-2 bg-fourthColor text-center text-secondaryColor font-semibold"
                )}
              >
                {column.title && column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {!!rows.length ? (
          <TableBody>
            <SortableContext
              items={rowsToDrag.map((row) => row.id ?? row.companyId ?? row.userId)}
              strategy={verticalListSortingStrategy}
            >
              {rowsToDrag?.map((row) => (
                <DragContentComponent
                  key={row[rowKey]}
                  row={row}
                  columns={columns}
                  rowClassName={rowClassName}
                />
              ))}
            </SortableContext>
          </TableBody>
        ) : (
          <NotFoundedComponent
            content={content}
            columnCount={columns?.length + 1}
            icon={SearchX}
          />
        )}
      </Table>
    </DndContext>
  );
};

export default TableComponent;
