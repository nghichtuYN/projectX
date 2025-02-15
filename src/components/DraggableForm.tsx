// "use client";

// import { useState } from "react";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   type DropResult,
// } from "@hello-pangea/dnd";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Plus, Trash2, Move } from "lucide-react";

// interface Field {
//   id: string;
//   label: string;
//   type: string;
// }

// const initialFields: Field[] = [
//   { id: "1", label: "Name", type: "text" },
//   { id: "2", label: "Email", type: "email" },
//   { id: "3", label: "Phone", type: "tel" },
// ];

// const DraggableForm = () => {
//   const [fields, setFields] = useState<Field[]>(initialFields);

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;

//     const reorderedFields = Array.from(fields);
//     const [removed] = reorderedFields.splice(result.source.index, 1);
//     reorderedFields.splice(result.destination.index, 0, removed);

//     setFields(reorderedFields);
//   };

//   const addField = (index: number) => {
//     const newField: Field = {
//       id: `${fields.length + 1}`,
//       label: `Field ${fields.length + 1}`,
//       type: "text",
//     };
//     const newFields = [...fields];
//     newFields.splice(index + 1, 0, newField);
//     setFields(newFields);
//   };

//   const removeField = (id: string) => {
//     setFields(fields.filter((field) => field.id !== id));
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="form">
//         {(provided) => (
//           <form
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             className="space-y-4"
//           >
//             {fields.map((field, index) => (
//               <Draggable key={field.id} draggableId={field.id} index={index}>
//                 {(provided, snapshot) => (
//                   <div
//                     className="group relative hover:border-secondaryColor hover:border-2"
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                   >
//                     <div
//                       {...provided.dragHandleProps}
//                       className="hidden group-hover:flex z-50 absolute -top-8 -left-4 right-0 p-2"
//                     >
//                       <Move className="h-3 w-4 text-gray-400 cursor-pointer" />
//                       <div className="flex space-x-2">
//                         <Plus
//                           className="h-5 w-5 text-gray-400 cursor-pointer"
//                           onClick={() => addField(index)}
//                         />
//                         <Trash2
//                           className="h-5 w-5 text-gray-400 cursor-pointer"
//                           onClick={() => removeField(field.id)}
//                         />
//                       </div>
//                     </div>
//                     <Card className=" ">
//                       <CardContent>
//                         {snapshot.isDragging ? (
//                           <Label>Dragging {field.label}</Label>
//                         ) : (
//                           <>
//                             <Label>{field.label}</Label>
//                             <Input type={field.type} />
//                           </>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//             <Button type="submit" variant="secondary" className="w-full mt-4">
//               Submit
//             </Button>
//           </form>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default DraggableForm;
