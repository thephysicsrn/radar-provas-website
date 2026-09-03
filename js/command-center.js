/**
 * RADAR - Demonstração Interativa do Painel de Monitoramento
 * js/command-center.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initCommandCenter();
});

function initCommandCenter() {
  const roomButtons = document.querySelectorAll('.room-card-btn');
  if (!roomButtons.length) return;

  const roomNameEl = document.getElementById('cmdRoomName');
  const proctorNameEl = document.getElementById('cmdProctorName');
  const candidatesEl = document.getElementById('cmdCandidates');
  const timeRemainingEl = document.getElementById('cmdTimeRemaining');
  const integrityStatusEl = document.getElementById('cmdIntegrityStatus');
  const logFeedEl = document.getElementById('cmdLogFeed');
  const btnTriggerTestAlert = document.getElementById('btnTriggerTestAlert');

  const demoData = {
    'room-101': {
      name: 'Ambiente 01 • Aplicação Regular',
      proctor: 'Fiscal Líder + Assistente',
      candidates: '100% Presentes no Horário',
      time: '01:45:00',
      status: 'Conformidade Plena (100%)',
      statusClass: 'status-green',
      logs: [
        { time: '13:00', text: 'Check-in da equipe e conferência de protocolo' },
        { time: '13:15', text: 'Distribuição dos materiais com lacre verificado' },
        { time: '13:30', text: 'Aplicação iniciada com acompanhamento em tempo real' }
      ]
    },
    'room-102': {
      name: 'Ambiente 02 • Simulado Geral',
      proctor: 'Supervisão de Área',
      candidates: 'Ambiente Supervisionado',
      time: '02:15:00',
      status: 'Operação Ativa (100%)',
      statusClass: 'status-green',
      logs: [
        { time: '13:00', text: 'Verificação prévia de conformidade do ambiente' },
        { time: '13:30', text: 'Registro digital de início da sessão' },
        { time: '14:15', text: 'Ronda de apoio concluída sem ocorrências' }
      ]
    },
    'room-103': {
      name: 'Ambiente 03 • Processo Seletivo',
      proctor: 'Equipe de Aplicação e Apoio',
      candidates: 'Capacidade Total Atendida',
      time: '00:55:00',
      status: 'Monitoramento Contínuo',
      statusClass: 'status-blue',
      logs: [
        { time: '12:45', text: 'Posicionamento estratégico dos fiscais' },
        { time: '13:00', text: 'Instruções oficiais aos candidatos' },
        { time: '14:00', text: 'Sincronização de ata de presença' }
      ]
    },
    'room-104': {
      name: 'Ambiente 04 • Avaliação Digital',
      proctor: 'Suporte Técnico e Fiscalização',
      candidates: 'Terminais Conectados',
      time: '01:20:00',
      status: 'Segurança Digital Ativa',
      statusClass: 'status-green',
      logs: [
        { time: '13:00', text: 'Validação de ambiente seguro e credenciais' },
        { time: '13:15', text: 'Sessões de avaliação iniciadas simultaneamente' }
      ]
    }
  };

  function renderRoom(roomId) {
    const data = demoData[roomId];
    if (!data) return;

    if (roomNameEl) roomNameEl.textContent = data.name;
    if (proctorNameEl) proctorNameEl.textContent = data.proctor;
    if (candidatesEl) candidatesEl.textContent = data.candidates;
    if (timeRemainingEl) timeRemainingEl.textContent = data.time;
    if (integrityStatusEl) {
      integrityStatusEl.textContent = data.status;
      integrityStatusEl.className = `telemetry-val ${data.statusClass}`;
    }

    if (logFeedEl) {
      logFeedEl.innerHTML = data.logs.map(log => `
        <div class="chat-bubble-item">
          <div class="check-dot">✓</div>
          <div class="chat-bubble-text"><strong>${log.time}</strong> - ${log.text}</div>
        </div>
      `).join('');
    }
  }

  roomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roomButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const roomId = btn.getAttribute('data-room');
      renderRoom(roomId);
    });
  });

  // Simulação de ação rápida
  if (btnTriggerTestAlert) {
    btnTriggerTestAlert.addEventListener('click', () => {
      btnTriggerTestAlert.disabled = true;
      btnTriggerTestAlert.innerHTML = `<span class="pulse-dot"></span> Acionando Apoio Operacional...`;

      setTimeout(() => {
        if (logFeedEl) {
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const newLog = document.createElement('div');
          newLog.className = 'chat-bubble-item';
          newLog.style.borderColor = 'var(--radar-yellow)';
          newLog.style.background = 'var(--status-amber-bg)';
          newLog.innerHTML = `
            <div class="status-badge waiting">⚡ Demonstração</div>
            <div class="chat-bubble-text"><strong>${now}</strong> - Fiscal Volante de apoio acionado com tempo de resposta imediato.</div>
          `;
          logFeedEl.prepend(newLog);
        }

        btnTriggerTestAlert.disabled = false;
        btnTriggerTestAlert.innerHTML = `✓ Protocolo Demonstrado com Sucesso!`;

        setTimeout(() => {
          btnTriggerTestAlert.innerHTML = `⚡ Testar Resposta Operacional`;
        }, 3000);
      }, 700);
    });
  }

  // Inicializa
  renderRoom('room-101');
}
