import PrivatePractDetail from "@/interfaces/screens/screen_private/private_pract_detail";

export default async function ActivityPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <PrivatePractDetail slug={id} />;
}