import React from "react";

const aaa = () => {
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={cn(
        "text-sm relative group rounded-md h-full flex items-center justify-center w-full"
      )}
    >
      <div
        id="details"
        className="w-full min-h-full h-fit rounded-md border hover:border-secondaryColor p-2"
      >
        <div
          onFocus={() => setActiveEditor(editorName)}
          className={cn(
            "border p-2 rounded",
            !editorName?.isFocused &&
              "hover:border-dashed hover:border-secondaryColor",
            (form.experiences.name === "<p></p>" || !form.experiences.name) &&
              "border-dashed border-secondaryColor",
            editorName?.isFocused && "border-solid border-green-500"
          )}
        >
          <EditorContent editor={editorName} />
        </div>
        {form.experiences.details.map((experience: any, index: number) => {
          const { editor: editorPosition } = useEditorHook(
            experience.position,
            "Vị trí công việc",
            "experiences",
            handleChange,
            "position",
            index
          );

          const { editor: editorCompany } = useEditorHook(
            experience.company,
            "Tên công ty",
            "experiences",
            handleChange,
            "company",
            index
          );

          const { editor: editorStart } = useEditorHook(
            experience.start,
            "Bắt đầu",
            "experiences",
            handleChange,
            "start",
            index
          );

          const { editor: editorEnd } = useEditorHook(
            experience.end,
            "Kết thúc",
            "experiences",
            handleChange,
            "end",
            index
          );

          const { editor: editorDescription } = useEditorHook(
            experience.description,
            "Mô tả công việc",
            "experiences",
            handleChange,
            "description",
            index
          );

          return (
            <div
              key={index}
              className="border-b group relative flex items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2"
            >
              <div className="w-1/3 flex flex-col gap-4">
                {/* Thời gian làm việc */}
                <div className="flex items-center gap-2 justify-start w-full">
                  <div
                    onFocus={() => setActiveEditor(editorStart)}
                    className={cn(
                      "border rounded p-1 w-1/3",
                      !editorStart?.isFocused &&
                        "hover:border-dashed hover:border-secondaryColor",

                      editorStart?.isFocused && "border-solid border-green-500"
                    )}
                  >
                    <EditorContent editor={editorStart} />
                  </div>
                  <Minus />
                  <div></div>
                  <div
                    onFocus={() => setActiveEditor(editorEnd)}
                    className={cn(
                      "border rounded p-1 w-1/3",
                      !editorEnd?.isFocused &&
                        "hover:border-dashed hover:border-secondaryColor",
                      editorEnd?.isFocused && "border-solid border-green-500"
                    )}
                  >
                    <EditorContent editor={editorEnd} />
                  </div>
                </div>
                {/* Tên công ty */}

                <div className="mb-2">
                  <div
                    onFocus={() => setActiveEditor(editorCompany)}
                    className={cn(
                      "border rounded p-1",
                      !editorCompany?.isFocused &&
                        "hover:border-dashed hover:border-secondaryColor",
                      editorCompany?.isFocused &&
                        "border-solid border-green-500"
                    )}
                  >
                    <EditorContent editor={editorCompany} />
                  </div>
                </div>
              </div>
              <div className="w-2/3 flex flex-col gap-2">
                {/* Vị trí công việc */}
                <div className="mb-2">
                  <div
                    onFocus={() => setActiveEditor(editorPosition)}
                    className={cn(
                      "border rounded p-1",
                      !editorPosition?.isFocused &&
                        "hover:border-dashed hover:border-secondaryColor",
                      editorPosition?.isFocused &&
                        "border-solid border-green-500"
                    )}
                  >
                    <EditorContent editor={editorPosition} />
                  </div>
                </div>

                {/* Mô tả công việc */}
                <div className="mb-2">
                  <div
                    onFocus={() => setActiveEditor(editorDescription)}
                    className={cn(
                      "border rounded p-1",
                      !editorDescription?.isFocused &&
                        "hover:border-dashed hover:border-secondaryColor",
                      editorDescription?.isFocused &&
                        "border-solid border-green-500"
                    )}
                  >
                    <EditorContent editor={editorDescription} />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 right-2 hidden group-hover:flex">
                aaaaaaaaaaaa
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute -top-4 left-2 rounded-t-md group-hover:w-14 bg-secondaryColor  group-hover:flex group-hover:justify-center  -translate-y-1/2  p-2 hidden">
        <div className="bg-secondaryColor w-fit flex items-center justify-center z-40 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger {...listeners}>
                <Move className="w-4 h-4 text-white" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Kéo thả để di chuyển mục</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MoveDown className="w-4 h-4 text-white" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Kéo thả để di chuyển mục</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default aaa;
