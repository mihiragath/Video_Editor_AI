import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>Hello User...</h2>
      <Button>Submit</Button>
      <UserButton />
    </div>
  );
}
