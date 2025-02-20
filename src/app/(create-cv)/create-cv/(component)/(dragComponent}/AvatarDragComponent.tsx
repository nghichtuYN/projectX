import Image from "next/image";
import React from "react";
type Props = {
  handleChange: (field: string, value: string) => void;
};
const AvatarDragComponent = ({ handleChange }: Props) => {
  return (
    <>
      <div className="w-full h-[268px]">
        <Image
          src="https://github.com/shadcn.png"
          alt="Avatar CV"
          width={10}
          height={10}
          className="w-full h-full"
        />
      </div>
    </>
  );
};

export default AvatarDragComponent;
