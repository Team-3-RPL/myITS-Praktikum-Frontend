"use client"
import { Calendar, MapPin, Timer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Typography from "@/interfaces/components/Typography"
import MainLayout from "@/interfaces/layouts/main_layout"
import { formatDate, getHourMinute } from "@/lib/helper"
import { get } from "@/services/api/main/call"
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint"
import { PractDetailResponse, PracticumDetail } from "@/types/practicum"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Button } from "@/interfaces/components/ui/button"

type PrivateActivityProps = {
    slug: string
}

export default function PrivatePractDetail({
    slug
}: PrivateActivityProps) {
    const { data: practicum, isLoading } = useQuery<PracticumDetail>({
        queryKey: ["activity", slug],
        queryFn: async () => {
            const { Kind } = await get<PractDetailResponse>(
                MAIN_ENDPOINT.User.Practicum + `/${slug}`,
            )

            const resp = Kind as PractDetailResponse
            return resp.data
        },
        enabled: !!slug,
    })

    const router = useRouter()

    return (
        <MainLayout 
            withNavbar
        >
            <Button
                variant="secondary"
                onClick={() => router.back()}
                type="button"
                className="mb-4"
            >
                <ArrowLeft size={20} />
                <span>Kembali</span>
            </Button>

            {practicum?.activities?.length === 0 && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold">Belum ada data aktivitas</h1>
                </div>
            )}

            {isLoading && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold">Memuat...</h1>
                </div>
            )}

            <div>
                <Typography
                    as="h1"
                    variant="xl"
                    weight="bold"
                >
                    {practicum?.name}
                </Typography>
                <Typography
                    as="h1"
                    variant="lg"
                >
                    {practicum?.location}
                </Typography>
                <Typography
                    as="h1"
                    variant="md"
                >
                    {practicum?.description}
                </Typography>
            </div>

            <div className="bg-background mt-8">
                {practicum?.activities?.map((item) => (
                    <Link href={`/guard/practicum/${slug}/${item.id}`} key={item.id}>
                        <div className="p-4 border-b space-y-2 hover:bg-slate-100">
                            <Typography
                                as="h2"
                                variant="lg"
                                weight="bold"
                                color="blue"
                            >
                                {item.name}
                            </Typography>

                            <Typography
                                variant="sm" 
                                className="px-4 py-0.5 bg-primary-blue/20 w-max rounded-md"
                            >
                                {item.activity_type}
                            </Typography>

                            <div className="flex gap-2">
                                <MapPin />
                                <Typography>
                                    {item.location}
                                </Typography>
                            </div>
                            <div className="flex gap-2">
                                <Calendar />

                                <div className="flex gap-2">
                                    <Typography>
                                        {formatDate(item.start_time)}
                                    </Typography>
                                    -
                                    <Typography>
                                        {formatDate(item.end_time)}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Timer />
                                <div className="flex gap-2">
                                    <Typography>
                                        {getHourMinute(item.start_time)}
                                    </Typography>
                                    -
                                    <Typography>
                                        {getHourMinute(item.end_time)}
                                    </Typography>
                                </div>
                            </div>
                            
                            <Typography>
                                {item.description}
                            </Typography>
                            
                        </div>
                    </Link>
                ))}
            </div>
        </MainLayout>
    )
}