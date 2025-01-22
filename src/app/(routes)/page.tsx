import Image from "next/image";
import ver from "../../../public/menu-svgrepo-com.svg"
export default function Home() {
  return (
   <section>
    {/* <Button>aaa</Button> */}
    <Image width={1000} height={1000} src={ver} alt={"cặc"}></Image>
   </section>
  );
}
