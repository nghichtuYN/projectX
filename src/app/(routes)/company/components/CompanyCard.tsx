import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
type CompanyCardProps = {
  logo: string;
  image: string;
  name: string;
  description: string;
  bgColor?: string;
  id: string;
};
const CompanyCard = ({
  id,
  logo,
  image,
  name,
  description,
  bgColor = "bg-white",
}: CompanyCardProps) => {
  return (
    <Card className="overflow-hidden border">
      <div className={cn("relative h-40 w-full", bgColor)}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-0">
        <div className="relative -mt-10 ml-4">
          <div className="h-20 w-20 rounded-md bg-white p-1 shadow-md">
            <div className="h-full w-full relative">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <Link href={`/company/${id}`} className="font-bold text-sm mb-2">
            {name}
          </Link>
          <div
            className="whitespace-pre-line text-xs text-gray-600 line-clamp-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
