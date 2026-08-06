/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/src/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/src/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, laptop: 150 },
  { date: "2024-04-02", desktop: 97, laptop: 180 },
  { date: "2024-04-03", desktop: 167, laptop: 120 },
  { date: "2024-04-04", desktop: 242, laptop: 260 },
  { date: "2024-04-05", desktop: 373, laptop: 290 },
  { date: "2024-04-06", desktop: 301, laptop: 340 },
  { date: "2024-04-07", desktop: 245, laptop: 180 },
  { date: "2024-04-08", desktop: 409, laptop: 320 },
  { date: "2024-04-09", desktop: 59, laptop: 110 },
  { date: "2024-04-10", desktop: 261, laptop: 190 },
  { date: "2024-04-11", desktop: 327, laptop: 350 },
  { date: "2024-04-12", desktop: 292, laptop: 210 },
  { date: "2024-04-13", desktop: 342, laptop: 380 },
  { date: "2024-04-14", desktop: 137, laptop: 220 },
  { date: "2024-04-15", desktop: 120, laptop: 170 },
  { date: "2024-04-16", desktop: 138, laptop: 190 },
  { date: "2024-04-17", desktop: 446, laptop: 360 },
  { date: "2024-04-18", desktop: 364, laptop: 410 },
  { date: "2024-04-19", desktop: 243, laptop: 180 },
  { date: "2024-04-20", desktop: 89, laptop: 150 },
  { date: "2024-04-21", desktop: 137, laptop: 200 },
  { date: "2024-04-22", desktop: 224, laptop: 170 },
  { date: "2024-04-23", desktop: 138, laptop: 230 },
  { date: "2024-04-24", desktop: 387, laptop: 290 },
  { date: "2024-04-25", desktop: 215, laptop: 250 },
  { date: "2024-04-26", desktop: 75, laptop: 130 },
  { date: "2024-04-27", desktop: 383, laptop: 420 },
  { date: "2024-04-28", desktop: 122, laptop: 180 },
  { date: "2024-04-29", desktop: 315, laptop: 240 },
  { date: "2024-04-30", desktop: 454, laptop: 380 },
  { date: "2024-05-01", desktop: 165, laptop: 220 },
  { date: "2024-05-02", desktop: 293, laptop: 310 },
  { date: "2024-05-03", desktop: 247, laptop: 190 },
  { date: "2024-05-04", desktop: 385, laptop: 420 },
  { date: "2024-05-05", desktop: 481, laptop: 390 },
  { date: "2024-05-06", desktop: 498, laptop: 520 },
  { date: "2024-05-07", desktop: 388, laptop: 300 },
  { date: "2024-05-08", desktop: 149, laptop: 210 },
  { date: "2024-05-09", desktop: 227, laptop: 180 },
  { date: "2024-05-10", desktop: 293, laptop: 330 },
  { date: "2024-05-11", desktop: 335, laptop: 270 },
  { date: "2024-05-12", desktop: 197, laptop: 240 },
  { date: "2024-05-13", desktop: 197, laptop: 160 },
  { date: "2024-05-14", desktop: 448, laptop: 490 },
  { date: "2024-05-15", desktop: 473, laptop: 380 },
  { date: "2024-05-16", desktop: 338, laptop: 400 },
  { date: "2024-05-17", desktop: 499, laptop: 420 },
  { date: "2024-05-18", desktop: 315, laptop: 350 },
  { date: "2024-05-19", desktop: 235, laptop: 180 },
  { date: "2024-05-20", desktop: 177, laptop: 230 },
  { date: "2024-05-21", desktop: 82, laptop: 140 },
  { date: "2024-05-22", desktop: 81, laptop: 120 },
  { date: "2024-05-23", desktop: 252, laptop: 290 },
  { date: "2024-05-24", desktop: 294, laptop: 220 },
  { date: "2024-05-25", desktop: 201, laptop: 250 },
  { date: "2024-05-26", desktop: 213, laptop: 170 },
  { date: "2024-05-27", desktop: 420, laptop: 460 },
  { date: "2024-05-28", desktop: 233, laptop: 190 },
  { date: "2024-05-29", desktop: 78, laptop: 130 },
  { date: "2024-05-30", desktop: 340, laptop: 280 },
  { date: "2024-05-31", desktop: 178, laptop: 230 },
  { date: "2024-06-01", desktop: 178, laptop: 200 },
  { date: "2024-06-02", desktop: 470, laptop: 410 },
  { date: "2024-06-03", desktop: 103, laptop: 160 },
  { date: "2024-06-04", desktop: 439, laptop: 380 },
  { date: "2024-06-05", desktop: 88, laptop: 140 },
  { date: "2024-06-06", desktop: 294, laptop: 250 },
  { date: "2024-06-07", desktop: 323, laptop: 370 },
  { date: "2024-06-08", desktop: 385, laptop: 320 },
  { date: "2024-06-09", desktop: 438, laptop: 480 },
  { date: "2024-06-10", desktop: 155, laptop: 200 },
  { date: "2024-06-11", desktop: 92, laptop: 150 },
  { date: "2024-06-12", desktop: 492, laptop: 420 },
  { date: "2024-06-13", desktop: 81, laptop: 130 },
  { date: "2024-06-14", desktop: 426, laptop: 380 },
  { date: "2024-06-15", desktop: 307, laptop: 350 },
  { date: "2024-06-16", desktop: 371, laptop: 310 },
  { date: "2024-06-17", desktop: 475, laptop: 520 },
  { date: "2024-06-18", desktop: 107, laptop: 170 },
  { date: "2024-06-19", desktop: 341, laptop: 290 },
  { date: "2024-06-20", desktop: 408, laptop: 450 },
  { date: "2024-06-21", desktop: 169, laptop: 210 },
  { date: "2024-06-22", desktop: 317, laptop: 270 },
  { date: "2024-06-23", desktop: 480, laptop: 530 },
  { date: "2024-06-24", desktop: 132, laptop: 180 },
  { date: "2024-06-25", desktop: 141, laptop: 190 },
  { date: "2024-06-26", desktop: 434, laptop: 380 },
  { date: "2024-06-27", desktop: 448, laptop: 490 },
  { date: "2024-06-28", desktop: 149, laptop: 200 },
  { date: "2024-06-29", desktop: 103, laptop: 160 },
  { date: "2024-06-30", desktop: 446, laptop: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  laptop: {
    label: "Laptop",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="red"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="red"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="white"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="white"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="laptop"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
