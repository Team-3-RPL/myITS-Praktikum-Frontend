import PrivateActivity from "@/interfaces/screens/screen_private/private_activity";

export default async function ActivityPage({
    params,
}: {
    params: Promise<{activity: string}>;
}) {
    const { activity } = await params;
    
    return <PrivateActivity slug={activity} />;
}