"use client";
import React from "react";
import {
  FileListActions,
  FileListContent,
  FileListDescription,
  FileListHeader,
  FileListIcon,
  FileListInfo,
  FileListItem,
  FileListName,
  FileListProgress,
  FileListSize,
} from "./ui/file-list";
import { Trash2 } from "lucide-react";

type Props = {
  file: File;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};
const FileListComponent = ({ file, setFiles }: Props) => {
  const [progress, setProgress] = React.useState(13);
  const removeFileByName = (fileNameToRemove: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileNameToRemove)
    );
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return oldProgress + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <FileListItem key={file.name}>
      <FileListHeader>
        <FileListIcon />
        <FileListInfo>
          <FileListName
            title={file.name}
            className="text-start text-ellipsis line-clamp-1"
          >
            {file.name}
          </FileListName>
          <FileListDescription>
            <FileListSize>{file.size}</FileListSize>
          </FileListDescription>
        </FileListInfo>
        {progress === 100 && (
          <FileListActions
            onClick={(e) => {
              e.stopPropagation();
              removeFileByName(file.name);
            }}
          >
            <Trash2 className="h-5 w-5" />
          </FileListActions>
        )}
      </FileListHeader>
      <FileListContent>
        {progress !== 100 ? <FileListProgress value={progress} /> : null}
      </FileListContent>
    </FileListItem>
  );
};

export default FileListComponent;
