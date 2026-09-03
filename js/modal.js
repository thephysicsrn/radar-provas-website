/**
 * RADAR - Controle de Modais & Formulários
 * js/modal.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initModals();
});

function initModals() {
  const proposalModal = document.getElementById('proposalModal');
  const proctorModal = document.getElementById('proctorModal');
  
  const openProposalBtns = document.querySelectorAll('.btn-open-proposal');
  const openProctorBtns = document.querySelectorAll('.btn-open-proctor');
  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

  // Abre Modal de Proposta
  openProposalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (proposalModal) proposalModal.classList.add('active');
    });
  });

  // Abre Modal de Recrutamento de Fiscal
  openProctorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (proctorModal) proctorModal.classList.add('active');
    });
  });

  // Fecha Modais
  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close-btn')) {
        if (proposalModal) proposalModal.classList.remove('active');
        if (proctorModal) proctorModal.classList.remove('active');
      }
    });
  });

  // Fechar no ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (proposalModal) proposalModal.classList.remove('active');
      if (proctorModal) proctorModal.classList.remove('active');
    }
  });

  // Envio de formulário de proposta
  const proposalForm = document.getElementById('proposalForm');
  if (proposalForm) {
    proposalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const institution = document.getElementById('propInstitution').value;
      const contactName = document.getElementById('propContactName').value;
      const phone = document.getElementById('propPhone').value;
      const examType = document.getElementById('propExamType').value;
      const notes = document.getElementById('propNotes').value;

      const whatsappText = encodeURIComponent(
        `Olá! Sou ${contactName} da instituição *${institution}*.\n` +
        `Gostaria de solicitar uma proposta para aplicação de *${examType}*.\n` +
        `Telefone de contato: ${phone}\n` +
        (notes ? `Observações: ${notes}` : '')
      );

      // Abre WhatsApp direto
      window.open(`https://wa.me/5584999999999?text=${whatsappText}`, '_blank');
      if (proposalModal) proposalModal.classList.remove('active');
      proposalForm.reset();
    });
  }

  // Envio de formulário de fiscal
  const proctorForm = document.getElementById('proctorForm');
  if (proctorForm) {
    proctorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fiscName').value;
      const city = document.getElementById('fiscCity').value;
      const phone = document.getElementById('fiscPhone').value;
      const course = document.getElementById('fiscCourse').value;

      const whatsappText = encodeURIComponent(
        `Olá, equipe RADAR! Quero me cadastrar como fiscal de provas.\n\n` +
        `👤 Nome: ${name}\n` +
        `📍 Cidade/Bairro: ${city}\n` +
        `📱 WhatsApp: ${phone}\n` +
        `🎓 Formação/Curso: ${course}\n\n` +
        `Gostaria de saber as próximas datas de capacitação e escalas disponíveis!`
      );

      window.open(`https://wa.me/5584999999999?text=${whatsappText}`, '_blank');
      if (proctorModal) proctorModal.classList.remove('active');
      proctorForm.reset();
    });
  }
}
