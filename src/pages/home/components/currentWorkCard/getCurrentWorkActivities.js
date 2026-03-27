/**
 * Actividades que se muestran en las cards de "trabajo actual".
 * - warranty === "claimed" → SIEMPRE se muestran (sin importar otras condiciones).
 * - Si NO tiene warranty "claimed": se aplican el resto de condiciones (en curso, próximo) y no se muestran las warranty "solved".
 * Las que estén aquí NO se muestran en la tab Programadas.
 *
 * @param {Array} activities
 * @returns {Array} actividades para CurrentWorkCard
 */
export function getCurrentWorkActivities(activities) {
  if (!activities?.length) return [];

  const now = new Date();

  // 1) warranty === "claimed" → siempre se muestra
  const warrantyClaimed = activities.filter((a) => a.warranty === "claimed");

  // 2) Resto: sin warranty "claimed". Excluir "solved"; el resto por condiciones de siempre
  const rest = activities.filter((a) => a.warranty !== "claimed");
  const restEligible = rest.filter((a) => a.warranty !== "solved");
  if (restEligible.length === 0) {
    return warrantyClaimed;
  }

  // En curso / no confirm: going, on-progress, done, starting (solo del resto). No mostrar done ya cobrado (paid).
  const notConfirm = restEligible.filter(
    (a) =>
      a.status !== "cancelled" &&
      ["going", "on-progress", "done", "starting"].includes(a.status) &&
      !(a.status === "done" && a.paymentStatus === "paid")
  );

  // Próximo: solo UN confirm (moment "now" o el siguiente por fecha), del resto
  const confirmOnly = restEligible.filter((a) => a.status === "confirm");
  const nowMoment = confirmOnly.find((a) => a.moment === "now");
  let proximo = null;
  if (nowMoment) {
    proximo = nowMoment;
  } else {
    const withDate = confirmOnly
      .filter((a) => a.scheduledDateTime && new Date(a.scheduledDateTime) > now)
      .map((a) => ({ activity: a, diff: new Date(a.scheduledDateTime) - now }))
      .sort((a, b) => a.diff - b.diff);
    if (withDate.length) proximo = withDate[0].activity;
  }

  // Unir todo sin duplicar por id
  const seen = new Set(warrantyClaimed.map((a) => a.id));
  const result = [...warrantyClaimed];
  [...notConfirm, ...(proximo ? [proximo] : [])].forEach((a) => {
    if (!seen.has(a.id)) {
      seen.add(a.id);
      result.push(a);
    }
  });
  return result;
}
