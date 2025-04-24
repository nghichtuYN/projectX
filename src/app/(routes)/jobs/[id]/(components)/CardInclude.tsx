import { JobPublic } from "@/types/Jobs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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
            <div key={major.id}>
              {major.name}{" "}
              {index < job?.companyRecruiter?.majors?.length - 1 ? ", " : ""}
            </div>
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
        <span className="flex items-center gap-2 text-xs">
          {job?.location?.name}
        </span>
      </CardHeader>
    </Card>
  );
};

export default CardInclude;
