/**
 * Actividades que se muestran en las cards de "trabajo actual".
 * - Se muestran si status !== "confirm" (going, on-progress, done, starting) y todas las de garantía.
 * - Excepción "próximo": solo UN próximo (moment "now" o el siguiente confirm por fecha).
 * Las que estén aquí NO se muestran en la tab Programadas.
 *
 * @param {Array} activities
 * @returns {Array} actividades para CurrentWorkCard
 */
export function getCurrentWorkActivities(activities) {
  if (!activities?.length) return [];

  const now = new Date();

  // 1) En curso / no confirm: going, on-progress, done, starting + garantía
  const notConfirm = activities.filter(
    (a) =>
      a.status !== "cancelled" &&
      (["going", "on-progress", "done", "starting"].includes(a.status) ||
        a.warranty === "claimed")
  );

  // 2) Excepción "próximo": solo UN confirm — el de moment "now" o el siguiente por fecha
  const confirmOnly = activities.filter((a) => a.status === "confirm");
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

  // Orden: no confirm → próximo (uno) → sin duplicar
  const seen = new Set(notConfirm.map((a) => a.id));
  const result = [...notConfirm];
  if (proximo && !seen.has(proximo.id)) {
    seen.add(proximo.id);
    result.push(proximo);
  }
  return result;
}
