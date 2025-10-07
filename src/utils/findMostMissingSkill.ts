export function findMostMissingSkill(results: any[]) {
  const freq: Record<string, number> = {};
  results.forEach((r) => {
    r.missing_must_have_skills.forEach((s: string) => {
      freq[s] = (freq[s] || 0) + 1;
    });
  });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : 'N/A';
}
