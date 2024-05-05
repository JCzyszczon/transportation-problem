import Image from "next/image";
import MainPanel from "./components/mainPanel";

export default function Home() {
  return (
    <main className="flex mainBg min-h-screen justify-center items-center">
      <MainPanel/>
    </main>
  );
}
