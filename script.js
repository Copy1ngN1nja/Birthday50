document.addEventListener('DOMContentLoaded', () => {
  const additionalFields = document.querySelector('.additional-fields');
  additionalFields.style.display = 'block';
  
  document.querySelectorAll('input[name="attendance"]').forEach(radio => {
      radio.addEventListener('change', handleAttendanceChange);
  });
  
  document.querySelectorAll('input[name="couple"]').forEach(radio => {
      radio.addEventListener('change', handleCoupleChange);
  });
});

function handleAttendanceChange(e) {
  const additionalFields = document.querySelector('.additional-fields');
  const shouldShow = e.target.value === 'yes';
  
  additionalFields.style.display = shouldShow ? 'block' : 'none';
  
  if (!shouldShow) {
      resetAdditionalFields();
      document.getElementById('partner-drinks').style.display = 'none';
  }
}

function handleCoupleChange(e) {
  const partnerDrinks = document.getElementById('partner-drinks');
  partnerDrinks.style.display = e.target.value === 'yes' ? 'block' : 'none';
}

function resetAdditionalFields() {
  document.querySelectorAll('.additional-fields input').forEach(input => {
      if (input.type === 'checkbox') input.checked = false;
      if (input.type === 'radio') input.checked = false;
  });
}

document.getElementById('surveyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      attendance: document.querySelector('input[name="attendance"]:checked')?.value || 'no',
      couple: 'no',
      drinks: [],
      partner_drinks: [],
      hotel: 'no'
  };

  if (formData.attendance === 'yes') {
      formData.couple = document.querySelector('input[name="couple"]:checked')?.value || 'no';
      formData.hotel = document.querySelector('input[name="hotel"]:checked')?.value || 'no';
      
      // Сбор напитков
      formData.drinks = Array.from(document.querySelectorAll('input[name="drinks"]:checked'))
          .map(checkbox => checkbox.value);
      
      // Сбор напитков пары
      if (formData.couple === 'yes') {
          formData.partner_drinks = Array.from(document.querySelectorAll('input[name="partner_drinks"]:checked'))
              .map(checkbox => checkbox.value);
      }
  }

  try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://script.google.com/macros/s/AKfycbyLXsqyvHFVgax-ZX9U_XwuUsuQrkAsK0u4nAhXH0kbVHtH-eCt4EbttJUlu-rM28j0TQ/exec';
      
      for (const [key, value] of Object.entries(formData)) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = Array.isArray(value) ? value.join(',') : value;
          form.appendChild(input);
      }
      
      iframe.contentDocument.body.appendChild(form);
      form.submit();
      
      document.getElementById('message').innerHTML = '✅ Данные отправлены! До встречи, друзья!';
      e.target.reset();
      setTimeout(() => {
          iframe.remove();
          document.querySelector('.additional-fields').style.display = 'none';
      }, 5000);
  } catch (error) {
      document.getElementById('message').innerHTML = `❌ Ошибка: ${error.message}`;
      console.error('Детали ошибки:', error);
  }
});
