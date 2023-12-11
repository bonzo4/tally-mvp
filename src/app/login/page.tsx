import AuthForm from "@/components/auth/AuthForm";

export default function Home() {
  return (
    <div className="row">
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}
