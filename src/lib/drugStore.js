/**
 * drugStore.js — camada de persistência de medicamentos
 *
 * Estratégia:
 *  - A fonte de verdade inicial é src/data/drugs.js (dados embutidos no build)
 *  - Qualquer edição feita pelo painel é salva no localStorage como "override"
 *  - getDrugs() mescla: dados do localStorage têm precedência
 *  - Backup automático: toda alteração gera snapshot com timestamp no localStorage
 */

import { drugs as builtinDrugs } from '@/data/drugs';

const STORE_KEY = 'pedidrip_drugs';
const BACKUP_KEY = 'pedidrip_backups';
const MAX_BACKUPS = 20;

// ── Leitura ────────────────────────────────────────────────────────────────────

export function getDrugs() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [...builtinDrugs];
    return JSON.parse(raw);
  } catch {
    return [...builtinDrugs];
  }
}

// ── Escrita (com backup automático) ───────────────────────────────────────────

function saveWithBackup(drugs) {
  // Backup automático: salva snapshot anterior antes de sobrescrever
  try {
    const prev = localStorage.getItem(STORE_KEY);
    if (prev) {
      const backups = getBackups();
      backups.unshift({ timestamp: Date.now(), data: JSON.parse(prev) });
      if (backups.length > MAX_BACKUPS) backups.length = MAX_BACKUPS;
      localStorage.setItem(BACKUP_KEY, JSON.stringify(backups));
    }
  } catch { /* silencioso */ }

  localStorage.setItem(STORE_KEY, JSON.stringify(drugs));
}

// ── CRUD ──────────────────────────────────────────────────────────────────────

export function addDrug(drug) {
  const all = getDrugs();
  // Garante ID único
  const id = drug.id || drug.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  const newDrug = { ...drug, id };
  const updated = [...all, newDrug];
  saveWithBackup(updated);
  return updated;
}

export function updateDrug(id, patch) {
  const all = getDrugs();
  const updated = all.map((d) => (d.id === id ? { ...d, ...patch } : d));
  saveWithBackup(updated);
  return updated;
}

export function deleteDrug(id) {
  const all = getDrugs();
  const updated = all.filter((d) => d.id !== id);
  saveWithBackup(updated);
  return updated;
}

export function reorderDrugs(drugs) {
  saveWithBackup(drugs);
  return drugs;
}

// ── Import / Export ───────────────────────────────────────────────────────────

export function exportJSON() {
  const data = getDrugs();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pedidrip_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(jsonString) {
  const parsed = JSON.parse(jsonString);
  if (!Array.isArray(parsed)) throw new Error('JSON deve ser um array de medicamentos.');
  saveWithBackup(parsed);
  return parsed;
}

export function resetToBuiltin() {
  saveWithBackup([...builtinDrugs]);
  return [...builtinDrugs];
}

// ── Backups ───────────────────────────────────────────────────────────────────

export function getBackups() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function restoreBackup(timestamp) {
  const backups = getBackups();
  const found = backups.find((b) => b.timestamp === timestamp);
  if (!found) throw new Error('Backup não encontrado.');
  saveWithBackup(found.data);
  return found.data;
}

export function deleteBackup(timestamp) {
  const backups = getBackups().filter((b) => b.timestamp !== timestamp);
  localStorage.setItem(BACKUP_KEY, JSON.stringify(backups));
}

// Observação: o controle de acesso ao painel administrativo foi migrado para o
// sistema de autenticação do Base44 (papel de usuário "admin"). As funções locais
// de senha/sessão foram removidas — não há mais credenciais armazenadas no navegador.