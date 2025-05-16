"use client"
import Typography from "@/interfaces/components/Typography"
import MainLayout from "@/interfaces/layouts/main_layout"
import { get } from "@/services/api/main/call"
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint"
import { ActivityData, ActivityResponse } from "@/types/activity"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button } from "@/interfaces/components/ui/button"
import { ArrowLeft, Calendar, File, MapPin, Timer } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDate, getHourMinute } from "@/lib/helper"
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form"
import FileUpload from "@/interfaces/components/ui/upload"

export default function PrivateActivity({
    slug
}: { slug: string }) {
    const methods = useForm({
        defaultValues: {
            file: ""
        }
    })

    const { data: activity, isLoading } = useQuery<ActivityData>({
        queryKey: ["activity", slug],
        queryFn: async () => {
            const { Kind } = await get<ActivityResponse>(
                MAIN_ENDPOINT.User.Activity + `/${slug}`,
            )

            const resp = Kind as ActivityResponse
            return resp.data
        },
        enabled: !!slug,
    })

    // const { data: submission, refetch: refetchSubmission } = useQuery<SubmissionData>({
    //     queryKey: ["submission", slug],
    //     queryFn: async () => {
    //         const { Kind } = await get<SubmissionResponse>(
    //             MAIN_ENDPOINT.User.Submission + `/${slug}`
    //         )

    //         const resp = Kind as SubmissionResponse
    //         return resp.data
    //     },
    //     enabled: !!slug,
    // })
    
    // const uploadMutation = useMutation({
    //     mutationFn: async (formData: FormData) => {
    //         const token = await getCookies(ENV.TOKEN_KEY)
    //         // const response = await fetch(`${ENV.URI.BASE_URL}/api/submission/${slug}/file`, {
    //         //     method: 'POST',
    //         //     headers: {
    //         //         "Authorization": `Bearer ${token?.value}`,
    //         //     },
    //         //     body: formData,
    //         // });
            
    //         const res = await api.post(`/api/submission/${slug}`, formData)

    //         console.log(res)

    //         return await res.data;
    //     },
    //     onSuccess: () => {
    //         methods.reset(); 
    //     },
    //     onError: (error) => {

    //     }
    // });

    // const handleSubmit = methods.handleSubmit((data) => {
    //     const formData = new FormData();
    //     const fileInput = document.getElementById('file') as HTMLInputElement;
        
    //     if (fileInput && fileInput.files && fileInput.files.length > 0) {
    //         formData.append('file', fileInput.files[0]);
    //         uploadMutation.mutate(formData);
    //     } else {

    //     }
    // });

    const router = useRouter()

    return (
        <MainLayout withNavbar>
            {isLoading && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold">Memuat...</h1>
                </div>
            )}

            <Button
                variant="secondary"
                onClick={() => router.back()}
                type="button"
                className="mb-4"
            >
                <ArrowLeft size={20} />
                <span>Kembali</span>
            </Button>

            <FormProvider {...methods}>
                <div className="bg-background p-5">
                    <Typography 
                        as="h1" 
                        variant="2xl" 
                        weight="bold"
                    >
                        {activity?.name}
                    </Typography>
                    <Typography
                        variant="sm" 
                        className="px-4 py-0.5 bg-primary-blue/20 w-max rounded-md"
                    >
                        {activity?.activity_type}
                    </Typography>
                
                    <div className="flex gap-2 mt-5">
                        <Calendar />
                        <div className="flex gap-2">
                            <Typography>
                                {formatDate(activity?.start_time ?? "unknown")}
                            </Typography>
                            -
                            <Typography>
                                {formatDate(activity?.end_time ?? "unknown")}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Timer />
                        <div className="flex gap-2">
                            <Typography>
                                {getHourMinute(activity?.start_time ?? "unknown")}
                            </Typography>
                            -
                            <Typography>
                                {getHourMinute(activity?.end_time ?? "unknown")}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <MapPin />
                        <Typography>
                            {activity?.location}
                        </Typography>
                    </div>

                    <Typography>
                        {activity?.description}
                    </Typography>


                    <Typography 
                        as="h2"
                        className="mt-12 mb-2"
                        weight="bold"
                        variant="lg"
                    >
                        Submission
                    </Typography>
                    <div className="border border-secondary-white">
                        {activity?.attachments?.length === 0 && (
                            <Typography className="p-4">
                                No submission file
                            </Typography>
                        )}

                        {activity?.attachments?.map((item) => (
                            <div key={item.id} className="p-4 border-b space-y-2 hover:bg-slate-100">
                                <div className="flex flex-col md:flex-row items-center gap-2">
                                    <File />
                                    <Typography
                                        as="h2"
                                        variant="lg"
                                        weight="bold"
                                        color="blue"
                                    >
                                        <Link href="item/link">
                                            {item.filename}
                                        </Link>
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className="flex md:flex-row flex-col items-center justify-between">
                        <FileUpload 
                            id="file"
                            name="file"
                            label="Unggah berkas"
                            className="mt-12"
                        />

                        <Button 
                            variant="outline" 
                            className="mt-12"
                            type="submit"
                        >   
                            Unggah
                        </Button>
                    </form>
                </div>
            </FormProvider>
        </MainLayout>
    )
}