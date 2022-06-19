import { ICurrency } from '../types';

const ListItem = ({ item }: { item: ICurrency }) => {
  const colour = (value: number) => {
    if (value < 0) return 'text-red-400';
    else return 'text-green-500';
  };

  return (
    <div className="px-6 py-6 hover:ring-white hover:border-white hover:cursor-pointer flex flex-col justify-center border-2 border-gray-900 rounded-lg items-center bg-transparent">
      <img alt={item.name} src={item.image} width="75" height="75"></img>
      <div>
        <p className="text-white mt-4 font-semibold leading-tight mb-0">{item.name}</p>
        <div className="display-inline">
          <p className="text-white">£{item.current_price}</p>
          {item.price_change_percentage_24h ? (
            <p className={`${colour(item.price_change_percentage_24h)}`}>
              {item.price_change_percentage_24h}%
            </p>
          ) : (
            <p className="text-sm text-gray-700 leading-tight">No price data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
