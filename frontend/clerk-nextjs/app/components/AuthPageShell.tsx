type Props = {
  children: React.ReactNode;
};

export default function AuthPageShell({ children }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-65px)] w-full items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-md justify-center">{children}</div>
    </div>
  );
}
