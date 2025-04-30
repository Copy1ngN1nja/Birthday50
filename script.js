document.getElementById('surveyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      comment: e.target.comment.value
    };
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzrGvHdTwF9yEQNIFOAJCqGalfJJoyHMASDKuQLOQ3EpHqInZkO8RdvvF7MI8YQ3ZeEyQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      document.getElementById('message').innerHTML = '✅ Спасибо за ответ!';
      e.target.reset();
    } catch (error) {
      document.getElementById('message').innerHTML = '❌ Ошибка отправки';
    }
  });
  