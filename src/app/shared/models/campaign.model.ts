export class Campaign {
    id: string;
    created_at: number;
    updated_at: number;
    name: string;
    surveys: string[];
    devices: string[];
    start: number;
    end: number;
    survey: Survey[];
    channels: [string];
}

export class Survey {
    id: string;
    created_at: number;
    updated_at: number;
    name: string;
    questions: Question[];
    device_ids: any[];
    point: number;
}

export class Question {
    id: string;
    content: string;
    i18n_content: string;
    summary: string;
    type: string;
    point: number;
    manded: boolean;
    answers: Answer[];
    result: Answer[];
    link: number;
}

export class Answer {
    icon: string;
    content: string;
    i18n_content: string;    
    point: number;
    link: number;
}
