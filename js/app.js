/**
 * RADAR - Aplicativo Principal & Demonstrações Visuais
 * js/app.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveToastStream();
  initBentoInteractions();
});

// Toasts ilustrativos demonstrando o funcionamento da plataforma
function initLiveToastStream() {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const sampleEvents = [
    { title: 'Check-in Realizado', desc: 'Equipe de fiscalização alocada com sucesso.', icon: '📍' },
    { title: 'Cadeia de Custódia', desc: 'Protocolo de lacre conferido digitalmente.', icon: '🔒' },
    { title: 'Conformidade de Sala', desc: 'Sessão de aplicação em andamento sem desvios.', icon: '✅' },
    { title: 'Relatório Sincronizado', desc: 'Ata gerada e armazenada com segurança.', icon: '📑' },
    { title: 'Supervisão Ativa', desc: 'Fiscais volantes em ronda preventiva.', icon: '👥' }
  ];

  let eventIndex = 0;

  function showNextToast() {
    const ev = sampleEvents[eventIndex % sampleEvents.length];
    eventIndex++;

    const toast = document.createElement('div');
    toast.className = 'live-toast';
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${ev.icon}</span>
      <div>
        <div style="font-weight: 700; font-size: 0.84rem; color: var(--text-main);">${ev.title}</div>
        <div style="font-size: 0.76rem; color: var(--text-muted);">${ev.desc}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  }

  // Primeiro toast após 4 segundos, depois a cada 16 segundos
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 16000);
  }, 4000);
}

// Microinterações nos Cards Bento
function initBentoInteractions() {
  // Pílulas de Ações Rápidas no chat
  const quickPills = document.querySelectorAll('.quick-action-pill');
  const chatStream = document.querySelector('.chat-stream-preview');

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.textContent.trim();
      if (!chatStream) return;

      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg = document.createElement('div');
      newMsg.className = 'chat-bubble-item';
      newMsg.style.borderColor = 'var(--radar-yellow)';
      newMsg.innerHTML = `
        <div class="chat-bubble-text"><strong>Supervisão:</strong> Solicitação "${text}" registrada.</div>
        <span class="chat-bubble-time">${now}</span>
      `;
      chatStream.prepend(newMsg);
    });
  });

  // Botões de download e visualização de documento
  const docBtns = document.querySelectorAll('.doc-action-btn');
  docBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span>Baixando...</span>`;
      setTimeout(() => {
        btn.innerHTML = `<span>✓ Exemplo Baixado</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }, 700);
    });
  });
}
