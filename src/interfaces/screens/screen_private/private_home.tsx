"use client"
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin } from "lucide-react";

import Typography from "@/interfaces/components/Typography";
import MainLayout from "@/interfaces/layouts/main_layout";
import { useUserStore } from "@/shared/toolkit/zustand/useUserStore";
import { get } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { Practicum, PracticumResponse } from "@/types/practicum";
import { Button } from "@/interfaces/components/ui/button";
import Link from "next/link";

export default function PrivateHome() {
    const { user } = useUserStore();

    const { data: practicums, isLoading } = useQuery<Practicum[]>({
        queryKey: ["practicum"],
        queryFn: async () => {
            const { Kind } = await get(
                MAIN_ENDPOINT.User.Practicum,
            )

            const resp = Kind as PracticumResponse;
            return resp.data ?? [];
        },
        enabled: !!user,
    });

    return (
        <MainLayout 
            withNavbar
            className="min-h-screen bg-secondary-background p-8"
        >
            <Typography
                as="h1"
                variant="xl"
            >
                Institut Teknologi Sepuluh Nopember
            </Typography>

            <div className="space-y-4 mt-8">
                {practicums?.length === 0 && (
                    <Typography
                        as="p"
                        variant="lg"
                    >
                        Belum ada data praktikum
                    </Typography>
                )}

                {isLoading && (
                    <Typography
                        as="p"
                        variant="lg"
                    >
                        Memuat...
                    </Typography>
                )}

                {practicums?.map((practicum) => (
                    <div key={practicum.id} className="flex flex-col md:flex-row bg-white shadow-md items-stretch"> 
                        <div className="bg-gray-200 w-full md:w-[393px] min-h-[265px] flex-shrink-0">
                            
                        </div>

                        <div className="p-4 md:p-8">
                            <Typography
                                as="h2"
                                variant="lg"
                                weight="bold"
                            >
                                {practicum.name}
                            </Typography>
                            <Typography
                                as="p"
                                variant="md"
                            >
                                {practicum.description}
                            </Typography>  
                            <div className="flex items-center space-x-2 mt-2">
                                <MapPin />
                                <Typography
                                    as="p"
                                    variant="sm"
                                >
                                    {practicum.location ?? "Location Unknown"}
                                </Typography>
                            </div> 

                            <div className="flex items-center space-x-2 mt-2">
                                <Calendar />
                                <Typography
                                    as="p"
                                    variant="sm"
                                >
                                    {practicum.schedule}
                                </Typography>
                            </div>

                            <Typography>
                                {practicum.description}
                            </Typography>

                            <Link href={`/guard/practicum/${practicum.id}`}>
                                <Button 
                                    variant="primaryBlue"
                                    className="mt-4"
                                >
                                    Lihat Detail
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>    
            
        </MainLayout>
    )
}