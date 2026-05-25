import { MarktShare } from './marktShare';
import PriceTrend from './priceTrend';

export function Forecasts() {
  return (
    <div>
      <PriceTrend />
      <div className=" grid lg:grid-cols-2 p-4 gap-4">
        <MarktShare />
      </div>
    </div>
  );
}
