import Container from "@/components/ui/Container";
import { getNews } from "@/lib/fetchApi/categories";
import type { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";

interface CategoryDetailsPageProps{
    params: Promise<{slug: string}>
}
const CategoryDetailsPage = async ({ params }: CategoryDetailsPageProps) => {
  const { slug } = await params;
  const data = await getNews(slug);
  const news: Article[] = data.data;
  return (
      <div>
          <Container>
              <h3 className="font-bold text-2xl pb-2 border-b-2 border-red-700 mb-4">
                  {data.title}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                  {news.map((main) => (
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
                                  className="group-hover:scale-105 transition-transform duration-500"
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
          </Container>
      </div>
  );
};

export default CategoryDetailsPage;