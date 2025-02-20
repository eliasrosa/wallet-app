"use client"

import * as React from "react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const walletData = [
  { type: "fii", wallet: 0.45, fill: "var(--color-fii)" },
  { type: "rf", wallet: 0.15, fill: "var(--color-rf)" },
  { type: "stock", wallet: 0.05, fill: "var(--color-stock)" },
  { type: "etf", wallet: 0.35, fill: "var(--color-etf)" },
]

const goalData = [
  { type: "fii", goal: 0.25, fill: "var(--color-fii)" },
  { type: "rf", goal: 0.25, fill: "var(--color-rf)" },
  { type: "stock", goal: 0.25, fill: "var(--color-stock)" },
  { type: "etf", goal: 0.25, fill: "var(--color-etf)" },
]

const chartConfig = {
  wallet: {
    label: "Carteira",
  },
  goal: {
    label: "Meta",
  },
  fii: {
    label: "FII",
    color: "hsl(var(--chart-1))",
  },
  rf: {
    label: "R. Fixa",
    color: "hsl(var(--chart-2))",
  },
  stock: {
    label: "Ações",
    color: "hsl(var(--chart-3))",
  },
  etf: {
    label: "ETF",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function Component1() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Diagrama do Cerrado</CardTitle>
        <CardDescription>Comparativo entre sua carteira x meta por tipo de ativo</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="type"
                  labelFormatter={(_, payload) => {
                    return chartConfig[
                      payload?.[0].dataKey as keyof typeof chartConfig
                    ].label
                  }}
                />
              }
            />
            <Pie
              data={goalData}
              dataKey="goal"
              outerRadius={65}
              cornerRadius={3}
            >
              <LabelList
                dataKey="type"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
            <Pie
              data={walletData}
              dataKey="wallet"
              outerRadius={95}
              innerRadius={82}
              cornerRadius={5}
            >
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
