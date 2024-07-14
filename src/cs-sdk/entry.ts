import { bootstrapContentStackSDK } from ".";
import { HomeNewsEntry, SingleAsset } from "../utils/types";

const Stack = bootstrapContentStackSDK();

const EntrySDK = {
  getEntry: async (content_type_uid: string, entry_uid: string) => {
    try {
      const res = await Stack.contentType(content_type_uid)
        .entry(entry_uid)
        .fetch();
      return res as HomeNewsEntry;
    } catch (error) {
      throw error;
    }
  },
  getEntries: async (content_type_uid: string) => {
    try {
      const res = await Stack.contentType(content_type_uid).entry().find();
      return res.entries as HomeNewsEntry[];
    } catch (error: any) {
      throw error.message;
    }
  },
  getEntryByQuery: async (
    content_type_uid: string,
    key: string,
    query: string
  ) => {
    try {
      const res = await Stack.contentType(content_type_uid)
        .entry()
        .query({ [key]: query })
        .find();
      return res.entries as HomeNewsEntry[];
    } catch (error: any) {
      throw error.message;
    }
  },
};

const AssetSDK = {
  getAsset: async (assetId: string) => {
    try {
      const res = await Stack.asset(assetId).fetch();
      return res as SingleAsset;
    } catch (error) {
      throw error;
    }
  },
};

export { EntrySDK, AssetSDK };
