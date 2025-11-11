const N = 5;
const deepCopy = (matrix) => matrix.map((row) => [...row]);
export const isReflexive = (matrix) => {
  for (let i = 0; i < N; i++) {
    if (matrix[i][i] !== 1) return false;
  }
  return true;
};

export const isSymmetric = (matrix) => {
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (matrix[i][j] !== matrix[j][i]) return false;
    }
  }
  return true;
};

export const isTransitive = (matrix) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        if (matrix[i][j] === 1 && matrix[j][k] === 1 && matrix[i][k] !== 1) {
          return false;
        }
      }
    }
  }
  return true;
};


export const getReflexiveClosure = (matrix) => {
  const closure = deepCopy(matrix);
  for (let i = 0; i < N; i++) {
    closure[i][i] = 1;
  }
  return closure;
};

export const getSymmetricClosure = (matrix) => {
  const closure = deepCopy(matrix);
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (closure[i][j] === 1 || closure[j][i] === 1) {
        closure[i][j] = 1;
        closure[j][i] = 1;
      }
    }
  }
  return closure;
};

export const getTransitiveClosure = (matrix) => {
  const closure = deepCopy(matrix);
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        closure[i][j] = closure[i][j] || (closure[i][k] && closure[k][j]);
      }
    }
  }
  return closure;
};

export const getEquivalenceClasses = (matrix) => {
  const classes = [];
  const visited = new Array(N).fill(false);
  const elements = [1, 2, 3, 4, 5];

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;

    const currentClass = [];
    visited[i] = true;
    currentClass.push(elements[i]);

    for (let j = i + 1; j < N; j++) {
      if (matrix[i][j] === 1) {
        visited[j] = true;
        currentClass.push(elements[j]);
      }
    }
    classes.push(currentClass);
  }
  return classes.map(cls => `{${cls.join(', ')}}`).join(', ');
};

export const analyzeRelation = (matrix) => {
  const results = {};
  results.originalMatrix = deepCopy(matrix);


  results.isReflexive = isReflexive(matrix);
  results.isSymmetric = isSymmetric(matrix);
  results.isTransitive = isTransitive(matrix);
  results.isEquivalence =
      results.isReflexive && results.isSymmetric && results.isTransitive;

  if (results.isEquivalence) {
    results.classes = getEquivalenceClasses(matrix);
  } else {
    results.closures = [];
    let currentMatrix = deepCopy(matrix);

    if (!results.isReflexive) {
      const closure = getReflexiveClosure(currentMatrix);
      results.closures.push({
        type: '반사(Reflexive)',
        before: deepCopy(currentMatrix),
        after: closure,
      });
      currentMatrix = closure;
    }

    if (!results.isSymmetric) {
      const closure = getSymmetricClosure(currentMatrix);
      results.closures.push({
        type: '대칭(Symmetric)',
        before: deepCopy(currentMatrix),
        after: closure,
      });
      currentMatrix = closure;
    }

    if (!results.isTransitive) {
      const closure = getTransitiveClosure(currentMatrix);
      results.closures.push({
        type: '추이(Transitive)',
        before: deepCopy(currentMatrix),
        after: closure,
      });
      currentMatrix = closure;
    }
    results.finalEquivalenceMatrix = currentMatrix;
    results.finalClasses = getEquivalenceClasses(currentMatrix);
  }

  return results;
};