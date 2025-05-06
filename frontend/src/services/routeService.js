// Заглушка API (заменить на реальное потом)
export async function calculateRoute(selectedPoints, filters) {
    console.log('Отправка на бекенд:', { selectedPoints, filters });
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          route: [
            [selectedPoints[0].lat, selectedPoints[0].lng],
            [selectedPoints[1].lat, selectedPoints[1].lng]
          ],
          price: Math.floor(Math.random() * 500) + 100 // случайная цена (временно, заглушка)
        });
      }, 1000);
    });
  }
  