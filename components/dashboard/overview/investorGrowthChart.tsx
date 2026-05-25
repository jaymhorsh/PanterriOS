'use client';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface InvestorGrowthChartItem {
  year: string;
  value: number;
  label: string;
}

export function InvestorGrowthChart({
  chartData,
}: {
  chartData: InvestorGrowthChartItem[];
}) {
  const [chartHeight, setChartHeight] = useState<number>(480);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function updateSize() {
      const w = window.innerWidth;
      if (w < 640) {
        setChartHeight(260);
        setIsMobile(true);
      } else if (w < 1024) {
        setChartHeight(340);
        setIsMobile(false);
      } else {
        setChartHeight(480);
        setIsMobile(false);
      }
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="border rounded-lg p-4">
      <div className="space-y-1 pb-2">
        <div className="font-semibold text-2xl">Investor Growth</div>
        <p>Platform adoption </p>
      </div>
      {chartData.length > 0 && (
        <div style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#155DFC" stopOpacity={0.24} />
                  <stop offset="90%" stopColor="#155DFC" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="#EEF2F7"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="year"
                axisLine={{ stroke: '#E6E9ED' }}
                tickLine={false}
                tick={{ fill: '#000', fontSize: isMobile ? 11 : 14 }}
                padding={{
                  left: isMobile ? 10 : 30,
                  right: isMobile ? 10 : 30,
                }}
              />
              <YAxis
                axisLine={{ stroke: '#E6E9ED' }}
                tickLine={false}
                tickFormatter={(v) => Number(v).toLocaleString()}
                tick={{ fill: '#000', fontSize: isMobile ? 11 : 14 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0];
                  return (
                    <div className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 shadow-lg">
                      <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#98A2B3]">
                        {p.payload.year} Platform Adoption
                      </p>
                      <p className="text-sm font-semibold text-[#155DFC]">
                        {Number(p.value).toLocaleString()} {p.payload.label}
                      </p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#155DFC"
                strokeWidth={1}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: '#155DFC',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
