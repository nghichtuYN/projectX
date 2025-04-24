import LevelComponent from "./LevelComponent";

import { getAllJobLevels } from "@/queries/queries";

import { ScrollArea } from "@/components/ui/scroll-area";

const ListLeversComponent = () => {
  const { data: listLobLevels } = getAllJobLevels("", 0, 1, true);
  return (
    <ScrollArea className="w-full  mt-2 h-24  pl-2  gap-3">
      <div className="grid grid-cols-2">
        {listLobLevels?.items?.map((level) => (
          <LevelComponent level={level} key={level?.id} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ListLeversComponent;
