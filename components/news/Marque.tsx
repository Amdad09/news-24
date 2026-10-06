import type { HeadLine } from "@/types/headline";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import 'react-marquee-text/dist/styles.css'
import Container from "../ui/Container";
const Marque = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
    const data = await res.json();
    const headlines: HeadLine[] = data.data;
    return (
        <div className="bg-red-700 text-white">
            <Container className="flex items-center">
                <p className="bg-red-800 py-2 font-bold px-3">সর্বশেষ</p>
                <MarqueeText
                    direction="right"
                    duration={10}
                >
                    {headlines.map((headline) => (
                        <Link className="" href={headline.link} key={headline.id}>
                            {headline.title} <span className="mx-3">•</span>
                        </Link>
                    ))}
                </MarqueeText>
            </Container>
        </div>
    );
};

export default Marque;