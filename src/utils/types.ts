import {
  BaseAsset,
  BaseEntry,
  ReferenceResponse,
} from "@contentstack/delivery-sdk";

export interface SingleAsset extends BaseAsset {}

export type RelatedNews = {
  [key: string]: ReferenceResponse[];
};

export interface HomeNewsEntry extends BaseEntry {
  heading: string;
  headline: string;
  body?: string;
  description?: string;
  url?: string;
  last_updated?: Date;
  news_image: BaseAsset;
  news_image_alt: string;
  news_images: { [key: string]: BaseAsset };
  rich_text_editor: string;
  relates_news: RelatedNews[];
}

export interface LiveNewsItem {
  heading: string;
  description: string;
  imageURL: string;
}

export interface HomeNewsItem extends LiveNewsItem {
  headline: string;
  news_image_alt: string;
  url: string;
  last_updated: Date;
}
