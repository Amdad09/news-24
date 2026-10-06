import type { Article } from './article';

export interface Section {
    articles: Article[];
    count: number;
    curationId: string;
    curationType: string;
    link: string | null;
    title: string;
}
