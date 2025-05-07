import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandInput } from "@/components/ui/command";
import ListLabel from "./ListLabel";
import SelectedLabel from "./SelectedLabel";
import { getAllService } from "@/services/service";
import { useQueryHook } from "@/hooks/useQueryHook";
import { Service } from "@/types/Services";
import { Card, CardContent } from "@/components/ui/card";
type Props = {
  form: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
};
const LabelComponent = ({ form, removeItem }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data: jobServices,
    isLoading,
    isFetching,
  } = useQueryHook<Service[]>(["jobServices"], getAllService);
  const [totalPrice, setTotalPrice] = useState({
    token: 0,
    cash: 0,
  });

  const selectedServices = form.watch("serviceIds");
  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    if (jobServices && selectedServices && selectedServices.length > 0) {
      const selected = jobServices.filter((service) =>
        selectedServices.includes(service.id)
      );

      const tokenTotal = selected.reduce(
        (sum, service) => sum + (service.xTokenPrice || 0),
        0
      );

      const cashTotal = selected.reduce(
        (sum, service) => sum + (service.cashPrice || 0),
        0
      );

      setTotalPrice({
        token: tokenTotal,
        cash: cashTotal,
      });

      if (!form.getValues("paymentMethod") && selectedServices.length > 0) {
        form.setValue("paymentMethod", "0", { shouldValidate: true });
      }
    } else {
      setTotalPrice({ token: 0, cash: 0 });
    }
  }, [selectedServices, jobServices, form]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <div>
      <FormFieldComponent
        control={form.control}
        name="serviceIds"
        label="Dịch vụ thêm"
        requrie={false}
        icon={null}
      >
        {(field) => (
          <div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-fit justify-between"
                >
                  <p className="text-sm">
                    {field.value?.length > 0
                      ? `${field.value.length} dịch vụ được chọn`
                      : "Chọn dịch vụ..."}
                  </p>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Tìm dịch vụ"
                    className="h-9"
                  />
                  <ListLabel
                    setOpen={setOpen}
                    labels={jobServices}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    field={field}
                  />
                </Command>
              </PopoverContent>
            </Popover>
            <SelectedLabel
              field={field}
              labels={jobServices}
              removeItem={removeItem}
            />
          </div>
        )}
      </FormFieldComponent>
      {selectedServices && selectedServices.length > 0 && (
        <Card className="mt-4">
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Giá Token:</span>
                <span className="font-medium">
                  {totalPrice.token.toLocaleString()} Token
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Giá tiền mặt:</span>
                <span className="font-medium">
                  {formatCurrency(totalPrice.cash)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LabelComponent;
