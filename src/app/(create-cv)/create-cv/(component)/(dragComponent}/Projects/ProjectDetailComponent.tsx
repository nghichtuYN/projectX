import { useEditorHook } from "@/hooks/useEditorHook";
import { cn, moveElement, removeElement } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { EditorContent } from "@tiptap/react";
import { Minus } from "lucide-react";
import OptionsButtonComponent from "../OptionsButtonComponent";
type Props = {
  project: any;
  index: number;
  length: number;
  handleChange: (
    field: keyof FormType,
    value: string,
    subField?: string,
    index?: number
  ) => void;
  handleAdd: () => void;
};
const ProjectDetailComponent = ({
  project,
  index,
  handleChange,
  handleAdd,
  length,
}: Props) => {
  const context = useContext(CvFormContext);

  const { setActiveEditor, setForm } = context;
  const { editor: editorStart } = useEditorHook(
    project.start,
    "Bắt đầu",
    "projects",
    handleChange,
    "start",
    index
  );

  const { editor: editorEnd } = useEditorHook(
    project.end,
    "Kết thúc",
    "projects",
    handleChange,
    "end",
    index
  );
  const { editor: editorNameProject } = useEditorHook(
    project.name_project,
    "Tên dự án",
    "projects",
    handleChange,
    "name_project",
    index
  );
  const { editor: editorPosition } = useEditorHook(
    project.position,
    "Vị trí",
    "projects",
    handleChange,
    "position",
    index
  );
  const { editor: editorPositionPerson } = useEditorHook(
    project.position_person,
    "Vị trí của bạn trong dự án",
    "projects",
    handleChange,
    "position_person",
    index
  );
  const { editor: editorDescriptionPosition } = useEditorHook(
    project.description_position,
    "Mô tả vai trò, trách nhiệm của bạn trong dự án",
    "projects",
    handleChange,
    "description_position",
    index
  );

  const { editor: editorConsumer } = useEditorHook(
    project.consumer,
    "Khách hàng",
    "projects",
    handleChange,
    "consumer",
    index
  );
  const { editor: editorConsumerName } = useEditorHook(
    project.consumer_name,
    "Tên khách hàng",
    "projects",
    handleChange,
    "consumer_name",
    index
  );

  const { editor: editorDescriptionStacks } = useEditorHook(
    project.description_stacks,
    "Mô tả công nghệ bạn sử dụng",
    "projects",
    handleChange,
    "description_stacks",
    index
  );
  const { editor: editorStacks } = useEditorHook(
    project.stacks,
    "Công nghệ sử dụng",
    "projects",
    handleChange,
    "stacks",
    index
  );
  const { editor: editorQuantity } = useEditorHook(
    project.quantity,
    "Số lượng",
    "projects",
    handleChange,
    "quantity",
    index
  );
  const { editor: editorQuantityPersons } = useEditorHook(
    project.quantity_persons,
    "Số lượng người tham gia",
    "projects",
    handleChange,
    "quantity_persons",
    index
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      projects: {
        ...prevForm.projects,
        details: moveElement(prevForm.projects.details, index, index - 1),
      },
    }));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      projects: {
        ...prevForm.projects,
        details: moveElement(prevForm.projects.details, index, index + 1),
      },
    }));
  };
  const handleDelete = () => {
    setForm((prevForm: FormType) => ({
      ...prevForm,
      projects: {
        ...prevForm.projects,
        details: removeElement(prevForm.projects.details, index),
      },
    }));
  };
  return (
    <div className="border-b group/detail relative flex items-start h-auto w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2">
      <div className="w-1/3 flex flex-col gap-4">
        <div className="flex items-center gap-2 justify-start w-full h-auto">
          <div
            onFocus={() => {
              setActiveEditor(editorStart);
            }}
            className={cn(
              "border rounded p-1 w-1/3 h-auto",
              !editorStart?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorStart?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorStart} />
          </div>
          <div>
            <Minus />
          </div>
          <div
            onFocus={() => setActiveEditor(editorEnd)}
            className={cn(
              "border rounded p-1 w-1/3 h-auto ",
              !editorEnd?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorEnd?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorEnd} />
          </div>
        </div>
        <div className="mb-2 h-auto">
          <div
            onFocus={() => setActiveEditor(editorNameProject)}
            className={cn(
              "border rounded p-1 h-auto",
              !editorNameProject?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorNameProject?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorNameProject} />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-start w-full h-auto">
          <div
            onFocus={() => setActiveEditor(editorConsumer)}
            className={cn(
              "border rounded p-1 h-auto",
              !editorConsumer?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorConsumer?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorConsumer} />
          </div>

          <div
            onFocus={() => setActiveEditor(editorConsumerName)}
            className={cn(
              "border rounded p-1 h-auto",
              !editorConsumerName?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorConsumerName?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorConsumerName} />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-start w-full h-auto">
          <div
            onFocus={() => setActiveEditor(editorQuantityPersons)}
            className={cn(
              "border rounded p-1 w-1/2 h-auto",
              !editorQuantityPersons?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorQuantityPersons?.isFocused &&
                "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorQuantityPersons} />
          </div>

          <div
            onFocus={() => setActiveEditor(editorQuantity)}
            className={cn(
              "border rounded p-1 w-1/2 ",
              !editorQuantity?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorQuantity?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorQuantity} />
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col gap-2 h-auto">
        <div className="flex items-center gap-2 justify-start w-full h-auto">
          <div
            onFocus={() => setActiveEditor(editorPosition)}
            className={cn(
              "border rounded p-1",
              !editorPosition?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorPosition?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorPosition} />
          </div>
          <div
            onFocus={() => setActiveEditor(editorPositionPerson)}
            className={cn(
              "border rounded p-1",
              !editorPositionPerson?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorPositionPerson?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorPositionPerson} />
          </div>
        </div>
        <div className="mb-2 h-auto">
          <div
            onFocus={() => setActiveEditor(editorDescriptionPosition)}
            className={cn(
              "border rounded p-1 h-auto",
              !editorDescriptionPosition?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorDescriptionPosition?.isFocused &&
                "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorDescriptionPosition} />
          </div>
        </div>
        <div className="mb-2 h-auto">
          <div
            onFocus={() => setActiveEditor(editorStacks)}
            className={cn(
              "border rounded p-1 h-auto",
              !editorStacks?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorStacks?.isFocused && "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorStacks} />
          </div>
        </div>
        <div className="mb-2 h-auto">
          <div
            onFocus={() => setActiveEditor(editorDescriptionStacks)}
            className={cn(
              "border rounded p-1 h-auto",
              !editorDescriptionStacks?.isFocused &&
                "hover:border-dashed hover:border-secondaryColor",
              editorDescriptionStacks?.isFocused &&
                "border-solid border-green-500"
            )}
          >
            <EditorContent editor={editorDescriptionStacks} />
          </div>
        </div>
      </div>
      <OptionsButtonComponent
        index={index}
        length={length}
        handleAdd={handleAdd}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProjectDetailComponent;
