import katzElements from './katzElements';

export const formatKatzToSumary = (data) => {
  const katz = [];
  if (data && data.katz) {
    for (const key of Object.keys(data.katz)) {
      if (data.katz[key] === true) {
        katz.push({ name: katzElements[key].title });
      }
    }
  }
  return katz;
};

export const formatProblemsToSumary = (data) => {
  const problems = [];
  if (data && data.health_problems) {
    for (const problem of data.health_problems) {
      if (problem.status) {
        let problemDescription = problem.name;
        if (problem.health_problem_subtype_id) {
          problemDescription = `${problemDescription} (${getSubtypeDescription(
            problem.health_problem_subtype_id,
            data.health_problems_subtypes,
          )})`;
        }
        problems.push({
          name: problemDescription,
        });
      }
    }
  }
  return problems;
};

export const formatNoteProblemsToSumary = (data) => {
  const note_problems = [];
  if (data && !!data.health_problem_note) {
    note_problems.push({ name: data.health_problem_note });
  }
  return note_problems;
};

export const formatDiseasesToSumary = (data) => {
  const diseases = [];
  if (data && data.diseases) {
    for (const disease of data.diseases) {
      if (disease.status) {
        let diseaseDescription = disease.name;
        if (disease.subtype_id || disease.disease_subtype_id) {
          diseaseDescription = `${diseaseDescription} (${getSubtypeDescription(
            disease.disease_subtype_id,
            data.disease_subtypes,
          )})`;
        }
        diseases.push({ name: diseaseDescription });
      }
    }
  }
  return diseases;
};

export const formatNoteDiseasesToSumary = (data) => {
  const note_diseases = [];
  if (data && !!data.disease_note) {
    note_diseases.push({ name: data.disease_note });
  }
  return note_diseases;
};

export const getSubtypeDescription = (id, subtypes) => {
  for (const sub of subtypes) {
    if (sub.id === id) {
      return sub.description;
    }
  }
  return null;
};

export const adjustParamsToNull = (params) => {
  if (params === undefined) {
    return null;
  }
  if (
    typeof params === 'string' &&
    (params === 'undefined' || params === 'null' || params === '')
  ) {
    return null;
  }
  if (typeof params === 'number' && Number.isNaN(params)) {
    return null;
  }
  if (typeof params === 'boolean') {
    return params;
  }
  if (Array.isArray(params)) {
    for (let i = 0; i < params.length; i++) {
      params[i] = adjustParamsToNull(params[i]);
    }
    return (params = params.filter(function (el) {
      return el != null;
    }));
  }
  if (typeof params === 'object') {
    if (params) {
      const _keys = Object.keys(params);
      for (let j = 0; j < _keys.length; j++) {
        const key = _keys[j];
        params[key] = adjustParamsToNull(params[key]);
      }
      return params;
    }
    return params;
  }
  return params;
};
