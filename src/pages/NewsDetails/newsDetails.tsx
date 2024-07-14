import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { EntrySDK } from "../../cs-sdk/entry";
import { cms } from "../../constants/cms";
import Loader from "../../components/Loader/loader";
import { HomeNewsEntry } from "../../utils/types";

import "./newsDetails.css";
import { ReferenceResponse } from "@contentstack/delivery-sdk";

const NewsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const articleId = location.pathname.split("/")[3];
  const queryValue = location.pathname.split("/").slice(2).join("/");

  const [newsDetails, setNewsDetails] = useState<HomeNewsEntry | null>(null);
  const [relatedNewsDetails, setRelatedNewsDetails] = useState<HomeNewsEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  // const newsDetailsRef = useRef<HTMLElement>();
  useEffect(() => {
    const fetchArticle = async (key: string, value: string) => {
      try {
        const res = await EntrySDK.getEntryByQuery(
          cms.content_type_uid.article_details,
          key,
          value
        );
        setNewsDetails(res.length ? res[0] : null);
      } catch (error) {
        console.error("Error fetching article:", error);
        setNewsDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) {
      fetchArticle("url", queryValue);
    }
    // newsDetailsRef.current.focus();
  }, [articleId, queryValue]);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      if (newsDetails && newsDetails.relates_news) {
        const relatedNewsItems = Object.values(
          newsDetails.relates_news
        ).flat() as any;
        try {
          const promises = relatedNewsItems.map(
            async (relatedNewsItem: ReferenceResponse) => {
              return await EntrySDK.getEntry(
                relatedNewsItem._content_type_uid,
                relatedNewsItem.uid
              );
            }
          );
          const relatedNews = await Promise.all(promises);
          setRelatedNewsDetails(relatedNews);
        } catch (error) {
          console.error("Error fetching related news:", error);
          setRelatedNewsDetails([]);
        }
      }
    };

    if (newsDetails) {
      fetchRelatedNews();
    }
  }, [newsDetails]);

  if (isLoading) return <Loader />;

  if (!newsDetails) {
    return (
      <div className="no_articleBox">
        <div>The Article might be broken or deleted by the Author.</div>
        <button
          className="medium_font-0_9 tag_button"
          style={{ marginTop: "2rem", border: "none" }}
          onClick={() => navigate("/news")}
        >
          {"<"} Back to All News
        </button>
      </div>
    );
  }

  return (
    <div className="news_details_container">
      <div className="news_details_header">
        <h1>{newsDetails.title}</h1>
        <span className="news-time_tag">
          <p className="small_font-0_7">
            {moment(newsDetails.last_updated).startOf("hour").fromNow()}
          </p>
        </span>
      </div>
      <div className="news_details_content">
        <div
          dangerouslySetInnerHTML={{ __html: newsDetails.rich_text_editor }}
        />
      </div>
      <div className="news_details_footer">
        <div className="news-time_tag">
          {newsDetails.tags?.map((tag, i) => (
            <p className="small_font-0_7 tag_button" key={i}>
              {tag.charAt(0).toUpperCase() + tag.substring(1)}
            </p>
          ))}
        </div>
        <button
          className="medium_font-0_9 empty_button"
          onClick={() => navigate("/news")}
        >
          Back to All News
        </button>
      </div>
      <div>
        <h4>Related News</h4>
        <div className="related_news">
          {relatedNewsDetails.map((rNews, i) => (
            <button
              className="related_news_item related_news_button"
              key={i}
              onClick={() => navigate(`/news/${rNews.url}`)}
            >
              <h6 className="small_font-0_7">{rNews.title}</h6>
              <span className="news-time_tag news-time_tag-2">
                <p className="small_font-0_7">
                  {moment(rNews.last_updated).startOf("hour").fromNow()}
                </p>
                <p className="small_font-0_7">{rNews.tags}</p>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
