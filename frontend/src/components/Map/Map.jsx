import { useEffect, useContext, useState } from 'react';
import { RouteContext } from '../../contexts/RouteContext';

function Map() {
  const {
    selectedPoints, setSelectedPoints,
    routeGeoLine, price
  } = useContext(RouteContext);

  const [mapInstance, setMapInstance] = useState(null);
  const [routePolyline, setRoutePolyline] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const REACT_APP_YMAPS_API_KEY = 'd785f4fe-3239-445d-b035-8948e6996bd7'

  // Инициализация карты с обработкой ошибок
  useEffect(() => {
    const ymapsScript = document.createElement('script');
  ymapsScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${REACT_APP_YMAPS_API_KEY}&lang=ru_RU`;
    ymapsScript.type = 'text/javascript';
    
    ymapsScript.onload = () => {
      window.ymaps.ready(() => {
        try {
          init();
          setMapLoading(false);
        } catch (error) {
          setMapError(true);
        }
      });
    };

    ymapsScript.onerror = () => {
      setMapError(true);
      setMapLoading(false);
    };

    document.head.appendChild(ymapsScript);

    return () => {
      document.head.removeChild(ymapsScript);
    };
  }, []);

  // Автоматическое центрирование и зум при выборе точек
  useEffect(() => {
    if (mapInstance && selectedPoints.length === 2) {
      const points = selectedPoints.map(point => [point.lat, point.lng]);
      mapInstance.setBounds(points, {
        checkZoomRange: true,
        zoomMargin: 50
      });
    }
  }, [selectedPoints, mapInstance]);

  const init = () => {
    const map = new window.ymaps.Map('map', {
      center: [55.751574, 37.573856],
      zoom: 9,
      controls: ['zoomControl']
    });

    map.events.add('click', (e) => {
      const coords = e.get('coords');
      if (selectedPoints.length < 2) {
        setSelectedPoints(prev => [...prev, { lat: coords[0], lng: coords[1] }]);
        new window.ymaps.Placemark(coords, {}, {
          preset: 'islands#icon',
          iconColor: '#0095b6'
        }).addTo(map.geoObjects);
      }
    });

    setMapInstance(map);
  };

  // Отрисовка маршрута
  useEffect(() => {
    if (mapInstance && routeGeoLine) {
      if (routePolyline) {
        mapInstance.geoObjects.remove(routePolyline);
      }
      const polyline = new window.ymaps.Polyline(routeGeoLine, {}, {
        strokeColor: "#FF0000",
        strokeWidth: 4,
        strokeOpacity: 0.7
      });
      mapInstance.geoObjects.add(polyline);
      setRoutePolyline(polyline);
    }
  }, [routeGeoLine, mapInstance, routePolyline]);

  return (
    <div className="relative flex-1 h-screen">
      {mapLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          Загрузка карты...
        </div>
      )}

      {mapError && (
        <div className="absolute inset-0 bg-red-50 flex items-center justify-center text-red-600 p-4 text-center">
          Ошибка загрузки карт. Пожалуйста, проверьте подключение к интернету
          и обновите страницу.
        </div>
      )}

      <div 
        id="map" 
        className="w-full h-full" 
        style={{ visibility: mapLoading || mapError ? 'hidden' : 'visible' }}
      >
      </div>

      {price && (
        <div className="absolute bottom-5 right-5 bg-white shadow-lg rounded-lg p-4 text-lg font-semibold">
          Стоимость: {price} руб.
        </div>
      )}
    </div>
  );
}

export default Map;