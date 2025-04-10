import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export default function AuthLayout({ children }) {
  return <div className={`${geist.className} min-h-screen `}>{children}</div>;
}
