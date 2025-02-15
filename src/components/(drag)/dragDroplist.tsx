'use client'
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";
import DroppableColumn from "./DroppableColumn";

const INITIAL_LEFT = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
];

const INITIAL_RIGHT = [
  { id: "3", name: "Item 3" },
  { id: "4", name: "Item 4" },
];

const DragAndDropList = () => {
  const [leftItems, setLeftItems] = useState(INITIAL_LEFT);
  const [rightItems, setRightItems] = useState(INITIAL_RIGHT);
  const [activeItem, setActiveItem] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveItem(event.active.data.current);
      }}
      onDragOver={(event) => {
        if (!event.over) return;

        const overList = event.over.id.startsWith("left") ? leftItems : rightItems;
        const overIndex = overList.findIndex((item) => item.id === event.over.id);

        // setPlaceholderIndex(overIndex >= 0 ? overIndex : overList.length);
      }}
      onDragEnd={(event) => {
        if (!event.over) return;

        const sourceList = leftItems.find((i) => i.id === event.active.id)
          ? leftItems
          : rightItems;
        const targetList = event.over.id.startsWith("left") ? leftItems : rightItems;

        if (sourceList !== targetList) {
          // Chuyển item từ list này sang list khác
          setLeftItems((prev) => prev.filter((i) => i.id !== event.active.id));
          setRightItems((prev) => prev.filter((i) => i.id !== event.active.id));

          if (event.over.id.startsWith("left")) {
            setLeftItems([...targetList, activeItem]);
          } else {
            setRightItems([...targetList, activeItem]);
          }
        } else {
          // Sắp xếp lại trong cùng danh sách
          const oldIndex = sourceList.findIndex((item) => item.id === event.active.id);
          const newIndex = sourceList.findIndex((item) => item.id === event.over.id);

          if (event.over.id.startsWith("left")) {
            setLeftItems(arrayMove(leftItems, oldIndex, newIndex));
          } else {
            setRightItems(arrayMove(rightItems, oldIndex, newIndex));
          }
        }

        setActiveItem(null);
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Cột Trái */}
        <SortableContext items={leftItems} strategy={verticalListSortingStrategy}>
          <DroppableColumn id="left-drop" items={leftItems} />
        </SortableContext>

        {/* Cột Phải */}
        <SortableContext items={rightItems} strategy={verticalListSortingStrategy}>
          <DroppableColumn id="right-drop" items={rightItems} />
        </SortableContext>
      </div>

      <DragOverlay>
        {activeItem ? <DraggableItem id={activeItem.id} name={activeItem.name} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragAndDropList;
