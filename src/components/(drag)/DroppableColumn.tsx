import DraggableItem from "./DraggableItem";

const DroppableColumn = ({ id, items }) => {
  return (
    <div
      style={{
        width: "200px",
        minHeight: "150px",
        padding: 10,
        border: "2px dashed gray",
        background: "#fff",
      }}
    >
      {items.map((item) => (
        <DraggableItem key={item.id} id={item.id} name={item.name} />
      ))}
    </div>
  );
};

export default DroppableColumn;
