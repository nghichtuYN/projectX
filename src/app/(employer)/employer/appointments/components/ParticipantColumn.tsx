import { Appointment } from "@/types/Apllication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
type Props = {
  row: Appointment;
};
const ParticipantColumn = ({ row }: Props) => {
  const pathName = usePathname();
  return (
    <div className="flex items-center gap-2 ">
      <Avatar>
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${row?.participant?.profilePicture}`}
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-start">
        <p className="text-sm">{row?.participant?.name}</p>
        <Link
          href={
            pathName.includes("employer")
              ? `/employer/appointments/${row.id}`
              : `/appointment/${row.id}`
          }
          className="hidden group-hover:block text-sm hover:underline"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ParticipantColumn;
