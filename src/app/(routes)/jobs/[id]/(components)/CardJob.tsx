import { JobPublic } from "@/types/Jobs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookmarkX,
  CircleDollarSign,
  Clock,
  Heart,
  Hourglass,
  MapPinned,
} from "lucide-react";
import ApplicationDialogComponent from "./ApplicationDialogComponent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type Props = {
  job: JobPublic;
  handleSaveJob: () => void;
};
const CardJob = ({ job, handleSaveJob }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-ellipsis line-clamp-2">
          {job?.title}
        </CardTitle>
        <CardDescription
          className="flex items-center justify-between pt-2"
        >
          <span className="flex items-center gap-2">
            <div className="rounded-3xl bg-secondaryColor p-2">
              <CircleDollarSign className="w-6 h-6 text-white " />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md text-black">Mức lương</p>
              <span className="font-semibold text-black">
                {!!job?.minSalary && !!job?.maxSalary
                  ? `Lương ${job?.minSalary} - ${job?.maxSalary}`
                  : job?.minSalary
                  ? `Lương ${job?.minSalary}`
                  : job?.maxSalary
                  ? `Lương ${job?.maxSalary}`
                  : "Thỏa thuận"}
              </span>
            </div>
          </span>
          <span className="flex items-center gap-2">
            <div className="rounded-3xl bg-secondaryColor p-2">
              <MapPinned className="w-6 h-6 text-white " />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md text-black">Địa điểm</p>
              <span className="font-semibold text-black">
                {job?.location?.name}
              </span>
            </div>
          </span>
          <span className="flex items-center gap-2">
            <div className="rounded-3xl bg-secondaryColor p-2">
              <Hourglass className="w-6 h-6 text-white " />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-md text-black">Kinh nghiệm</p>
              <span className="font-semibold text-black">
                {job?.yearOfExperience} năm
              </span>
            </div>
          </span>
        </CardDescription>
        <CardDescription className="pt-5">
          <span className="bg-accent flex items-center gap-2 w-1/3">
            <Clock className="w-4 h-4 text-secondaryColor" />
            <p>Hạn nộp hồ sơ: 25/02/2025</p>
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-3">
        <div className="w-4/5">
          <ApplicationDialogComponent id={job?.id} />
        </div>
        <Button
          variant="outline"
          className={cn(
            "flex items-center font-semibold w-1/5",
            job?.isSaved && "border-red-500"
          )}
          onClick={() => handleSaveJob()}
        >
          {job?.isSaved ? (
            <div className="flex items-center gap-3 text-red-500">
              <BookmarkX className="w-5 h-5 font-bold" />
              <p className="hidden md:block">Bỏ lưu</p>
            </div>
          ) : (
            <>
              <Heart />
              <p className="hidden md:block">Lưu tin</p>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardJob;
