import { getMainNews, getMostReads } from "@/lib/fetchApi/categories";
import Container from "../ui/Container";
import MainNews from "./MainNews";
import type { Article } from "@/types/article";
import SelectionNews from "./SelectionNews";
import MostRead from "./MostRead";
import type { MostReadProps } from "@/types/mostRead";

const NewsSections = async () => {
    const data = await getMainNews();
    const news = data.data;
    const articles: Article[] = news[0].articles;

    const mostRead = await getMostReads();
    const main: MostReadProps[] = mostRead.data;
  return (
      <Container className=" py-4">
          <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                  <MainNews articles={articles} />
                  <SelectionNews news={ news} />
              </div>
              <div className="col-span-1"><MostRead news={ main} /></div>
          </div>
      </Container>
  );
};

export default NewsSections;