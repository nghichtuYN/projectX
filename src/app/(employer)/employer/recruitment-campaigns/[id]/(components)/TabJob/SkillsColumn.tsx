import { Job } from "@/types/Jobs";
type Props = {
  row: Job;
};

const SkillsColumn = ({ row }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {row.skills?.map((skill) => (
        <div key={skill.id}>{skill?.name},</div>
      ))}
    </div>
  );
};

export default SkillsColumn;
