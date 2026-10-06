import type { MostReadProps } from "@/types/mostRead";
import Link from "next/link";

const MostRead = ({ news }: { news: MostReadProps[] }) => {
  return (
      <div className="p-4 border border-neutral-300 rounded-lg ">
          <h3 className="font-bold pb-4 text-lg">সর্বাধিক পঠিত</h3>
          <div>
              {news.map((n) => (
                  <div key={n.id}>
                      <Link href={`/news/${n.id}`} className="hover:text-red-700 group">
                          <div className="flex items-start gap-4 mb-2">
                              <p className="text-red-400 group-hover:text-red-700 font-bold text-xl">
                                  {n.rank}
                              </p>
                              <p className="font-bold">{n.title}</p>
                          </div>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default MostRead;