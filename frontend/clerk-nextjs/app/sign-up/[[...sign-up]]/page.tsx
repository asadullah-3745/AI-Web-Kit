import { SignUp } from "@clerk/nextjs";
import AuthPageShell from "@/app/components/AuthPageShell";

export default function Page() {
  return (
    <AuthPageShell>
      <SignUp />
    </AuthPageShell>
  );
}
