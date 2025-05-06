import { createContext, useState } from 'react';

export const RouteContext = createContext();


export function RouteProvider({ children }) {
  const [filters, setFilters] = useState({});
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [routeGeoLine, setRouteGeoLine] = useState(null);
  const [price, setPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // добавили флаг загрузки

  return (
    <RouteContext.Provider value={{
      filters, setFilters,
      selectedPoints, setSelectedPoints,
      routeGeoLine, setRouteGeoLine,
      price, setPrice,
      isLoading, setIsLoading
    }}>
      {children}
    </RouteContext.Provider>
  );
}
