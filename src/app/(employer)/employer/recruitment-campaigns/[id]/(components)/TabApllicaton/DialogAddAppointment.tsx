import { Apllication } from "@/types/Apllication";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import StartAppointment from "./StartAppointment";
import EndAppointment from "./EndAppointment";
import NoteAppointment from "./NoteAppointment";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutationHook } from "@/hooks/useMutationHook";
import { createAppointment } from "@/services/appointment";

type Props = {
  row: Apllication;
};
export const formSchema = z
  .object({
    start: z
      .date({
        required_error: "Ngày bắt đầu không được để trống",
        invalid_type_error: "Ngày bắt đầu không hợp lệ",
      })
      .refine((val) => val !== undefined, {
        message: "Ngày bắt đầu không được để trống",
      }),
    end: z
      .date({
        required_error: "Ngày kết thúc không được để trống",
        invalid_type_error: "Ngày kết thúc không hợp lệ",
      })
      .refine((val) => val !== undefined, {
        message: "Ngày kết thúc không được để trống",
      }),
    note: z.string().nonempty("Ghi chú không được để trống"),
  })
  .refine((data) => data.start && data.end && data.start <= data.end, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["end"],
  });
export type FormValues = z.infer<typeof formSchema>;
const DialogAddAppointment = ({ row }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      start: undefined,
      end: undefined,
    },
  });
  const onSuccess = (data: any) => {
    toast.success(`Tao lịch hẹn thành công!`);
    setIsLoading(false);
  };
  const onError = (err: any) => {
    toast.error(`Tạo lịch hẹn thất bại!`);
  };
  const mutation = useMutationHook(
    (data) => {
      return createAppointment(data);
    },
    onSuccess,
    onError
  );
  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    mutation.mutate({
      applicationId: row.id,
      startTime: values?.start,
      endTime: values?.end,
      note: values?.note,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={row?.process !== 2} asChild>
        <Button disabled={row?.process !== 2} variant="outline">
          Tạo lịch hẹn
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo lịch hẹn phỏng vấn với ứng viên ưng ý !</DialogTitle>
          <DialogDescription>
            Hẹn lịch phỏng vấn với ưng viên, và được thông báo khi đến hạn
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <StartAppointment form={form} />
            <EndAppointment form={form} />
            <NoteAppointment form={form} />
            <DialogFooter>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setOpen(false)}
              >
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo lịch hẹn...
                  </>
                ) : (
                  <p>Tạo lịch hẹn</p>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddAppointment;
