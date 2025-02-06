import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
type Props = {
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AlertDialogCompoent = ({ openAlert, setOpenAlert }: Props) => {
  return (
    <>
      <AlertDialog
        open={openAlert}
        onOpenChange={() => {
          setOpenAlert(!openAlert);
        }}
      >
        <AlertDialogContent className="flex flex-col items-center">
          <AlertDialogHeader>
            <AlertDialogTitle>Thông báo</AlertDialogTitle>
            <AlertDialogDescription>
              Vui lòng chọn CV trước khi nộp hồ sơ ứng tuyển
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Đóng</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
