import { Form } from "@/components/ui/form";
import React from "react";
import FrontIdCard from "./FrontIdCard";
import BackIdCard from "./BackIdCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
type Props = {
  form: any;
  isLoading: boolean;
  onSubmit: (data: any) => void;
  frontIdCard: any;
  setFrontIdCard: any;
  backIdCard: any;
  setBackIdCard: any;
};
const FormFreelance = ({
  form,
  onSubmit,
  backIdCard,
  frontIdCard,
  isLoading,
  setFrontIdCard,
  setBackIdCard,
}: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border p-2"
      >
        <FrontIdCard
          form={form}
          files={frontIdCard}
          setFiles={setFrontIdCard}
        />
        <BackIdCard form={form} files={backIdCard} setFiles={setBackIdCard} />
        <Button type="submit" className="w-full " disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang lưu
            </>
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormFreelance;
