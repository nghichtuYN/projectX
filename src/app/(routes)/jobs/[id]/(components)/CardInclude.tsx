import { JobPublic } from "@/types/Jobs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  job: JobPublic;
};

const CardInclude = ({ job }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-4">Danh mục nghề liên quan</CardTitle>
        <span className="flex items-center gap-2 text-xs">
          {job?.companyRecruiter?.majors?.map((major, index) => (
            <Link href={`/find-jobs?majors=${major.id}`} className="hover:underline" key={major.id}>
              {major.name}
              {index < job?.companyRecruiter?.majors?.length - 1 ? ", " : ""}
            </Link>
          ))}
        </span>
      </CardHeader>
      <CardHeader>
        <CardTitle className="flex gap-4">Kỹ năng cần có</CardTitle>
        <span className="flex items-center gap-2 text-xs">
          {job?.skills?.map((skill, index) => (
            <div key={skill.id}>
              {skill.name} {index < job?.skills?.length - 1 ? ", " : ""}
            </div>
          ))}
        </span>
      </CardHeader>
      <CardHeader>
        <CardTitle className="flex gap-4">Khu vực</CardTitle>
        <Link
          href={`/find-jobs?locations=${job?.location?.id}`}
          className="flex items-center gap-2 text-xs hover:underline"
        >
          {job?.location?.name}
        </Link>
      </CardHeader>
    </Card>
  );
};

export default CardInclude;
