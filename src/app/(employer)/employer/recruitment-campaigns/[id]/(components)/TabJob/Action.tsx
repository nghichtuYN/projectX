import React from "react";
import DialogDelete from "../DialogDelete";
import { Job } from "@/types/Jobs";
type Props = {
  row: Job;
  mutationDelete: any;
};
const Action = ({ row, mutationDelete }: Props) => {
  return <DialogDelete mutationDelete={mutationDelete} id={row?.id} />;
};

export default Action;
