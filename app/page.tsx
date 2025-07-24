import Hero from "./ui/home/Hero";
import UserImages from "./ui/home/UserImages";

export default function Home() {

  return (
    <header className="flex flex-col w-full">
      <Hero />
      <UserImages />
    </header>
  );
}
