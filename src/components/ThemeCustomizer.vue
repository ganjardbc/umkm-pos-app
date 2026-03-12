<template>
  <div class="theme-customizer">
    <div class="customizer-header">
      <h2>Theme Customizer</h2>
      <button @click="resetToDefault" class="btn-reset">
        ↻ Reset to Default
      </button>
    </div>

    <!-- Current Theme Info -->
    <div class="current-theme-info">
      <div class="info-item">
        <label>Current Theme:</label>
        <span class="theme-value">{{ getCurrentTheme().label }}</span>
      </div>
      <div class="info-item">
        <label>Mode:</label>
        <span class="mode-value">{{ isDarkMode ? '🌙 Dark' : '☀️ Light' }}</span>
      </div>
      <div class="info-item">
        <label>Last Changed:</label>
        <span class="time-value">{{ formatLastChanged() }}</span>
      </div>
    </div>

    <!-- Theme History -->
    <div v-if="themeHistory.length > 0" class="theme-history">
      <h3>Recent Themes</h3>
      <div class="history-buttons">
        <button
          v-for="(theme, index) in themeHistory.slice(0, 5)"
          :key="index"
          @click="setTheme(theme)"
          class="history-btn"
          :class="{ active: currentTheme === theme }"
        >
          {{ getTheme(theme)?.label }}
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <h3>Quick Actions</h3>
      <div class="action-buttons">
        <button
          v-for="theme in getAvailableThemes()"
          :key="theme.name"
          @click="setTheme(theme.name)"
          class="action-btn"
          :class="{ active: currentTheme === theme.name }"
        >
          {{ theme.label }}
        </button>
      </div>
    </div>

    <!-- Dark Mode Control -->
    <div class="dark-mode-control">
      <h3>Display Mode</h3>
      <div class="mode-buttons">
        <button
          @click="setDarkMode(false)"
          class="mode-btn"
          :class="{ active: !isDarkMode }"
        >
          ☀️ Light Mode
        </button>
        <button
          @click="setDarkMode(true)"
          class="mode-btn"
          :class="{ active: isDarkMode }"
        >
          🌙 Dark Mode
        </button>
      </div>
    </div>

    <!-- Export/Import -->
    <div class="export-import">
      <h3>Settings</h3>
      <div class="settings-buttons">
        <button @click="exportSettings" class="settings-btn">
          📥 Export Settings
        </button>
        <button @click="importSettings" class="settings-btn">
          📤 Import Settings
        </button>
      </div>
    </div>

    <!-- Hidden file input for import -->
    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="handleFileImport"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme, type ThemeName } from '../composables/useTheme';

const {
  currentTheme: activeTheme,
  isDarkMode: darkMode,
  themeHistory: history,
  setTheme,
  setDarkMode,
  getAvailableThemes,
  getCurrentTheme,
  getTheme,
  reset,
  exportState,
  importState,
} = useTheme();

const currentTheme = ref<ThemeName>('default');
const isDarkMode = ref(false);
const themeHistory = ref<ThemeName[]>([]);
const lastChanged = ref<number>(Date.now());
const fileInput = ref<HTMLInputElement>();

onMounted(() => {
  currentTheme.value = activeTheme.value;
  isDarkMode.value = darkMode.value;
  themeHistory.value = history.value;
});

const formatLastChanged = () => {
  const now = Date.now();
  const diff = now - lastChanged.value;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return 'Earlier';
};

const resetToDefault = () => {
  if (confirm('Reset theme to default settings?')) {
    reset();
    currentTheme.value = activeTheme.value;
    isDarkMode.value = darkMode.value;
    lastChanged.value = Date.now();
  }
};

const exportSettings = () => {
  const state = exportState();
  const dataStr = JSON.stringify(state, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `theme-settings-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

const importSettings = () => {
  fileInput.value?.click();
};

const handleFileImport = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const state = JSON.parse(content);
      importState(state);
      currentTheme.value = activeTheme.value;
      isDarkMode.value = darkMode.value;
      lastChanged.value = Date.now();
      alert('Settings imported successfully!');
    } catch (error) {
      alert('Failed to import settings. Invalid file format.');
      console.error('Import error:', error);
    }
  };
  reader.readAsText(file);

  // Reset file input
  if (target) {
    target.value = '';
  }
};
</script>

<style scoped>
.theme-customizer {
  padding: 1.5rem;
  background-color: var(--tertiary-50);
  border-radius: 0.5rem;
  border: 1px solid var(--primary-200);
}

.customizer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--primary-200);
}

.customizer-header h2 {
  margin: 0;
  color: var(--primary-900);
  font-size: 1.5rem;
}

.btn-reset {
  padding: 0.5rem 1rem;
  background-color: var(--secondary-500);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-reset:hover {
  background-color: var(--secondary-600);
  transform: translateY(-2px);
}

.current-theme-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.375rem;
  border: 1px solid var(--primary-200);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.theme-value,
.mode-value,
.time-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-900);
}

.theme-history,
.quick-actions,
.dark-mode-control,
.export-import {
  margin-bottom: 1.5rem;
}

.theme-history h3,
.quick-actions h3,
.dark-mode-control h3,
.export-import h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  color: var(--primary-900);
  font-weight: 600;
}

.history-buttons,
.action-buttons,
.mode-buttons,
.settings-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.history-btn,
.action-btn,
.mode-btn,
.settings-btn {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid var(--primary-300);
  border-radius: 0.375rem;
  color: var(--primary-700);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.history-btn:hover,
.action-btn:hover,
.mode-btn:hover,
.settings-btn:hover {
  border-color: var(--primary-500);
  background-color: var(--tertiary-100);
}

.history-btn.active,
.action-btn.active,
.mode-btn.active {
  background-color: var(--primary-500);
  border-color: var(--primary-500);
  color: white;
}

.settings-btn {
  flex: 1;
  min-width: 150px;
}

.settings-btn:hover {
  background-color: var(--accent-100);
}
</style>
