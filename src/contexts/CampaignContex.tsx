// src/context/CampaignContext.tsx
import { createContext } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ListCampaign } from "@/types/campaign";

export type ContextType<T> = {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<T, Error>>;
};

export const CampaignContext = createContext<ContextType<ListCampaign>>({
  refetch: (options?: RefetchOptions) =>
    Promise.resolve({} as QueryObserverResult<ListCampaign, Error>),
});
