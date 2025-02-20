"use client";
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  Dispatch,
} from "react";
import NavCvComponent from "./NavCvComponent";
import ToolbarCvComponent from "@/app/(create-cv)/create-cv/(component)/ToolbarCvComponent";
import { useEditorHook } from "@/hooks/useEditorHook";
import { Editor } from "@tiptap/react";
import TextToolBarComponent from "./TextToolBarComponent";
import { layout2 } from "@/data/layout1";
import { cloneDeep } from "lodash";
import { RenderComponent } from "./RenderComponent";
import { DndContext } from "@dnd-kit/core";
type CvFormContextType = {
  setActiveEditor: Dispatch<React.SetStateAction<Editor | null>>;
  layout: any[];
  
};
export const CvFormContext = createContext<CvFormContextType>({
  setActiveEditor: () => {},
  layout: [],
});

const CvFormComponent = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    social: "",
    address: "",
    color: "",
  });
  const layout = cloneDeep(layout2);
  const [layoutInstance, setLayoutInstance] = useState(layout);
  const handleChange = (field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const [activeEditor, setActiveEditor] = useState<Editor | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeEditor]);
  return (
    <CvFormContext.Provider value={{ setActiveEditor, layout }}>
      <div>
        {activeEditor !== null ? (
          <div
            ref={toolbarRef}
            className={`transition-all duration-300 ease-in-out ${
              activeEditor
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[-20px]"
            } ${activeEditor ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <TextToolBarComponent editor={activeEditor} />
          </div>
        ) : (
          <ToolbarCvComponent
            color={form.color}
            handleChangeColor={handleChange}
            setLayoutInstance={setLayoutInstance}
          />
        )}
        <div className="flex w-full min-h-svh ">
          <DndContext>
            <div className="w-1/4 ">
              <div className="w-fit">
                <NavCvComponent />
              </div>
            </div>
            <div className="w-[795px]">
              <div className="ml-28 w-full pt-3 flex flex-col justify-center ">
                {layoutInstance?.map((row) => (
                  <div
                    key={row.id}
                    className="rounded-lg border h-fit min-h-16 w-full mb-3 group relative flex justify-center "
                  >
                    {row.columns.map((col: any, index: number) => (
                      <div key={col.id} style={{ width: `${col.width}%` }}>
                        <div className="flex flex-col h-fit w-full justify-center items-center gap-1  ">
                          {col.content.map((item: any) => (
                            <div
                              key={item.id}
                              className="text-sm bg-accent h-full flex items-center justify-center w-full"
                            >
                              <RenderComponent
                                type={item?.type}
                                handleChange={handleChange}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </DndContext>
        </div>
      </div>
    </CvFormContext.Provider>
  );
};

export default CvFormComponent;
