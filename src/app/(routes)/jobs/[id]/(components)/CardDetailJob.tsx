import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookmarkX, Heart } from "lucide-react";
import ApplicationDialogComponent from "./ApplicationDialogComponent";
import { Button } from "@/components/ui/button";
import { JobPublic } from "@/types/Jobs";
import { cn } from "@/lib/utils";
type Props = {
  job: JobPublic;
  handleSaveJob: () => void;
};
const CardDetailJob = ({ job, handleSaveJob }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Chi tiết tuyển dụng</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          style={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: job?.description }}
        />
      </CardContent>
      <CardFooter className="flex items-center gap-3">
        <div className="w-[140px]">
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

export default CardDetailJob;
