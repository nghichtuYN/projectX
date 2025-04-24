import { Experiences } from "@/data/Expericence";
import ExperienceComponent from "./ExperienceComponent";
import { RadioGroup } from "@/components/ui/radio-group";
type Props = {
  minExp?: string;
  maxExp?: string;
  handleSelectExp?: (min: string, max: string) => void;
};
const ListExperiencesComponent = ({
  minExp,
  maxExp,
  handleSelectExp,
}: Props) => {
  const currentValue = () => {
    if (minExp && maxExp) {
      if (minExp === "@" && maxExp === "@") {
        return "all";
      }
      if (minExp && maxExp === "@") {
        return `${minExp}-@`;
      }
      if (maxExp && minExp === "@") {
        return `@-${maxExp}`;
      }
      return `${minExp}-${maxExp}`;
    }
  };
  const handleValueChange = (value: string) => {
    if (!handleSelectExp) return;
    if (value === "all") {
      handleSelectExp("@", "@");
    } else {
      const [min, max] = value.split("-").map(String);
      handleSelectExp(min, max);
    }
  };
  return (
    <RadioGroup
      className="grid grid-cols-2 p-2 gap-3"
      value={currentValue()}
      onValueChange={handleValueChange}
    >
      {Experiences?.map((experience, index) => (
        <ExperienceComponent experience={experience} key={index} />
      ))}
    </RadioGroup>
  );
};

export default ListExperiencesComponent;
