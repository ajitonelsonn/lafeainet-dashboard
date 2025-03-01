// app/api/stats/route.ts
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "7d";

  try {
    const connection = await getConnection();

    // Calculate date ranges
    const currentDate = new Date();
    let previousDate: Date;
    let intervalStr: string;

    switch (range) {
      case "24h":
        previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        intervalStr = "HOUR";
        break;
      case "7d":
        previousDate = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        intervalStr = "DAY";
        break;
      case "30d":
        previousDate = new Date(
          currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        intervalStr = "DAY";
        break;
      case "90d":
        previousDate = new Date(
          currentDate.getTime() - 90 * 24 * 60 * 60 * 1000
        );
        intervalStr = "WEEK";
        break;
      default:
        previousDate = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        intervalStr = "DAY";
    }

    const [providerStats] = await connection.execute<RowDataPacket[]>(
      `
      SELECT 
        p.name as providerName,
        COUNT(*) as reportCount,
        AVG(r.sentiment_score) as avgSentiment,
        AVG(r.network_quality_score) as avgQuality,
        AVG(r.download_speed) as avgDownloadSpeed,
        AVG(r.upload_speed) as avgUploadSpeed
      FROM network_reports r
      JOIN providers p ON r.provider_id = p.id
      WHERE r.created_at >= ? and r.sentiment_score IS not NULL
      GROUP BY p.id, p.name
      ORDER BY reportCount DESC
    `,
      [previousDate.toISOString()]
    );

    // Get previous period stats
    const [previousStats] = await connection.execute<RowDataPacket[]>(
      `
      SELECT 
        COUNT(*) as totalReports,
        AVG(sentiment_score) as avgSentiment,
        AVG(network_quality_score) as avgQuality,
        AVG(download_speed) as avgDownloadSpeed,
        AVG(upload_speed) as avgUploadSpeed
      FROM network_reports
      WHERE created_at >= ? AND created_at < ?
    `,
      [
        new Date(
          previousDate.getTime() -
            (currentDate.getTime() - previousDate.getTime())
        ).toISOString(),
        previousDate.toISOString(),
      ]
    );

    // Get historical data
    const [historicalData] = await connection.execute<RowDataPacket[]>(
      `
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m-%d %H:00:00') as date,
        AVG(network_quality_score) as avgQuality,
        AVG(download_speed) as avgSpeed,
        AVG(sentiment_score) as avgSentiment
      FROM network_reports
      WHERE created_at >= ?
      GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d %H:00:00')
      ORDER BY date ASC
    `,
      [previousDate.toISOString()]
    );

    // Get max stats
    const [maxStats] = await connection.execute<RowDataPacket[]>(
      `
      SELECT
        MAX(network_quality_score) as maxQuality,
        MAX(download_speed) * 2 as maxDownloadSpeed,
        MAX(upload_speed) as maxUploadSpeed,
        MAX(sentiment_score) + 1 as maxSentiment
      FROM network_reports
      WHERE created_at >= ?
    `,
      [previousDate.toISOString()]
    );

    // Calculate overall stats
    const totalReports = (providerStats as RowDataPacket[]).reduce(
      (acc, curr) => acc + Number(curr.reportCount),
      0
    );

    const overallStats = {
      totalReports,
      averageSentiment:
        (providerStats as RowDataPacket[]).reduce(
          (acc, curr) =>
            acc + Number(curr.avgSentiment) * Number(curr.reportCount),
          0
        ) / totalReports || 0,
      averageQuality:
        (providerStats as RowDataPacket[]).reduce(
          (acc, curr) =>
            acc + Number(curr.avgQuality) * Number(curr.reportCount),
          0
        ) / totalReports || 0,
      averageDownloadSpeed:
        (providerStats as RowDataPacket[]).reduce(
          (acc, curr) =>
            acc + Number(curr.avgDownloadSpeed) * Number(curr.reportCount),
          0
        ) / totalReports || 0,
      averageUploadSpeed:
        (providerStats as RowDataPacket[]).reduce(
          (acc, curr) =>
            acc + Number(curr.avgUploadSpeed) * Number(curr.reportCount),
          0
        ) / totalReports || 0,
    };

    // Format historical data

    const formattedHistoricalData = {
      dates: historicalData.map((row) => {
        // Format date to be more readable
        const date = new Date(row.date);
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(date);
      }),
      quality: historicalData.map((row) => Number(row.avgQuality) || 0),
      speed: historicalData.map((row) => Number(row.avgSpeed) || 0),
      sentiment: historicalData.map((row) => Number(row.avgSentiment) || 0),
    };

    await connection.end();

    return NextResponse.json({
      providerStats: providerStats.map((provider) => ({
        ...provider,
        reportCount: Number(provider.reportCount),
        avgSentiment: Number(provider.avgSentiment) || 0,
        avgQuality: Number(provider.avgQuality) || 0,
        avgDownloadSpeed: Number(provider.avgDownloadSpeed) || 0,
        avgUploadSpeed: Number(provider.avgUploadSpeed) || 0,
      })),
      overallStats,
      MaxStats: {
        maxQuality: Number(maxStats[0].maxQuality) || 0,
        maxDownloadSpeed: Number(maxStats[0].maxDownloadSpeed) || 0,
        maxUploadSpeed: Number(maxStats[0].maxUploadSpeed) || 0,
        maxSentiment: Number(maxStats[0].maxSentiment) || 0,
      },
      trends: {
        previousReports: Number(previousStats[0].totalReports) || 0,
        previousQuality: Number(previousStats[0].avgQuality) || 0,
        previousDownloadSpeed: Number(previousStats[0].avgDownloadSpeed) || 0,
        previousUploadSpeed: Number(previousStats[0].avgUploadSpeed) || 0,
        previousSentiment: Number(previousStats[0].avgSentiment) || 0,
      },
      historicalData: formattedHistoricalData,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
