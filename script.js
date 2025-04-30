document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      comment: e.target.comment.value
    };
  
    try {
      // Создаем hidden iframe для отправки формы без CORS-ограничений
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Создаем форму внутри iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://script.google.com/macros/s/AKfycbx1dSs0pum6eS-PcH9X0H8csFD0JiE4RXobWxmQMfI8BjfHeUnrhRnsyj4TxCjWBjvx4A/exec';
      
      // Добавляем поля формы
      for (const key in formData) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      }
      
      // Добавляем форму в iframe и отправляем
      iframe.contentDocument.body.appendChild(form);
      form.submit();
      
      // Показываем сообщение об успехе
      document.getElementById('message').innerHTML = '✅ Данные отправлены!';
      e.target.reset();
      
      // Удаляем iframe через 5 секунд
      setTimeout(() => document.body.removeChild(iframe), 5000);
      
    } catch (error) {
      document.getElementById('message').innerHTML = '❌ Ошибка: ' + error.message;
    }
  });
  
