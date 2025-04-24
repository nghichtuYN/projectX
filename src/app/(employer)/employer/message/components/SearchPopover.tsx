import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { User } from "@/types/Conversation";
import { RefObject } from "react";
type Props = {
  commandRef: RefObject<HTMLDivElement | null>;
  users: User[] | undefined;
  onSelectUser: (id: string) => void;
};
const SearchPopover = ({ commandRef, users, onSelectUser }: Props) => {
  return (
    <div
      ref={commandRef}
      className={cn(
        "absolute top-full left-20 w-1/2 mt-2 ",
        " bg-white border shadow-xl rounded-2xl z-30 max-h-[300px] h-fit overflow-y-visible"
      )}
    >
      <div className="rounded-3xl">
        <ScrollArea className="max-h-[250px] h-fit overflow-auto">
          <div className="flex  flex-col gap-2 p-3 ">
            {users && users?.length > 0 ? (
              users?.map((user) => (
                <div
                  onClick={() => onSelectUser(user?.id)}
                  key={user?.id}
                  className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-2xl"
                >
                  <Avatar>
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${user?.profilePicture}`}
                      alt={user?.name}
                    />
                    <AvatarFallback>{user?.name}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{user.name}</p>
                </div>
              ))
            ) : (
              <div>Không tìm thấy người dùng nào</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SearchPopover;
