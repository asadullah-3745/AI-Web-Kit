import { SignIn } from "@clerk/nextjs";
import AuthPageShell from "@/app/components/AuthPageShell";

export default function Page() {
  return (
    <AuthPageShell>
      <SignIn />
    </AuthPageShell>
  );
}
