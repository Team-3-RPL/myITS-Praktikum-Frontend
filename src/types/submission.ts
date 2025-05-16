export type SubmissionAttachment = {
    id: number;
    link: string | null;
    filename: string;
    submission_id: number;
    activity_id: number;
    created_at: string;
    updated_at: string;
};

export type SubmissionData = {
    id: number;
    grade: number | null;
    comment: string | null;
    activity_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    attachments: SubmissionAttachment[];
};

export type SubmissionResponse = {
    status: boolean;
    message: string;
    data: SubmissionData;
};
