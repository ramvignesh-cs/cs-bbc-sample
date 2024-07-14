import { useEffect, useState } from "react";
import { EntrySDK } from "../../cs-sdk/entry";
import { cms } from "../../constants/cms";
import { HomeNewsEntry, LiveNewsItem } from "../../utils/types";

import "./news.css";
import HomeNewsItems from "./homeNewsItems";
import Loader from "../../components/Loader/loader";

const News = () => {
  let newsItem = {
    heading: "",
    description: "",
    imageURL: "",
  };

  const [homeNewsData, setHomeNewsData] = useState<HomeNewsEntry[]>([]);
  const [newsLiveData, setNewsLiveData] = useState<LiveNewsItem>(newsItem);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveNews = async () => {
      try {
        const liveNews = await EntrySDK.getEntry(
          cms.content_type_uid.live,
          cms.entry_uid.live
        );

        setNewsLiveData((prev) => {
          return {
            ...prev,
            heading: liveNews.heading,
            description: liveNews.body,
            imageURL: liveNews.news_image.url,
          } as LiveNewsItem;
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    const fetchHomeNews = async () => {
      try {
        const homeNews = await EntrySDK.getEntries(
          cms.content_type_uid.news_items
        );
        console.log(homeNews);

        const mappedHomeNews = homeNews.map((hnews) => ({
          heading: hnews.headline,
          description: hnews.description,
          imageURL: hnews.news_image.url,
          news_image_alt: hnews.news_image_alt,
          url: hnews.url,
          last_updated: hnews.last_updated,
          tags: hnews.tags,
        })) as any;

        setHomeNewsData(mappedHomeNews);
      } catch (error: any) {
        throw new Error(error.message);
      }
    };

    Promise.allSettled([fetchLiveNews(), fetchHomeNews()]).finally(() =>
      setIsLoading(false)
    );
  }, []);
  // console.log({ newsLiveData, homeNewsData });

  if (isLoading) return <Loader />;

  return (
    <div className="parent_container">
      <div className="news_live">
        <div className="news-title_body_image">
          <span className="news-title_body">
            <b style={{ color: "red" }}>Live</b>
            <h2>{newsLiveData.heading}</h2>
            <p>{newsLiveData.description}</p>
          </span>
          <img
            className="live_img"
            src={newsLiveData.imageURL}
            alt="News Image"
          />
        </div>
      </div>
      <div className="home_news_container">
        {homeNewsData?.map((newsItem: HomeNewsEntry, i: number) => (
          <div key={i} className="">
            <HomeNewsItems newsItem={newsItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
