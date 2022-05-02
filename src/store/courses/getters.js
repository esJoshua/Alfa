export default {
  totalCursos(state) {
    return state.courses.length;
  },
  totalCupos(state) {
    let totalCupos = 0;
    state.courses.forEach((cupo) => {
      totalCupos = totalCupos + Number(cupo.cupos);
    });
    return totalCupos;
  },
  totalInscritos(state) {
    return state.courses.reduce((accumulator, course) => {
      accumulator = accumulator + Number(course.inscritos);
      return accumulator;
    }, 0);
  },
  cuposRestantes(state) {
    return state.courses.reduce((accumulator, course) => {
      accumulator = accumulator + Number(course.cupos - course.inscritos);
      return accumulator;
    }, 0);
  },
  cursosTerminados(state) {
    return state.courses.reduce((accumulator, item) => {
      accumulator = accumulator + item.estado;
      return accumulator;
    }, 0);
  },
  cursosActivos(state) {
    return state.courses.reduce((accumulator, item) => {
      accumulator = accumulator + !item.estado;
      return accumulator;
    }, 0);
  },
};
