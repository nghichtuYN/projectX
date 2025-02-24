"use client";
import React from "react";
import ContentComponent from "./ContentComponent";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
type Props = {
  contents: any[];
};
const ListContentsComponent = ({ contents }: Props) => {
  return (
    <SortableContext
      items={contents.map((content) => content.id)}
      strategy={verticalListSortingStrategy}
      
    >
      <div className="flex flex-col h-full w-full rounded-md justify-center items-center gap-1">
        {contents?.map((content) => (
          <ContentComponent key={content.id} content={content} />
        ))}
      </div>
    </SortableContext>
  );
};

export default ListContentsComponent;
