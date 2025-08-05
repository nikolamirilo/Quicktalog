import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const startDate = new Date(new Date().setDate(new Date().getDate() - 2))
    const endDate = new Date(new Date().setDate(new Date().getDate() + 1))
    const res = await fetch(
      `${process.env.POSTHOG_HOST}/api/projects/${process.env.POSTHOG_PROJECT_ID!}/query/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.POSTHOG_KEY!}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: `SELECT 
    toDate(timestamp) AS date,
    formatDateTime(timestamp, '%H:00') AS hour,
    properties.$current_url AS current_url,
    COUNT(*) AS pageview_count,
    COUNT(DISTINCT properties.distinct_id) AS unique_visitors
FROM events
WHERE event = '$pageview'
  AND properties.$current_url NOT ILIKE '%admin%'
  AND properties.$current_url LIKE '%/service-catalogues/%'
  AND properties.$current_url NOT ILIKE '%localhost%'
  AND timestamp >= toDateTime('${startDate.toISOString().replace("Z", "000Z")}') 
  AND timestamp < toDateTime('${endDate.toISOString().replace("Z", "000Z")}')
GROUP BY date, hour, current_url
ORDER BY date DESC, hour DESC`,
          },
        }),
        cache: "no-store",
      }
    )
    // SELECT * FROM events WHERE timestamp >= toDateTime('2025-06-30T00:00:00Z') AND timestamp < toDateTime('2025-07-02T00:00:00Z')
    const eventsData = await res.json()
    const analyticsData = eventsData.results
      .map(([date, hour, current_url, pageview_count, unique_visitors]) => ({
        date,
        hour,
        current_url,
        pageview_count,
        unique_visitors,
      }))
      .filter((item) => !(item.pageview_count === 0 && item.unique_visitors === 0))

    // 1. Extract unique restaurant names from analyticsData
    const restaurantNames = [
      ...new Set(
        analyticsData
          .map((item) => {
            // Assuming current_url is like "/service-catalogues/[name]"
            const match = item.current_url.match(/\/service-catalogues\/([^/]+)/)
            return match ? match[1] : null
          })
          .filter(Boolean)
      ),
    ]

    // 2. Query all relevant restaurants in one go
    const { data: restaurants, error: restaurantError } = await supabase
      .from("service_catalogues")
      .select("name, created_by")
      .in("name", restaurantNames)

    if (restaurantError) {
      return NextResponse.json({ error: restaurantError.message }, { status: 500 })
    }

    // 3. Create a map for quick lookup
    const nameToUserId = {}
    ;(restaurants || []).forEach((r) => {
      nameToUserId[r.name] = r.created_by
    })

    // 4. Add user_id to each analytics row
    const analyticsDataWithUserId = analyticsData.map((item) => {
      const match = item.current_url.match(/\/service-catalogues\/([^/]+)/)
      const restaurantName = match ? match[1] : null
      return {
        ...item,
        user_id: restaurantName ? nameToUserId[restaurantName] : null,
      }
    })

    // 5. Upsert analyticsDataWithUserId
    const { data, error } = await supabase.from("analytics").upsert(analyticsDataWithUserId, {
      onConflict: "date,hour,current_url",
      ignoreDuplicates: true,
    })

    return NextResponse.json(
      {
        message: "Analytics inserted successfuly",
        options: {
          startDate: startDate.toISOString().replace("Z", "000Z"),
          endDate: endDate.toISOString().replace("Z", "000Z"),
        },
        inputData: analyticsData,
        response: data,
        error: error,
      },
      { status: 200 }
    )
  } catch (error) {
    return new Response("Error occurred while pinging.", { status: 500 })
  }
}
