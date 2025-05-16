"use client"
import { useUserStore } from "@/shared/toolkit/zustand/useUserStore"
import Image from "next/image"
import Typography from "@/interfaces/components/Typography"
import { Button } from "@/interfaces/components/ui/button"
import { removeCookies } from "@/modules/cookies"
import { ENV } from "@/configs/environment"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
    const [isLoading, setLoading] = useState<boolean>(false)
    const { user } = useUserStore()
    const router = useRouter()

    const handleLogout = () => {
        setLoading(true)
        removeCookies(ENV.TOKEN_KEY)
        router.push("/login")
    }

    return (
        <header className="sticky top-0 flex items-center justify-between py-2 bg-background shadow-md px-4 md:px-12">
            <Link href="/guard/home">
                <Image 
                    src="/images/myITS-Praktikum-colored.png"
                    width={80}
                    height={70}
                    alt="Image description"
                />
            </Link>

            <div className="flex items-center gap-5">
                <Button 
                    isLoading={isLoading}
                    variant="primaryBlue"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

                <Typography>
                    {user?.name}
                </Typography>
            </div>
        </header>
    )
}