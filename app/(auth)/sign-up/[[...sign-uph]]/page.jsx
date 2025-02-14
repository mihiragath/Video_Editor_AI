import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="justify-center flex items-center h-screen">
      <SignUp />
    </div>
  );
}
