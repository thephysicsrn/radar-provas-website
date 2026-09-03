/**
 * RADAR - Dimensionador / Simulador Operacional para Escolas
 * js/simulator.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initProctorSimulator();
});

function initProctorSimulator() {
  const studentsSlider = document.getElementById('calcStudents');
  const roomsSlider = document.getElementById('calcRooms');
  const hoursSlider = document.getElementById('calcHours');
  const examTypeSelect = document.getElementById('calcExamType');

  if (!studentsSlider || !roomsSlider) return;

  const studentsValBadge = document.getElementById('calcStudentsVal');
  const roomsValBadge = document.getElementById('calcRoomsVal');
  const hoursValBadge = document.getElementById('calcHoursVal');

  const outRoomProctors = document.getElementById('outRoomProctors');
  const outRovingProctors = document.getElementById('outRovingProctors');
  const outCoordinators = document.getElementById('outCoordinators');
  const outSecurityPacks = document.getElementById('outSecurityPacks');
  const outSetupTime = document.getElementById('outSetupTime');
  const btnExportWhatsapp = document.getElementById('btnExportWhatsapp');

  function calculate() {
    const students = parseInt(studentsSlider.value, 10);
    const rooms = parseInt(roomsSlider.value, 10);
    const hours = parseFloat(hoursSlider.value);
    const examType = examTypeSelect ? examTypeSelect.value : 'school';

    // Atualiza badges visuais
    if (studentsValBadge) studentsValBadge.textContent = `${students} Alunos`;
    if (roomsValBadge) roomsValBadge.textContent = `${rooms} Salas`;
    if (hoursValBadge) hoursValBadge.textContent = `${hours}h de Prova`;

    // Regras operacionais de dimensionamento RADAR:
    // Fiscais de sala: 1 fiscal por sala para até 35 alunos por sala; 2 fiscais se ENEM/Concurso ou salas grandes
    let proctorsPerRoom = (examType === 'enem' || examType === 'contest') ? 2 : 1;
    if (students / rooms > 35) proctorsPerRoom = 2;
    const totalRoomProctors = rooms * proctorsPerRoom;

    // Fiscais volantes / sanitário / corredores: 1 para cada 4 a 5 salas (mínimo 1)
    const rovingProctors = Math.max(1, Math.ceil(rooms / 4));

    // Coordenadores de aplicação dedicados: 1 para até 15 salas; 2 para mais
    const coordinators = rooms > 15 ? 2 : 1;

    // Malotes de segurança e lacres
    const securityPacks = rooms;

    // Tempo de montagem e briefing
    const setupMinutes = 45 + (rooms * 2);

    // Atualiza saídas na tela
    if (outRoomProctors) outRoomProctors.textContent = `${totalRoomProctors} Profissionais`;
    if (outRovingProctors) outRovingProctors.textContent = `${rovingProctors} Fiscais Volantes`;
    if (outCoordinators) outCoordinators.textContent = `${coordinators} Coordenador(es)`;
    if (outSecurityPacks) outSecurityPacks.textContent = `${securityPacks} Malotes Lacrados`;
    if (outSetupTime) outSetupTime.textContent = `${setupMinutes} min antes`;

    // Configura mensagem direta do WhatsApp
    if (btnExportWhatsapp) {
      const typeLabel = examTypeSelect ? examTypeSelect.options[examTypeSelect.selectedIndex].text : 'Aplicação de Prova';
      const msg = encodeURIComponent(
        `Olá, equipe RADAR! Gostaria de uma proposta com base na simulação do site:\n\n` +
        `📚 Tipo de Avaliação: ${typeLabel}\n` +
        `👥 Alunos: ${students}\n` +
        `🚪 Salas: ${rooms}\n` +
        `⏱️ Duração: ${hours}h\n` +
        `📋 Estrutura Estimada: ${totalRoomProctors} Fiscais de Sala + ${rovingProctors} Volantes + ${coordinators} Coordenador(es).\n\n` +
        `Como podemos agendar uma reunião para formalizar?`
      );
      btnExportWhatsapp.setAttribute('href', `https://wa.me/5584999999999?text=${msg}`);
    }
  }

  // Event Listeners
  studentsSlider.addEventListener('input', calculate);
  roomsSlider.addEventListener('input', calculate);
  hoursSlider.addEventListener('input', calculate);
  if (examTypeSelect) examTypeSelect.addEventListener('change', calculate);

  // Cálculo inicial
  calculate();
}
