import React from 'react';

const Favorites = ({ recent, favorite, onSelect, onPin }) => {
  return (
    <div className="my-6 p-4 bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl">
      <h3 className="text-lg font-bold mb-2">Recent Cities</h3>
      <div className="flex flex-wrap gap-2">
        {favorite && (
          <button onClick={() => onSelect(favorite)} className="bg-yellow-500/50 hover:bg-yellow-500/70 text-white font-bold py-1 px-3 rounded-full text-sm transition-colors">
            ★ {favorite}
          </button>
        )}
            {recent.map((city) => (
          <div key={city} className="flex items-center bg-white/10 rounded-full">
            <button onClick={() => onSelect(city)} className="py-1 px-3 text-sm hover:bg-white/20 rounded-l-full transition-colors">
              {city}
            </button>
            {city !== favorite && (
              <button onClick={() => onPin(city)} title={`Pin ${city}`} className="py-1 px-2 text-yellow-400 hover:bg-white/20 rounded-r-full transition-colors">
                ☆
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
      );
};

export default Favorites;