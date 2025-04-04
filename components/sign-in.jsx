import { auth } from "@/firebase/firebaseConfig";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-8 text-4xl font-bold">Requirements Analysis Bot</h1>
        <Button onClick={signInWithGithub} variant="outline" size="lg">
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
}
