export interface Article {
    category: string;
    description: string | null;
    firstPublished: string | null;
    id: string;
    imageAlt: string;
    imageUrl: string;
    isLive: boolean;
    lastPublished: string | null;
    link: string;
    source: string;
    title: string;
    type: string;
}