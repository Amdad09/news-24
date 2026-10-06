export const getCategories = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories');
    return res.json();
};

export const getMainNews = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/sections');
    return res.json();
}

export const getMostReads = async () => {
    const res = await fetch(
        'https://news-api-v2.vercel.app/api/news/most-read',
    );
    return res.json();
}

export const getNews = async (slug: string) => {
    const res = await fetch(
        `https://news-api-v2.vercel.app/api/category/${slug}`,
    );
    return res.json();
}