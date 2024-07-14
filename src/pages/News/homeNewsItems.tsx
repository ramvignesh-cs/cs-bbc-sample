import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const HomeNewsItems = ({ newsItem }: { newsItem: any }) => {
  const navigate = useNavigate();

  return (
    <div
      className="news-title_body_image-2"
      onClick={() => navigate(newsItem?.url)}
    >
      <img
        className="news_img"
        src={newsItem?.imageURL}
        alt={newsItem?.news_image_alt}
      />
      <span className="news-title_body">
        <h2 className="medium_font-0_9">{newsItem?.heading}</h2>
        <p className="medium_font-0_9">{newsItem?.description}</p>
      </span>
      <span className="news-time_tag">
        <p className="small_font-0_7">{moment(newsItem?.last_updated).startOf("hour").fromNow()}</p>
        <p className="small_font-0_7">{newsItem?.tags}</p>
      </span>
    </div>
  );
};

export default HomeNewsItems;
