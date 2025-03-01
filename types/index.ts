// types/index.ts

export interface LocationReport {
  id: number;
  latitude: number;
  longitude: number;
  provider: string;
  quality_score: number;
  sentiment_score: number;
  download_speed: number;
  upload_speed: number;
}

export interface ProviderStat {
  providerName: string;
  reportCount: number;
  avgSentiment: number;
  avgQuality: number;
  avgDownloadSpeed: number;
  avgUploadSpeed: number;
}

export interface MaxStats {
  maxQuality: number;
  maxDownloadSpeed: number;
  maxUploadSpeed: number;
  maxSentiment: number;
}

export interface DailyReport {
  date: string;
  count: number;
  avgQuality: number;
  avgSpeed: number;
}

export interface TrendStats {
  previousReports: number;
  previousQuality: number;
  previousDownloadSpeed: number;
  previousUploadSpeed: number;
  previousSentiment: number;
}

export interface HistoricalData {
  dates: string[];
  quality: number[];
  speed: number[];
  sentiment: number[];
}

export interface NetworkStats {
  providerStats: ProviderStat[];
  overallStats: {
    totalReports: number;
    averageSentiment: number;
    averageQuality: number;
    averageDownloadSpeed: number;
    averageUploadSpeed: number;
  };
  MaxStats: MaxStats;
  trends: TrendStats;
  historicalData: HistoricalData;
}
