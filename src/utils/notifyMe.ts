// Client-side-only "notify me" email capture — no backend. Mirrors Revels'
// emailNotifications.ts but generalized to any scope instead of two hardcoded keys.

const emailsKey = (scope: string) => `${scope}_notify_emails`;
const timestampKey = (scope: string, email: string) => `${scope}_notify_${email}`;

export function getEmails(scope: string): string[] {
  try {
    const raw = localStorage.getItem(emailsKey(scope));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveEmail(scope: string, email: string): "added" | "duplicate" {
  const emails = getEmails(scope);
  if (emails.includes(email)) return "duplicate";

  emails.push(email);
  localStorage.setItem(emailsKey(scope), JSON.stringify(emails));
  localStorage.setItem(timestampKey(scope, email), new Date().toISOString());
  return "added";
}

export function getAllWithTimestamps(scope: string) {
  return getEmails(scope).map((email) => ({
    email,
    timestamp: localStorage.getItem(timestampKey(scope, email)) ?? "unknown",
  }));
}

export function exportAsCSV(scope: string): string {
  const rows = getAllWithTimestamps(scope);
  const header = "email,timestamp";
  const body = rows.map((r) => `${r.email},${r.timestamp}`).join("\n");
  return `${header}\n${body}`;
}

export function downloadCSV(scope: string) {
  const csv = exportAsCSV(scope);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${scope}_notify_emails.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function clearAll(scope: string) {
  const emails = getEmails(scope);
  emails.forEach((email) => localStorage.removeItem(timestampKey(scope, email)));
  localStorage.removeItem(emailsKey(scope));
}

declare global {
  interface Window {
    techTatvaNotify?: {
      getEmails: typeof getEmails;
      getAllWithTimestamps: typeof getAllWithTimestamps;
      exportAsCSV: typeof exportAsCSV;
      downloadCSV: typeof downloadCSV;
      clearAll: typeof clearAll;
    };
  }
}

if (typeof window !== "undefined") {
  window.techTatvaNotify = {
    getEmails,
    getAllWithTimestamps,
    exportAsCSV,
    downloadCSV,
    clearAll,
  };
}
