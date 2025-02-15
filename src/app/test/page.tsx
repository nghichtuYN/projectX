"use client";

import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizeable";
// import { ResizableBox } from "react-resizable"
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// Danh sách thành phần kéo vào layout
const COMPONENTS = [
  { id: "text", name: "Văn bản" },
  { id: "image", name: "Hình ảnh" },
  { id: "button", name: "Nút bấm" },
];

// Thành phần có thể kéo (từ Sidebar)
const DraggableItem = ({ id, name }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      className="bg-blue-500 mb-3"
      {...listeners}
      {...attributes}
      style={style}
    >
      {name}
    </div>
  );
};

// Vùng chứa thành phần có thể thả vào
const DroppableColumn = ({ id, components, onDrop }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      onDrop={onDrop}
      style={{
        minHeight: 60,
        border: "1px dashed gray",
        padding: 10,
        margin: 5,
        background: "#fff",
      }}
    >
      {components.map((comp, index) => (
        <div
          key={index}
          style={{
            padding: 5,
            border: "1px solid gray",
            background: "#ddd",
            marginBottom: 5,
          }}
        >
          {comp.name}
        </div>
      ))}
    </div>
  );
};

// Cột có thể chỉnh kích thước
const ResizableColumn = ({ id, width, onResize, children }) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel onResize={}>{children}</ResizablePanel>
      <ResizableHandle withHandle />
    </ResizablePanelGroup>
  );
};

// Trình chỉnh sửa layout chính
const LayoutEditor = () => {
  const [rows, setRows] = useState([
    { id: "row-1", columns: [{ id: "col-1", width: 200, components: [] }] },
  ]);

  // Thêm hàng mới
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: `row-${rows.length + 1}`,
        columns: [{ id: `col-1`, width: 200, components: [] }],
      },
    ]);
  };

  // Thêm cột vào hàng
  const addColumn = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].columns.push({
      id: `col-${updatedRows[rowIndex].columns.length + 1}`,
      width: 200,
      components: [],
    });
    setRows(updatedRows);
  };

  // Resize cột
  const updateColumnWidth = (rowIndex, colIndex, width) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].columns[colIndex].width = width;
    setRows(updatedRows);
  };

  // Xử lý khi kéo thả thành phần vào cột
  const handleDrop = (event, columnId) => {
    const componentId = event.active.data.current?.id;
    const componentName = event.active.data.current?.name;

    if (!componentId || !componentName) return;

    const newComponent = { id: componentId, name: componentName };
    const updatedRows = rows.map((row) => ({
      ...row,
      columns: row.columns.map((col) =>
        col.id === columnId
          ? { ...col, components: [...col.components, newComponent] }
          : col
      ),
    }));

    setRows(updatedRows);
  };

  return (
    <div >
      <div>
        <DndContext onDragEnd={(event) => handleDrop(event, event.over?.id)}>
          {/* Sidebar chứa thành phần kéo vào */}
          <div>
            <SortableContext items={COMPONENTS.map((comp) => comp.id)}>
              {COMPONENTS.map((component) => (
                <DraggableItem
                  key={component.id}
                  id={component.id}
                  name={component.name}
                />
              ))}
            </SortableContext>
          </div>

          {/* Khu vực chỉnh sửa layout */}
          <div>
          <button onClick={addRow} style={{ marginBottom: 10 }}>
            Thêm Hàng
          </button>

          {rows.map((row, rowIndex) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                marginBottom: 10,
                border: "1px solid blue",
                padding: 10,
              }}
            >
              {row.columns.map((col, colIndex) => (
                <ResizableColumn
                  key={col.id}
                  id={col.id}
                  width={col.width}
                  onResize={(width) =>
                    updateColumnWidth(rowIndex, colIndex, width)
                  }
                >
                  <DroppableColumn id={col.id} components={col.components} />
                </ResizableColumn>
              ))}
              <button onClick={() => addColumn(rowIndex)}>Thêm Cột</button>
            </div>
          ))}
        </div>
        </DndContext>
      </div>
      <DndContext>
        <SortableContext items={COMPONENTS.map((comp) => comp.id)}>
          {COMPONENTS.map((component) => (
            <DraggableItem
              key={component.id}
              id={component.id}
              name={component.name}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default LayoutEditor;
