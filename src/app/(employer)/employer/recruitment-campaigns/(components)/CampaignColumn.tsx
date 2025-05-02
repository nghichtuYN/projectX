import { Switch } from "@/components/ui/switch";
import { campaignType } from "@/types/campaign";
import Link from "next/link";
import DialogEditCampaignComponent from "./DialogEditCampaignComponent";

type Props = {
  row: campaignType;
  handleStatusChange: (row: campaignType) => void;
};

const CampaignColumn = ({ row, handleStatusChange }: Props) => {
  return (
    <div className="flex justify-start items-start gap-2 h-28">
      <Switch
        onCheckedChange={() => handleStatusChange(row)}
        checked={row.status === 1}
      />
      <div className="flex flex-col">
        <span className="font-medium text-xs">#{row.id.replace(/-/g, "")}</span>
        <Link
          className="hover:underline"
          href={`/employer/recruitment-campaigns/${row?.id}?active_tab=jobs`}
        >
          {row.name}
        </Link>
        <div className="text-sm text-gray-500">{row.status}</div>
        <div className="hidden group-hover:flex group-hover:flex-col text-sm font-medium gap-1 mt-2">
          <div className="flex items-center gap-2">
            <DialogEditCampaignComponent id={row?.id} />
            <Link
              className="hover:text-secondaryColor"
              href={`/employer/recruitment-campaigns/${row?.id}`}
            >
              Xem báo cáo
            </Link>
            <span className="cursor-pointer"></span>
          </div>
          <Link
            className="hover:text-secondaryColor"
            href={`http://localhost:3000/employer/recruitment-campaigns/${row?.id}?active_tab=apply_cv`}
          >
            Xem CV ứng tuyển
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignColumn;
