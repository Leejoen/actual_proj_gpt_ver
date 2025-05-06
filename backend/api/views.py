# backend/api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def calculate_route(request):
    """
    Заглушка API для расчета маршрута
    Возвращает фиктивную геолинию и стоимость
    """
    data = request.data
    start_point = data.get('start')
    end_point = data.get('end')

    # Здесь заглушка маршрута - в реальности будет расчет
    fake_route = [
        [start_point['lat'], start_point['lng']],
        [end_point['lat'], end_point['lng']]
    ]
    fake_price = 150  # руб

    return Response({
        'route': fake_route,
        'price': fake_price
    })