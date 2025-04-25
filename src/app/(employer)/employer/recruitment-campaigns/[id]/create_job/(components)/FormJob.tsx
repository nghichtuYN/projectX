import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import TittleComponent from "./TittleComponent";
import AddressComponent from "./AddressComponent";
import EducationLevelComponent from "./EducationLevelComponent";
import JobTypeComponent from "./JobTypes/JobTypesComponent";
import JobLevelComponent from "./JobLevels/JobLevelsComponent";
import ContractTypeComponent from "./ContractType/ContractsTypeComponent";
import SkillComponent from "./Skill/SkillsComponent";
import SalaryComponent from "./SalaryComponent";
import DescriptionComponent from "./DescriptionComponent";
import ExperienceComponent from "./ExperienceComponent";
import JDComponent from "./JDComponent";
import MajorsComponent from "./Major/MajorsComponent";
import LocationsComponent from "./Location/LocationsComponent";
import QuantityComponent from "./QuantityComponent";
import { UseMutationResult } from "@tanstack/react-query";
import { JobFormValues, jobSchema } from "./FormCreateJobComponent";
import { z } from "zod";
import { Loader2 } from "lucide-react";
type Props = {
  form: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  onSubmit: (values: z.infer<typeof jobSchema>) => void;
  title: string;
  content: string;
};
const FormJob = ({
  form,
  removeItem,
  mutation,
  onSubmit,
  content,
  title,
}: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex justify-between">
              {title}
              <Button
                type="submit"
                size="lg"
                className="px-8"
                disabled={mutation?.isPending}
              >
                {mutation?.isPending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 w-4 h-4" />
                    Đang xử lý...{" "}
                  </>
                ) : (
                  content
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
                <Separator className="flex-1 ml-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <TittleComponent form={form} />
                  <AddressComponent form={form} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LocationsComponent form={form} />
                  <MajorsComponent form={form} />
                  <QuantityComponent form={form} />
                  <ExperienceComponent form={form} />
                  <div className="col-span-2">
                    <EducationLevelComponent form={form} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Chi tiết công việc</h3>
                <Separator className="flex-1 ml-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DescriptionComponent form={form} />
                  <JDComponent form={form} />
                </div>
                <div className="space-y-4">
                  <SalaryComponent form={form} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <JobTypeComponent form={form} removeItem={removeItem} />
                    <JobLevelComponent form={form} removeItem={removeItem} />
                    <SkillComponent form={form} removeItem={removeItem} />
                    <ContractTypeComponent
                      form={form}
                      removeItem={removeItem}
                    />
                  </div>
                </div>
              </div>
            </div>

            <CardFooter className="px-0 pt-6 flex justify-end"></CardFooter>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default FormJob;
