export const getCategories = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories');
    return res.json();
};