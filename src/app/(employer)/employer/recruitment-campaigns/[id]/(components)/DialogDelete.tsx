import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

type Props = {
  id: string;
  mutationDelete?: any; // Có thể định nghĩa kiểu cụ thể hơn nếu cần
};

const DialogDelete = ({ id, mutationDelete }: Props) => {
  const handleDelete = () => {
    if (mutationDelete) {
      mutationDelete.mutate({ id: id }); // Gọi mutation để xóa nếu có
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 text-red-500"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDelete;
