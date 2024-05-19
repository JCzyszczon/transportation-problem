import Image from "next/image";
import MainPanel from "./components/mainPanel";
import HelpModalButton from "./components/helpModalButton";

export default function Home() {
  return (
    <main className="flex mainBg min-h-screen justify-center items-center py-12 realtive overflow-hidden">
      <MainPanel/>
      <HelpModalButton/>
    </main>
  );
}
