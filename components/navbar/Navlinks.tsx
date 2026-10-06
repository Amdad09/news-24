import { getCategories } from "@/lib/fetchApi/categories";
import type { Category } from "@/types/category";
import Link from "next/link";

const Navlinks = async () => {
    const data = await getCategories();
    const categories: Category[] = data.data;
    const navs = categories.filter(category=> category.scrapable);
  return (
      <div className="flex gap-4 justify-center pt-4">
          {navs.map((category) => (
               <Link href={`/category/${category.slug}`} key={category.topicId}>
                  {category.title}
              </Link>
          ))}
      </div>
  );
};

export default Navlinks;