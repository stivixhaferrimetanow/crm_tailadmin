import React from 'react'


const ProductCard = ({name , type , composition , composition_cost , productin_cost , total_cost , multimedia , sales_cost}) => {
    return(
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img
    className="w-full"
    src={`${multimedia}`}
    alt="Sunset in the mountains"
  />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{name}</div>
    <p className="text-gray-700 text-base">
      {type}
    </p>
    <p className="text-gray-700 text-base">
      {composition}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      {composition_cost}
    </span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      
    </span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      #winter
    </span>
  </div>
</div>

    )
}

export default ProductCard