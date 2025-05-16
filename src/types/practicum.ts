export interface PracticumPivot {
    user_id: number;
    practicum_id: number;
}

export interface Practicum {
    id: number;
    name: string;
    description: string;
    location: string;
    schedule: string;
    department_id: number;
    created_at: string;
    updated_at: string;
    pivot: PracticumPivot;
}

export interface PracticumResponse {
    status: boolean;
    message: string;
    data: Practicum[];
}

export interface Activity {
    id: number;
    name: string;
    activity_type: string;
    has_submission: number;
    start_time: string;
    end_time: string;
    description: string;
    location: string;
    practicum_id: number;
    created_at: string;
    updated_at: string;
}

export interface PracticumDetail {
    id: number;
    name: string;
    description: string | null;
    location: string;
    schedule: string;
    department_id: number;
    created_at: string;
    updated_at: string;
    activities: Activity[];
}

export interface PractDetailResponse {
    status: boolean;
    message: string;
    data: PracticumDetail;
}