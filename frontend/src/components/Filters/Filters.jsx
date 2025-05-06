import { useContext } from 'react';
import { RouteContext } from '../../contexts/RouteContext';
import { calculateRoute } from '../../services/routeService';

function Filters() {
  const {
    filters, setFilters,
    selectedPoints,
    setRouteGeoLine, setPrice,
    isLoading, setIsLoading
  } = useContext(RouteContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCalculate = async () => {
    if (selectedPoints.length !== 2) {
      alert('Выберите две точки на карте');
      return;
    }

    try {
      setIsLoading(true);
      const response = await calculateRoute(selectedPoints, filters);
      setRouteGeoLine(response.route);
      setPrice(response.price);
    } catch (error) {
      console.error(error);
      alert('Ошибка расчета маршрута');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      dayOfWeek: '',
      hasTransponder: false,
      transponderType: '',
      carClass: '',
      tripTime: '',
      tariff: '',
      licensePlateType: ''
    });
    // Очистка точек маршрута (если нужно)
    // setSelectedPoints([]);
  };

  return (
    <div className="w-80 bg-gray-800 text-white p-6 flex flex-col gap-4 h-screen">
      <h2 className="text-2xl font-bold mb-4">Рассчитать маршрут</h2>
      {/* Поля выбора точек */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Начальная точка</label>
          <input
            type="text"
            value={selectedPoints[0] ? `${selectedPoints[0].lat.toFixed(4)}, ${selectedPoints[0].lng.toFixed(4)}` : ''}
            readOnly
            className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Конечная точка</label>
          <input
            type="text"
            value={selectedPoints[1] ? `${selectedPoints[1].lat.toFixed(4)}, ${selectedPoints[1].lng.toFixed(4)}` : ''}
            readOnly
            className="w-full p-2 bg-gray-700 rounded border border-gray-600"/>
        </div>

        {/* Остальные фильтры */}
        <div>
          <label className="block text-sm mb-1">День недели</label>
          <select
            name="dayOfWeek"
            value={filters.dayOfWeek}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600">
            <option value="monday">Понедельник</option>
            <option value="tuesday">Вторник</option>
            <option value="wednesday">Среда</option>
            <option value="thursday">Четверг</option>
            <option value="friday">Пятница</option>
            <option value="saturday">Суббота</option>
            <option value="sunday">Воскресенье</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasTransponder"
            checked={filters.hasTransponder}
            onChange={handleChange}
            className="accent-blue-500"
          />
          <label className="text-sm">Наличие транспондера</label>
        </div>
        {filters.hasTransponder && (
          <div>
            <label className="block text-sm mb-1">Тип транспондера</label>
            <select
              name="transponderType"
              value={filters.transponderType}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600"
            >
              <option value="tPass">T-pass</option>
              <option value="glavdor">Главная дорога</option>
              <option value="m11">15-88 М-11</option>
              <option value="zsd">ЗСД</option>
            </select>
          </div>
        )}
        <div>
          <label className="block text-sm mb-1">Класс автомобиля</label>
          <select
            name="carClass"
            value={filters.carClass}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600"
          >
            <option value="firstClass">1 класс; Легковой транспорт</option>
            <option value="secondClass">2 класс; Среднегабаритный транспорт</option>
            <option value="thirdClass">3 класс; Грузовые и пассажирские транспортные средства</option>
            <option value="forthClass">4 класс; Крупногабаритные транспортные средства и автобусы</option>

          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Время поездки</label>
          <input
            type="time"
            name="tripTime"
            value={filters.tripTime}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Тариф</label>
          <select
            name="tariff"
            value={filters.tariff}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600"
          >
            <option value="base">Базовый</option>
            <option value="night">Транспондер</option>
            <option value="gosPost">По Госномеру; Постоплата (СДКП)</option>
            <option value="gosPred">По Госномеру; Предоплата (СДКП)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Тип гос. номера</label>
          <select
            name="licensePlateType"
            value={filters.licensePlateType}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600"
          >
            <option value="notMoscow">Не Москва</option>
            <option value="moscow">Москва и Московская область</option>
          </select>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Рассчитать'
          )}
        </button>
        <button
          onClick={handleClearFilters}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded">
          Очистить фильтр
        </button>
      </div>
    </div>
  );
}

export default Filters;