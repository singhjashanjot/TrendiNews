import { useEffect } from "react";
import { useState } from "react";
import Newsitem from "./Newsitem";
const Newsboard = ({category}) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        console.log(import.meta.env.VITE_API_KEY);  // Check if the API key is correct

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                console.log(data);  // Log the data to verify the API response
                setArticles(data.articles);
            })
            .catch(error => console.error("There was a problem with the fetch operation:", error));
    }, [category]);
    return (
        <div>
            <br />
            <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
            {
                articles.map((news, index) => {
                    return <Newsitem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>

                })}
        </div>
    )
}

export default Newsboard