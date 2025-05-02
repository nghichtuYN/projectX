import { Button } from "@/components/ui/button";
import { campaignType } from "@/types/campaign";
import Link from "next/link";

type Props = {
  row: campaignType;
};
const JobCampaign = ({ row }: Props) => {
  return (
    <div className="flex justify-center">
      {row.countJobs ? (
        row.countJobs
      ) : (
        <Link href={`/employer/recruitment-campaigns/${row?.id}/create_job`}>
          <Button
            size={"sm"}
            className="text-sm leading-[21px] border border-secondaryColor text-secondaryColor"
            variant={"outline"}
          >
            Đăng tin
          </Button>
        </Link>
      )}
    </div>
  );
};

export default JobCampaign;
