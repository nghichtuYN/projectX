import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableItem = ({ id, name }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: 10,
        margin: "5px 0",
        background: "#f0f0f0",
        border: "1px solid gray",
        cursor: "grab",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {name}
    </div>
  );
};

export default DraggableItem;
