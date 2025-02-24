"use client";
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
import { cloneDeep, isEmpty } from "lodash";
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
import { FormType } from "@/types/fromCvtype";
import CreateCvToolBarComponent from "./CreateCvToolBarComponent";
import CvComponent from "./CvComponent";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { generatePlaceholderContent } from "@/lib/formater";
import { ContentType } from "@/types/content";
import { ColumnType } from "@/types/Columns";
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
};

export const CvFormContext = createContext<CvFormContextType>({
  setActiveEditor: () => {},
  layoutInstance: {},
  layout: {},
  form: {},
  setForm: () => {},
  handleChange: () => {},
});

const CvFormComponent = () => {
  const id = useId();
  const [layoutInstance, setLayoutInstance] = useState(layout);
  const textColor = `color-mix(in srgb, ${layoutInstance.color}, black 20%)`;
  const [activeEditor, setActiveEditor] = useState<Editor | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState<FormType>({
    email: `<p><span style="font-size: 13 ;">hoangtroll14354@gmail.com</span></p>`,
    phone: "0123456789",
    social: "",
    address: "",
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
    education: {
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
  });
  const [activeDragContentId, setActiveDragContentId] = useState(null);
  const [activeDrageCotentData, setActiveDrageCotentData] =
    useState<ContentType | null>(null);
  const [activeOldColumn, setActiveOldColumn] = useState<any | null>(null);
  const handleChange = (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => {
    setForm((prevForm) => {
      const fieldData = prevForm[field];

      // Nếu field không tồn tại hoặc không phải object, trả về prevForm
      if (!fieldData || typeof fieldData !== "object") {
        return prevForm;
      }

      // Nếu không có subField, cập nhật giá trị trực tiếp
      if (!subField) {
        return { ...prevForm, [field]: value };
      }

      // Nếu là mảng (có index), cập nhật item trong mảng
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

      // Nếu là object (không phải mảng), cập nhật subField trong object
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
    return layoutInstance.rows
      .flatMap((row) => row.columns)
      .find((column) =>
        column.content.some((content) => content.id === contentId)
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

      console.log("newOverColumn", newOverColumn);
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
  const handelDragStart = (event: any) => {
    setActiveDragContentId(event.active?.id);
    setActiveDrageCotentData(event.active?.data?.current);
    setActiveOldColumn(findColumnByContentId(event.active.id) ?? null);
  };
  const handeDragOver = (event: any) => {
    const { active, over } = event;
    if (!over || !active) return;
    const {
      id: activeDragingContentId,
      data: { current: activeDraggingContentData },
    } = active;
    const { id: overContentId } = over;
    const activeColumn = findColumnByContentId(activeDragingContentId);
    const overColumn = findColumnByContentId(overContentId);

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
  };
  const handelDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || !active) return;

    const {
      id: activeDragingContentId,
      data: { current: activeDraggingContentData },
    } = active;

    const { id: overContentId } = over;
    const activeColumn = findColumnByContentId(activeDragingContentId);
    const overColumn = findColumnByContentId(overContentId);
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
        (content: any) => content.id === activeDragContentId
      );
      const newContentIndex =
        overColumn?.content?.findIndex(
          (content) => content.id === overContentId
        ) ?? -1;
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
          targetColum.content = orderedContents ?? [];
        }

        return newLayout;
      });
    }
    setActiveDragContentId(null);
    setActiveDrageCotentData(null);
    setActiveOldColumn(null);
  };
  console.log()
  useEffect(() => {
    // console.log(form)
  }, [layoutInstance]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeEditor]);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
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
      }}
    >
      <div>
        <div className="sticky top-0 z-30">
          <CreateCvToolBarComponent />

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
        <div className="flex w-full ">
          <div className="w-1/4 ">
            <div className="w-fit">
              <NavCvComponent />
            </div>
          </div>
          <DndContext
            onDragStart={handelDragStart}
            onDragOver={handeDragOver}
            onDragEnd={handelDragEnd}
            sensors={sensors}
            collisionDetection={pointerWithin}
            id={id}
          >
            <CvComponent layoutInstance={layoutInstance} />
            <DragOverlay
              adjustScale={false}
              dropAnimation={dropAnimation}
              modifiers={[snapCenterToCursor]}
            >
              {activeDragContentId && (
                <div className="flex items-center justify-center w-fit h-fit p-1 border border-hoverColor text-white bg-secondaryColor">
                  {activeDrageCotentData?.name}
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </CvFormContext.Provider>
  );
};

export default CvFormComponent;
