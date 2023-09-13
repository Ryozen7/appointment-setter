import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full h-full flex justify-center items-center">
      This is dashboard
    </div>
  )
}
