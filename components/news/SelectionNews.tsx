import type { Section } from '@/types/section';
import Image from 'next/image';
import Link from 'next/link';

interface SelectionNewsProps {
    news: Section[];
}
const SelectionNews = ({ news }: SelectionNewsProps) => {
    return (
        <div>
            {news.slice(1).map((n) => (
                <div key={n.title} className='py-4'>
                    <h3 className="font-bold text-lg pb-2 border-b-2 border-red-600 mb-4">
                        {n.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {n.articles.map((main) => (
                            <Link
                                key={main.id}
                                href={`/news/${main.id}`}
                                className="card bg-base-100 shadow-sm flex-1 group"
                            >
                                <figure>
                                    <Image
                                        src={main.imageUrl}
                                        alt={main.title}
                                        width={600}
                                        height={700}
                                        className='group-hover:scale-105 transition-transform duration-500'
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <p className="font-bold text-red-500">
                                        {main.category}
                                    </p>
                                    <h2 className="card-title">{main.title}</h2>
                                    <p>{main.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectionNews;
