`use client`;
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  Dispatch,
  useId,
} from "react";
import NavCvComponent from "./NavCvComponent";
import ToolbarCvComponent from "@/app/(create-cv)/create-cv/(component)/ToolbarCvComponent";
import { Editor } from "@tiptap/react";
import TextToolBarComponent from "./TextToolBarComponent";
import { layout } from "@/data/layout1";
import { cloneDeep, isEmpty, debounce } from "lodash";
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { FormType } from "@/types/formCvtype";
import CreateCvToolBarComponent from "./CreateCvToolBarComponent";
import CvComponent from "./CvComponent";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { generatePlaceholderContent } from "@/lib/formater";
import { ContentType } from "@/types/content";
import { ColumnType } from "@/types/Columns";
import { createPortal } from "react-dom";
import { LayoutType } from "@/types/layoutCv";
import RenderIconComponent from "./RenderIconComponent";

type CvFormContextType = {
  setActiveEditor: Dispatch<React.SetStateAction<Editor | null>>;
  layoutInstance: any;
  layout: any;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
  setLayoutInstance: React.Dispatch<React.SetStateAction<LayoutType>>;
};

export const CvFormContext = createContext<CvFormContextType>({
  setActiveEditor: () => {},
  layoutInstance: {},
  layout: {},
  form: {},
  setForm: () => {},
  handleChange: () => {},
  setLayoutInstance: () => {},
});

const CvFormComponent = () => {
  const id = useId();
  const [layoutInstance, setLayoutInstance] = useState(layout);
  const textColor = `color-mix(in srgb, ${layoutInstance.color}, black 20%)`;
  const [activeEditor, setActiveEditor] = useState<Editor | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const printRef = useRef(null);
  const [activeDragContentId, setActiveDragContentId] = useState(null);
  const [activeDragContentData, setActiveDragContentData] =
    useState<ContentType | null>(null);
  const [activeOldColumn, setActiveOldColumn] = useState<ColumnType | null>(
    null
  );
  const [form, setForm] = useState<FormType>({
    email: `<p><span style="font-size: 13 ;">hoangtroll14354@gmail.com</span></p>`,
    phone: `<p><span style="font-size: 13 ;">0123456789</span></p>`,
    social: "",
    address: "",
    avatar: "",
    name: `<p><span style="font-size: 48px; font-weight: bold;  color: ${textColor} ;">Hoàng Đặng</span></p>`,
    position: "",
    careerGoals: "",
    experiences: {
      name: `<p><span style="font-size: 18px; font-weight: bold;  color: ${textColor};">Kinh nghiệm làm việc</span></p>`,
      details: [
        {
          position: "",
          company: "",
          start: "",
          end: "",
          description: "",
        },
      ],
    },
    educations: {
      name: `<p><span style="font-size: 18px; font-weight: bold;  color: ${textColor};">Học vấn</span></p>`,
      details: [
        {
          major: "",
          school: "",
          start: "",
          end: "",
          description: "",
        },
      ],
    },
    skills: {
      name: `<p><span style="font-size: 18px; font-weight: bold;  color: ${textColor};">Kỹ năng</span></p>`,
      details: [
        {
          name: "",
          description: "",
        },
      ],
    },
    certificates: {
      name: `<p><span style="font-size: 18px; font-weight: bold;  color: ${textColor};">Chứng chỉ</span></p>`,
      details: [
        {
          name: "",
          time: "",
        },
      ],
    },
    activities: {
      name: `<p><span style="font-size: 18px; font-weight: bold; color:${textColor};">Hoạt Động</span></p>`,

      details: [
        {
          holderName: "",
          start: "",
          end: "",
          description: "",
        },
      ],
    },
    hobbies: {
      name: `<p><span style="font-size: 18px; font-weight: bold; color:${textColor};">Sở thích</span></p>`,
      details: "",
    },
    referencer: {
      name: `<p><span style="font-size: 18px; font-weight: bold; color:${textColor};">Người giới thiệu</span></p>`,
      details: [
        {
          info: "",
        },
      ],
    },
    achievements: {
      name: `<p><span style="font-size: 18px; font-weight: bold; color:${textColor};">Danh hiệu và giải thưởng</span></p>`,
      details: [
        {
          name: "",
          time: "",
        },
      ],
    },
    projects: {
      name: `<p><span style="font-size: 18px; font-weight: bold; color:${textColor};">Dự án</span></p>`,
      details: [
        {
          name_project: "",
          position: "",
          position_person: "",
          consumer: "",
          consumer_name: "",
          start: "",
          end: "",
          description_position: "",
          description_stacks: "",
          stacks: "",
          quantity: "",
          quantity_persons: "",
        },
      ],
    },
    info_bonus: {
      name: `<p><span style="font-size: 18px; font-weight: bold; color:${textColor};">Thông tin thêm</span></p>`,
      details: "",
    },
  });
  const handleChange = (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => {
    setForm((prevForm) => {
      const fieldData = prevForm[field];

      if (!subField || subField === undefined) {
        return { ...prevForm, [field]: value };
      }
      if (!fieldData || typeof fieldData !== "object") {
        return prevForm;
      }
      if (Array.isArray(fieldData.details) && typeof index === "number") {
        return {
          ...prevForm,
          [field]: {
            ...fieldData,
            details: fieldData.details.map((item, i) =>
              i === index ? { ...item, [subField]: value } : item
            ),
          },
        };
      }

      return {
        ...prevForm,
        [field]: {
          ...fieldData,
          [subField]: value,
        },
      };
    });
  };

  const handleChangeColor = (newColor: string) => {
    setLayoutInstance((prevLayout) => ({
      ...prevLayout,
      color: newColor,
    }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const selectContent = document.querySelector("[data-state='open']");

    if (
      activeEditor &&
      toolbarRef.current &&
      !toolbarRef.current.contains(event.target as Node) &&
      !activeEditor.view.dom.contains(event.target as Node) &&
      !selectContent
    ) {
      setActiveEditor(null);
    }
  };
  const findColumnByContentId = (contentId: string) => {
    return (
      layoutInstance.rows
        .flatMap((row) => row.columns)
        .find((column) =>
          column.content.some((content) => content.id === contentId)
        ) ?? null
    );
  };
  const moveContentBetweenDifferentColumns = (
    overColumn: ColumnType,
    overContentId: string,
    active: any,
    over: any,
    activeColumn: ColumnType,
    activeDragingContentId: string,
    activeDraggingContentData: any
  ) => {
    setLayoutInstance((prevLayout) => {
      const overContentIndex = overColumn.content.findIndex(
        (content: ContentType) => content.id === overContentId
      );
      let newIndex: number;

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newIndex =
        overContentIndex >= 0
          ? overContentIndex + modifier
          : overColumn?.content?.length + 1;
      const newLayoutIntance = cloneDeep(prevLayout);
      const newActiveColumn =
        newLayoutIntance.rows
          .flatMap((row) => row.columns)
          .find((col) => col.id === activeColumn?.id) || null;
      const newOverColumn =
        newLayoutIntance.rows
          .flatMap((row) => row.columns)
          .find((col) => col.id === overColumn?.id) || null;

      if (newActiveColumn) {
        newActiveColumn.content = newActiveColumn.content.filter(
          (content) => content.id !== activeDragingContentId
        );
        if (isEmpty(newActiveColumn.content)) {
          newActiveColumn.content = [
            generatePlaceholderContent(newActiveColumn),
          ];
        }
      }
      if (newOverColumn) {
        newOverColumn.content = newOverColumn?.content?.filter(
          (content) => content.id !== activeDragingContentId
        );

        newOverColumn.content = newOverColumn?.content?.toSpliced(newIndex, 0, {
          ...activeDraggingContentData,
          column_id: newOverColumn?.id,
        });
        newOverColumn.content = newOverColumn?.content?.filter(
          (content) => !content?.FE_PlaceholderContent
        );
      }
      return newLayoutIntance;
    });
  };

  const handleDragStart = (event: any) => {
    const { id, data } = event.active;
    if (id.startsWith("draggable-field-")) {
      setActiveDragContentId(id);
      setActiveDragContentData({
        ...data.current,
        id: `${data.current.type}-${Date.now()}`,
      });
      setActiveOldColumn(data.current.column_id);
    } else {
      // Dragging within layout
      setActiveDragContentId(id);
      setActiveDragContentData(data.current);
      setActiveOldColumn(findColumnByContentId(id) ?? null);
    }
  };

  const handleDragOver = debounce((event: any) => {
    const { active, over } = event;
    if (!over || !active) return;
    const {
      id: activeDragingContentId,
      data: { current: activeDraggingContentData },
    } = active;
    const { id: overContentId } = over;

    const activeColumn = findColumnByContentId(activeDragingContentId);
    const overColumn = findColumnByContentId(overContentId);

    if (!overColumn) return;

    if (
      !activeColumn &&
      overColumn &&
      activeDraggingContentData.column_id === "possible_column"
    ) {
      setLayoutInstance((prevLayout) => {
        const overContentIndex = overColumn.content.findIndex(
          (content: ContentType) => content.id === overContentId
        );
        let newIndex: number;

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex =
          overContentIndex >= 0
            ? overContentIndex + modifier
            : overColumn?.content?.length + 1;
        const newLayout = cloneDeep(prevLayout);

        const targetColumn =
          newLayout.rows
            .flatMap((row) => row.columns)
            .find((col) => col.id === overColumn.id) || null;

        if (targetColumn) {
          targetColumn.content = targetColumn?.content?.filter(
            (content) => content.id !== activeDragingContentId
          );
          targetColumn.content = targetColumn.content.toSpliced(newIndex, 0, {
            ...activeDraggingContentData,
            column_id: targetColumn.id,
            required: true,
          });

          newLayout.rows.forEach((row) =>
            row.columns.forEach((col) => {
              if (isEmpty(col.content) && col.id !== targetColumn.id) {
                col.content = [generatePlaceholderContent(col)];
              }
            })
          );
        }

        return newLayout;
      });
    }
    if (!activeColumn || !overColumn) return;
    if (activeColumn.id !== overColumn.id) {
      moveContentBetweenDifferentColumns(
        overColumn,
        overContentId,
        active,
        over,
        activeColumn,
        activeDragingContentId,
        activeDraggingContentData
      );
    }
  }, 100);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || !active) return;

    const {
      id: activeDragingContentId,
      data: { current: activeDraggingContentData },
    } = active;
    const { id: overContentId } = over;

    const activeColumn = findColumnByContentId(activeDragingContentId);
    const overColumn = findColumnByContentId(overContentId);

    if (
      !activeOldColumn &&
      overColumn &&
      activeDraggingContentData.column_id === "possible_column"
    )
      return;
    if (!activeColumn || !overColumn) return;
    if (activeOldColumn?.id !== overColumn?.id) {
      moveContentBetweenDifferentColumns(
        overColumn,
        overContentId,
        active,
        over,
        activeColumn,
        activeDragingContentId,
        activeDraggingContentData
      );
    } else {
      const oldContentIndex = activeOldColumn?.content?.findIndex(
        (content: ContentType) => content.id === activeDragContentId
      );
      const newContentIndex = overColumn?.content?.findIndex(
        (content) => content.id === overContentId
      );
      const orderedContents = arrayMove<ContentType>(
        activeOldColumn?.content,
        oldContentIndex,
        newContentIndex
      );

      setLayoutInstance((prevLayout) => {
        const newLayout = cloneDeep(prevLayout);
        const targetColum =
          newLayout.rows
            .flatMap((row) => row.columns)
            .find((col) => col.id === overColumn?.id) || null;
        if (targetColum) {
          targetColum.content = orderedContents;
        }

        return newLayout;
      });
    }

    setActiveDragContentId(null);
    setActiveDragContentData(null);
    setActiveOldColumn(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeEditor]);
  useEffect(() => {
    console.log("run1")
    return () => {
      handleDragOver.cancel();
    };
  }, []);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 25,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };
  return (
    <CvFormContext.Provider
      value={{
        setActiveEditor,
        layoutInstance,
        layout,
        form,
        setForm,
        handleChange,
        setLayoutInstance,
      }}
    >
      <div className="z-10">
        <div className="sticky top-0 z-10">
          <CreateCvToolBarComponent printRef={printRef} />

          {activeEditor !== null ? (
            <div
              ref={toolbarRef}
              className={`transition-all duration-300 ease-in-out  ${
                activeEditor
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-20px]"
              } ${
                activeEditor ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <TextToolBarComponent editor={activeEditor} />
            </div>
          ) : (
            <ToolbarCvComponent
              color={layoutInstance.color}
              handleChangeColor={handleChangeColor}
              setLayoutInstance={setLayoutInstance}
            />
          )}
        </div>
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={pointerWithin}
          id={id}
        >
          <div className="flex w-full">
            <div className="w-1/4 ">
              <div className="w-fit">
                <NavCvComponent />
              </div>
            </div>

            <CvComponent ref={printRef} layoutInstance={layoutInstance} />
            {createPortal(
              <DragOverlay
                adjustScale={false}
                dropAnimation={dropAnimation}
                modifiers={[snapCenterToCursor]}
              >
                {activeDragContentId && activeDragContentData && (
                  <div className="flex items-center gap-2 rounded-md justify-center w-fit h-fit p-2 border border-hoverColor font-medium text-white bg-secondaryColor pointer-events-none">
                    <RenderIconComponent
                      keyName={activeDragContentData?.type!}
                    />
                    {activeDragContentData?.name}
                  </div>
                )}
              </DragOverlay>,
              document.body
            )}
          </div>
        </DndContext>
      </div>
    </CvFormContext.Provider>
  );
};

export default CvFormComponent;
