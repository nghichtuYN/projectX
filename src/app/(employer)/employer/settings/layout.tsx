import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import NavAccountSettingComponent from "./(components)/NavAccountSettingComponent";

const SettingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Cài đặt tài khoản
          </p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="grid grid-cols-5 p-20 rounded-md ">
        <div className="col-span-1 bg-white">
          <NavAccountSettingComponent />
        </div>
        <div className="col-span-4 bg-white">{children}</div>
      </div>
    </>
  );
};

export default SettingLayout;
