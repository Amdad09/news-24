import type { Article } from '@/types/article';
import Image from 'next/image';
import Link from 'next/link';
interface MainNewsProps {
    articles: Article[];
}
const MainNews = ({ articles }: MainNewsProps) => {
    const [main, ...otherNews] = articles;
    return (
        <div className="flex gap-4">
            <Link
                href={`/news/${main.id}`}
                className="card bg-base-100 group shadow-sm flex-1"
            >
                <figure>
                    <Image
                        src={main.imageUrl}
                        alt={main.imageAlt}
                        width={600}
                        height={700}
                        className="group-hover:scale-105 transition-transform duration-500"
                    />
                </figure>
                <div className="card-body">
                    <p className="font-extrabold text-lg text-red-500">
                        {main.category}
                    </p>
                    <h2 className="card-title">{main.title}</h2>
                    <p>{main.description}</p>
                </div>
            </Link>
            <div className="border rounded-xl border-neutral-300 flex-1">
                {otherNews.slice(0, 5).map((news) => (
                    <Link href={`/news/${news.id}`} key={news.id}>
                        <div className="p-2 border-b border-neutral-300">
                            <p className="font-bold text-red-500 pb-2">
                                {news.category}
                            </p>
                            <p>{news.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainNews;
