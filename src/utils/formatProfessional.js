export const formatProfession = (profession, gender) => {
  if (profession === 'FISIOTERAPEUTA') {
    return 'Fisioterapeuta';
  }
  if (profession === 'NUTRICIONISTA') {
    return 'Nutricionista';
  }
  if (profession === 'ASSISTENTE SOCIAL') {
    return 'Assistente Social';
  }
  if (profession === 'PSICÓLOGO(A)') {
    return gender === 'MASCULINO' ? 'Psicólogo' : 'Psicóloga';
  }
  if (profession === 'FONOAUDIÓLOGO(A)') {
    return gender === 'MASCULINO' ? 'Fonoaudiólogo' : 'Fonoaudióloga';
  }
  if (profession === 'EDUCADOR(A) FÍSICO(A)') {
    return gender === 'MASCULINO' ? 'Educador Físico' : 'Educadora Física';
  }
  if (profession === 'ODONTÓLOGO(A)') {
    return gender === 'MASCULINO' ? 'Odontólogo' : 'Odontóloga';
  }
  if (profession === 'BIOMÉDICO(A)') {
    return gender === 'MASCULINO' ? 'Biomédico' : 'Biomédica';
  }
  if (profession === 'FARMACÊUTICO(A)') {
    return gender === 'MASCULINO' ? 'Farmacêutico' : 'Farmacêutica';
  }
  if (profession === 'BIÓLOGO(A)') {
    return gender === 'MASCULINO' ? 'Biólogo' : 'Bióloga';
  }
  if (profession === 'MÉDICO(A)') {
    return gender === 'MASCULINO' ? 'Médico' : 'Médica';
  }
  return gender === 'MASCULINO' ? 'Enfermeiro' : 'Enfermeira';
};

export default formatProfession;
