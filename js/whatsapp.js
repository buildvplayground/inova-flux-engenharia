/**
 * WhatsApp Integration
 * Popup e botão flutuante de WhatsApp
 */

(function() {
  "use strict";

  // Configuração
  const WHATSAPP_NUMBER = "5511999999999"; // TODO: Trocar pelo número real
  const WHATSAPP_MESSAGE = "Olá! Gostaria de solicitar a análise comercial gratuita da minha operação.";

  // Inicializar WhatsApp
  function initWhatsApp() {
    // Criar botão flutuante
    createWhatsAppButton();

    // Criar modal
    createWhatsAppModal();

    // Event listeners
    attachEventListeners();
  }

  // Criar botão flutuante
  function createWhatsAppButton() {
    const button = document.createElement('a');
    button.id = 'whatsapp-float-btn';
    button.href = getWhatsAppURL();
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.className = 'whatsapp-btn';
    button.title = 'Fale conosco via WhatsApp';

    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.934 1.308l-.36-.182-3.741.992.951-3.487-.235-.374a9.861 9.861 0 011.516-4.383A9.875 9.875 0 0111.05 1c5.48 0 9.938 4.457 9.938 9.938 0 2.614-.997 5.067-2.636 6.934l-.235.374.992 3.741-3.487-.951-.374-.236a9.873 9.873 0 01-6.231 2.13"/>
      </svg>
    `;

    document.body.appendChild(button);
  }

  // Criar modal
  function createWhatsAppModal() {
    const modal = document.createElement('div');
    modal.id = 'whatsapp-modal';
    modal.className = 'whatsapp-modal';

    modal.innerHTML = `
      <div class="whatsapp-modal-content">
        <button class="whatsapp-modal-close" aria-label="Fechar">×</button>
        <h3>Converse com um especialista</h3>
        <p>Clique no botão abaixo para iniciar uma conversa via WhatsApp e receber uma análise personalizada.</p>
        <a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer" class="btn btn-cta" style="margin-top: 20px; display: block; text-align: center;">
          Iniciar chat via WhatsApp
        </a>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // Attach event listeners
  function attachEventListeners() {
    const floatBtn = document.getElementById('whatsapp-float-btn');
    const modal = document.getElementById('whatsapp-modal');
    const closeBtn = modal.querySelector('.whatsapp-modal-close');

    // Abrir modal ao clicar no botão flutuante
    floatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.add('visible');
    });

    // Fechar modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Fechar modal
  function closeModal() {
    const modal = document.getElementById('whatsapp-modal');
    if (modal) modal.classList.remove('visible');
  }

  // Gerar URL do WhatsApp
  function getWhatsAppURL() {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  }

  // Integração com formulário
  function handleFormSubmit(event) {
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Limpar formulário
        form.reset();

        // Mostrar mensagem de sucesso
        showSuccessMessage('Formulário enviado com sucesso! Redirecionando para WhatsApp...');

        // Redirecionar para WhatsApp após 1.5s
        setTimeout(function() {
          window.location.href = data.whatsapp_url;
        }, 1500);
      } else {
        showErrorMessage(data.error || 'Erro ao enviar formulário');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      showErrorMessage('Erro ao conectar com o servidor');
    });
  }

  // Mensagens de sucesso/erro
  function showSuccessMessage(message) {
    const msg = document.createElement('div');
    msg.className = 'form-message success';
    msg.textContent = message;
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
  }

  function showErrorMessage(message) {
    const msg = document.createElement('div');
    msg.className = 'form-message error';
    msg.textContent = message;
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 5000);
  }

  // Esperar DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsApp);
  } else {
    initWhatsApp();
  }

  // Expor para uso externo
  window.WhatsApp = {
    openModal: () => {
      const modal = document.getElementById('whatsapp-modal');
      if (modal) modal.classList.add('visible');
    },
    closeModal: closeModal,
    getURL: getWhatsAppURL,
    setNumber: (number) => {
      // Trocar número
      const floatBtn = document.getElementById('whatsapp-float-btn');
      if (floatBtn) {
        floatBtn.href = `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
      }
    }
  };

})();
