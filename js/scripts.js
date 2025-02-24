//CARROSSEL DE PLANOS
document.addEventListener('DOMContentLoaded', function () {
    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');
    var carousel = $('#productCarousel');

    prevButton.addEventListener('click', function () {
        carousel.carousel('prev');
    });

    nextButton.addEventListener('click', function () {
        carousel.carousel('next');
    });
});


//MODAL ACTIONS
document.addEventListener('DOMContentLoaded', function() {
    const chooseButtons = document.querySelectorAll('.choose-button');
    const chooseModal = new bootstrap.Modal(document.getElementById('chooseModal'));
    const chooseForm = document.getElementById('chooseForm');
    const packageInput = document.getElementById('package');
    const paymentMethod = document.getElementById('paymentMethod');
    const installmentsContainer = document.getElementById('installmentsContainer');
  
    chooseButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action to avoid scrolling
        const packageName = this.getAttribute('data-package');
        packageInput.value = packageName;
        chooseModal.show();
      });
    });
  
    paymentMethod.addEventListener('change', function() {
      if (this.value === 'Cartão de Crédito') {
        installmentsContainer.style.display = 'block';
      } else {
        installmentsContainer.style.display = 'none';
      }
    });
  
    chooseForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const packageName = packageInput.value;
      const paymentMethodValue = paymentMethod.value;
      const installments = paymentMethodValue === 'Cartão de Crédito' ? document.getElementById('installments').value : '';
  
        // Verificar se os valores estão sendo coletados corretamente
  console.log({ name, email, phone, packageName, paymentMethodValue, installments });

      const message = `Olá, meu nome é ${name}. Gostaria de escolher o pacote ${packageName}. Meu telefone é ${phone}. Forma de pagamento: ${paymentMethodValue}${installments ? `, em ${installments}x` : ''}.`;
  
      const whatsappLink = `https://wa.me/5538999488244?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    });
  });


//MASCARA TELEFONE
  document.getElementById('phone').addEventListener('input', function(event) {
    let input = event.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
    if (input.length > 11) input = input.slice(0, 11); // Limit to 11 digits
    const ddd = input.slice(0, 2);
    const prefix = input.slice(2, 7);
    const suffix = input.slice(7);
    let formatted = '';

    if (ddd) formatted += `(${ddd}) `;
    if (prefix) formatted += `${prefix} `;
    if (suffix) formatted += `${suffix}`;

    event.target.value = formatted.trim();
  });


  document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.before-after-container');
  
    containers.forEach(container => {
      const beforeImageSrc = container.getAttribute('data-before');
      const afterImageSrc = container.getAttribute('data-after');
  
      const beforeWrapper = document.createElement('div');
      beforeWrapper.classList.add('before-after-wrapper');
      const beforeImage = document.createElement('img');
      beforeImage.src = beforeImageSrc;
      beforeWrapper.appendChild(beforeImage);
  
      const afterImage = document.createElement('img');
      afterImage.src = afterImageSrc;
      container.appendChild(afterImage);
      container.appendChild(beforeWrapper);
  
      const slider = container.querySelector('.before-after-slider');
      let isDragging = false;
  
      const updateSlider = (x) => {
        x = Math.max(0, Math.min(x, container.offsetWidth));
        beforeWrapper.style.width = `${x}px`;
        slider.style.left = `${x}px`;
      };
  
      const onMouseMove = (e) => {
        if (!isDragging) return;
        const rect = container.getBoundingClientRect();
        updateSlider(e.clientX - rect.left);
      };
  
      const onTouchMove = (e) => {
        if (!isDragging) return;
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        updateSlider(touch.clientX - rect.left);
      };
  
      slider.addEventListener('mousedown', () => {
        isDragging = true;
      });
  
      slider.addEventListener('touchstart', () => {
        isDragging = true;
      });
  
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
  
      document.addEventListener('touchend', () => {
        isDragging = false;
      });
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onTouchMove);
    });
  });
  
  