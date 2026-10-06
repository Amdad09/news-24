import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';

import { notFound } from 'next/navigation';

const API_URL = 'https://news-api-v2.vercel.app/api';

export interface Byline {
    name: string;
    role: string | null;
}

export interface Topic {
    id: string;
    name: string;
}

export interface ArticleBodyText {
    type: 'text';
    text: string;
}

export interface ArticleBodyImage {
    type: 'image';
    url: string;
    width: number;
    height: number;
    caption: string;
    altText: string;
    copyrightHolder: string;
}

export type ArticleBodyBlock = ArticleBodyText | ArticleBodyImage;

export interface ArticleDescription {
    blocks: {
        model: { blocks: { model: { text: string } }[] };
    }[];
}

export interface ArticleDetails {
    id: string;
    title: string;
    description: ArticleDescription | null;
    link: string;
    firstPublished: string | null;
    lastPublished: string | null;
    byline: Byline[];
    topics: Topic[];
    tags: string[];
    imageUrl: string;
    body: ArticleBodyBlock[];
    text: string;
    wordCount: number;
    source: string;
    sourceUrl: string;
}

interface ArticleDetailsResponse {
    success: boolean;
    cachedAt: string;
    data: ArticleDetails;
}

export async function getArticle(id: string): Promise<ArticleDetails> {
    const res = await fetch(`${API_URL}/article/${(id)}`, {
        next: { revalidate: 300 },
    });

    if (res.status === 404) notFound();
    if (!res.ok) throw new Error(`Failed to fetch article (${res.status})`);

    const json: ArticleDetailsResponse = await res.json();
    if (!json.success || !json.data) notFound();

    return json.data;
}

export function getDescription(article: ArticleDetails): string {
    return (
        article.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text ?? ''
    );
}

interface PageProps {
    params: Promise<{ newsId: string }>;
}

// Next.js same URL-er fetch dedupe kore, tai page + metadata duita call hoileo ekbar-i request jabe
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { newsId } = await params;
    const article = await getArticle(newsId);
    const description = getDescription(article);

    return {
        title: article.title,
        description,
        openGraph: {
            title: article.title,
            description,
            type: 'article',
            publishedTime: article.firstPublished ?? undefined,
            images: article.imageUrl ? [article.imageUrl] : [],
        },
    };
}

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('bn-BD', {
        dateStyle: 'long',
        timeZone: 'Asia/Dhaka',
    }).format(new Date(date));

const isPromoText = (text: string) => text.includes('হোয়াটসঅ্যাপ চ্যানেল');

export default async function NewsDetailsPage({ params }: PageProps) {
    const { newsId } = await params;
    const article = await getArticle(newsId);
    console.log(article);

    const heroIndex = article.body.findIndex((b) => b.type === 'image');
    const hero =
        heroIndex !== -1 ? (article.body[heroIndex] as ArticleBodyImage) : null;
    // hero image body-te dubar jate na dekhay
    const content = article.body.filter((_, i) => i !== heroIndex);

    const description = getDescription(article);
    const category = article.topics[0]?.name ?? 'সংবাদ';
    const author = article.byline[0]?.name;
    const isUpdated =
        article.lastPublished &&
        article.lastPublished !== article.firstPublished;

    return (
        <main className="py-8 md:py-12">
            <Container>
                <article className="mx-auto max-w-3xl">
                    <span className="text-sm font-semibold text-red-600">
                        {category}
                    </span>

                    <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                        {article.title}
                    </h1>

                    {description && (
                        <p className="mt-5 text-lg leading-8 text-gray-600 md:text-xl">
                            {description}
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 pb-6 text-sm text-gray-500">
                        {author && (
                            <span>
                                লিখেছেন{' '}
                                <strong className="text-gray-700">
                                    {author}
                                </strong>
                            </span>
                        )}
                        {article.firstPublished && (
                            <time dateTime={article.firstPublished}>
                                প্রকাশিত: {formatDate(article.firstPublished)}
                            </time>
                        )}
                        {isUpdated && article.lastPublished && (
                            <time dateTime={article.lastPublished}>
                                আপডেট: {formatDate(article.lastPublished)}
                            </time>
                        )}
                    </div>

                    {hero && (
                        <ArticleImage image={hero} priority className="mt-8" />
                    )}

                    <div className="mt-8">
                        {content.map((block, index) => {
                            if (block.type === 'image') {
                                return (
                                    <ArticleImage
                                        key={index}
                                        image={block}
                                        className="my-8"
                                    />
                                );
                            }

                            if (isPromoText(block.text)) return null;

                            return (
                                <p
                                    key={index}
                                    className="mb-6 text-[17px] leading-8 text-gray-800 md:text-lg md:leading-9"
                                >
                                    {block.text}
                                </p>
                            );
                        })}
                    </div>

                    <ChipSection
                        title="বিষয়"
                        className="mt-10 border-t border-gray-200 pt-6"
                    >
                        {article.topics.map((t) => (
                            <span
                                key={t.id}
                                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                            >
                                {t.name}
                            </span>
                        ))}
                    </ChipSection>

                    <ChipSection title="ট্যাগ" className="mt-6">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600"
                            >
                                #{tag}
                            </span>
                        ))}
                    </ChipSection>

                    <footer className="mt-10 border-t border-gray-200 pt-5 text-sm text-gray-500">
                        সূত্র:{' '}
                        <a
                            href={article.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gray-700 hover:underline"
                        >
                            {article.source}
                        </a>
                    </footer>
                </article>
            </Container>
        </main>
    );
}

function ArticleImage({
    image,
    priority = false,
    className = '',
}: {
    image: ArticleBodyImage;
    priority?: boolean;
    className?: string;
}) {
    return (
        <figure className={className}>
            <div className="overflow-hidden rounded-xl">
                <Image
                    src={image.url}
                    alt={image.altText || image.caption}
                    width={image.width}
                    height={image.height}
                    priority={priority}
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="h-auto w-full object-cover"
                />
            </div>
            <figcaption className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-gray-500">
                <span>{image.caption}</span>
                {image.copyrightHolder && (
                    <span>© {image.copyrightHolder}</span>
                )}
            </figcaption>
        </figure>
    );
}

function ChipSection({
    title,
    className = '',
    children,
}: {
    title: string;
    className?: string;
    children: React.ReactNode[];
}) {
    if (children.length === 0) return null;

    return (
        <section className={className}>
            <h2 className="mb-3 text-sm font-semibold text-gray-700">
                {title}
            </h2>
            <div className="flex flex-wrap gap-2">{children}</div>
        </section>
    );
}
