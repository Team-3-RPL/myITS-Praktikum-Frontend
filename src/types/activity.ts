export interface Attachment {
    id: number;
    link: string;
    filename: string;
    submission_id: number | null;
    activity_id: number;
    created_at: string;
    updated_at: string;
}

export interface ActivityData {
    id: number;
    name: string;
    activity_type: string;
    has_submission: number;
    start_time: string;
    end_time: string;
    description: string;
    location: string;
    practicum_id: number;
    created_at: string | null;
    updated_at: string | null;
    attachments: Attachment[];
}

export interface ActivityResponse {
    status: string;
    message: string;
    data: ActivityData;
}