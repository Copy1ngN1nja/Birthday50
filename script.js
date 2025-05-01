document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      attendance: '',
      drinks: [],
      hotel: ''
    };
  
    // Получаем присутствие
    const attendanceRadio = e.target.querySelector('input[name="attendance"]:checked');
    if (attendanceRadio) formData.attendance = attendanceRadio.value;

    // Получаем отель
    const hotelRadio = e.target.querySelector('input[name="hotel"]:checked');
    if (hotelRadio) formData.hotel = hotelRadio.value;
  
    // Получаем напитки
    const drinkCheckboxes = Array.from(e.target.querySelectorAll('input[name="drinks"]:checked'));
    formData.drinks = drinkCheckboxes.map(checkbox => checkbox.value);
  
    try {
      // Создаем iframe для обхода CORS
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
  
      // Создаем форму
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://script.google.com/macros/s/AKfycbxXXmpf_h6icaHg6cUeWflx8A6S4E92zWjLcmW419QDe5-JWgTzab1ZOT8SC1anFG-ViA/exec';
      
      // Добавляем данные
      for (const [key, value] of Object.entries(formData)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = (Array.isArray(value)) ? value.join(', ') : value;
        form.appendChild(input);
      }
  
      // Отправляем форму
      iframe.contentDocument.body.appendChild(form);
      form.submit();
  
      // Обработка успеха
      document.getElementById('message').innerHTML = '✅ Данные отправлены!';
      e.target.reset();
  
      // Удаляем iframe
      setTimeout(() => iframe.remove(), 5000);
  
    } catch (error) {
      document.getElementById('message').innerHTML = `❌ Ошибка: ${error.message}`;
      console.error('Детали ошибки:', error);
    }
  });
  
