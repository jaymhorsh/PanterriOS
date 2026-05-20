import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
interface ChartData {
  title: string;
  value: string | number;
  chartValue: number;
  percentage: number;
  target?: string | number;
  targetValue?: number;
  percentageDes?: string;
  color: string;
  percentageMovement: string;
}
export function OverViewPieChart({
  chart,
  isAnimationActive = true,
}: {
  chart: ChartData;
  isAnimationActive?: boolean;
}) {
  const targetValue = chart.targetValue ?? chart.chartValue;
  const progressValue = Math.min(chart.chartValue, targetValue);
  const remainderValue = Math.max(targetValue - progressValue, 0);
  const data = [
    { name: 'progress', value: progressValue, fill: chart.color },
    {
      name: 'remaining',
      value: remainderValue || targetValue,
      fill: '#F2F4F7',
    },
  ];

  return (
    <div className="">
      <div
        className="h-70 w-full"
        style={{
          outline: 0,
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{
            outline: 0,
          }}
        >
          <PieChart
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
            style={{
              outline: 0,
            }}
          >
            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="78%"
              innerRadius="58%"
              outerRadius="88%"
              stroke="none"
              cornerRadius={2}
              isAnimationActive={isAnimationActive}
              style={{
                outline: 0,
              }}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="-mt-19.5 flex justify-center">
        <span className="text-xl font-bold leading-none tracking-[-0.03em] text-[#18233A]">
          {chart.value}
        </span>
      </div>

      {chart.target && (
        <div className="mt-8 text-right  font-medium text-[#6B7A99]">
          Target: {chart.target}
        </div>
      )}
    </div>
  );
}
