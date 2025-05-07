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
import { Input } from "@/components/ui/input";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { formatDateForInput } from "@/lib/utils";

type Props = {
  row: Apllication;
  refetch: any;
};
export const formSchema = z
  .object({
    date: z.date({
      required_error: "Ngày không được để trống",
      invalid_type_error: "Ngày không hợp lệ",
    }),
    start: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Giờ bắt đầu không hợp lệ"),
    end: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Giờ kết thúc không hợp lệ"),
    note: z.string().nonempty("Ghi chú không được để trống"),
  })
  .refine(
    (data) => {
      const startDateTime = new Date(
        `${data.date.toISOString().split("T")[0]}T${data.start}`
      );
      const endDateTime = new Date(
        `${data.date.toISOString().split("T")[0]}T${data.end}`
      );
      return startDateTime < endDateTime;
    },
    {
      message: "Giờ kết thúc phải sau giờ bắt đầu",
      path: ["end"],
    }
  );

const formatDateTime = (date: Date, time: string): Date => {
  const dateStr = date.toISOString().split("T")[0]; // "yyyy-mm-dd"
  return new Date(`${dateStr}T${time}Z`);
};
export type FormValues = z.infer<typeof formSchema>;
const DialogAddAppointment = ({ row, refetch }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      date: new Date(),
      start: "08:00",
      end: "17:00",
    },
  });
  const onSuccess = (data: any) => {
    toast.success(`Tao lịch hẹn thành công!`);
    setIsLoading(false);
    setOpen(false);
    refetch();
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
    const startTime = formatDateTime(values.date, values.start);
    const endTime = formatDateTime(values.date, values.end);

    console.log({ startTime, endTime, note: values.note });

    mutation.mutate({
      applicationId: row.id,
      startTime: startTime,
      endTime: endTime,
      note: values.note,
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
            <FormFieldComponent
              control={form.control}
              icon={null}
              name="date"
              label="Ngày "
              requrie={true}
            >
              {(field) => (
                <Input
                  type="date"
                  value={formatDateForInput(field.value)}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : undefined
                    )
                  }
                />
              )}
            </FormFieldComponent>
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
