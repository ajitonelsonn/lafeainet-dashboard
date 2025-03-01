// app/api/location-reports/route.ts
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const provider = searchParams.get("provider");
  const range = searchParams.get("timeRange"); // Remove default value here

  try {
    const connection = await getConnection();

    // Calculate date ranges with proper UTC handling
    const currentDate = new Date();
    let previousDate: Date;

    // Debug the incoming range parameter
    console.log("Incoming time range:", range);

    switch (range) {
      case "24h":
        previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        console.log("Selected 24h range");
        break;
      case "7d":
        previousDate = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        console.log("Selected 7d range");
        break;
      case "30d":
        previousDate = new Date(
          currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        console.log("Selected 30d range");
        break;
      case "90d":
        previousDate = new Date(
          currentDate.getTime() - 90 * 24 * 60 * 60 * 1000
        );
        console.log("Selected 90d range");
        break;
      default:
        previousDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        console.log("Using default 24h range");
    }

    // Convert dates to MySQL format
    const dateStr = previousDate.toISOString().slice(0, 19).replace("T", " ");

    let query = `
      SELECT 
        r.id,
        r.location_lat as latitude,
        r.location_lng as longitude,
        p.name as provider,
        r.network_quality_score as quality_score,
        r.sentiment_score,
        r.download_speed,
        r.upload_speed,
        r.created_at
      FROM network_reports r
      JOIN providers p ON r.provider_id = p.id
      WHERE r.location_lat IS NOT NULL 
        AND r.location_lng IS NOT NULL
        AND r.created_at >= STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s')
    `;

    const queryParams: any[] = [dateStr];

    if (provider) {
      query += ` AND p.name = ?`;
      queryParams.push(provider);
    }

    query += ` ORDER BY r.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [reports] = await connection.execute<RowDataPacket[]>(
      query,
      queryParams
    );

    // Log the results
    console.log("Found reports:", reports.length);

    const [providersResult] = await connection.execute<RowDataPacket[]>(
      `SELECT DISTINCT name FROM providers WHERE is_active = true ORDER BY name`
    );

    await connection.end();

    const providerNames = providersResult.map((p) => p.name);

    return NextResponse.json({
      reports: reports.map((report) => ({
        ...report,
        quality_score: Number(report.quality_score) || 0,
        sentiment_score: Number(report.sentiment_score) || 0,
        download_speed: Number(report.download_speed) || 0,
        upload_speed: Number(report.upload_speed) || 0,
        latitude: Number(report.latitude),
        longitude: Number(report.longitude),
      })),
      providers: providerNames,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location reports" },
      { status: 500 }
    );
  }
}
