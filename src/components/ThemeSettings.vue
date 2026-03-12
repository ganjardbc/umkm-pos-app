<template>
  <div class="theme-settings">
    <div class="settings-container">
      <h2 class="settings-title">Appearance Settings</h2>

      <!-- Theme Selection -->
      <div class="setting-group">
        <label class="setting-label">Theme</label>
        <div class="theme-grid">
          <button
            v-for="theme in availableThemes"
            :key="theme.name"
            @click="setTheme(theme.name)"
            :class="['theme-button', { active: currentTheme === theme.name }]"
          >
            <span class="theme-name">{{ theme.label }}</span>
            <span v-if="currentTheme === theme.name" class="checkmark">✓</span>
          </button>
        </div>
      </div>

      <!-- Dark Mode Toggle -->
      <div class="setting-group">
        <label class="setting-label">Dark Mode</label>
        <div class="toggle-container">
          <button
            @click="setDarkMode(false)"
            :class="['mode-button', { active: !isDarkMode }]"
          >
            ☀️ Light
          </button>
          <button
            @click="setDarkMode(true)"
            :class="['mode-button', { active: isDarkMode }]"
          >
            🌙 Dark
          </button>
        </div>
      </div>

      <!-- Current Settings Display -->
      <div class="current-settings">
        <p class="setting-info">
          <strong>Current Theme:</strong> {{ getCurrentTheme().label }}
        </p>
        <p class="setting-info">
          <strong>Mode:</strong> {{ isDarkMode ? 'Dark' : 'Light' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme, type ThemeName } from '../composables/useTheme';

const {
  currentTheme: activeTheme,
  isDarkMode: darkMode,
  setTheme,
  setDarkMode,
  getAvailableThemes,
  getCurrentTheme,
} = useTheme();

const currentTheme = ref<ThemeName>('default');
const isDarkMode = ref(false);
const availableThemes = ref(getAvailableThemes());

onMounted(() => {
  currentTheme.value = activeTheme.value;
  isDarkMode.value = darkMode.value;
});
</script>

<style scoped>
.theme-settings {
  padding: 1.5rem;
  background-color: var(--tertiary-50);
  border-radius: 0.5rem;
}

.settings-container {
  max-width: 600px;
}

.settings-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-900);
  margin-bottom: 1.5rem;
}

.setting-group {
  margin-bottom: 2rem;
}

.setting-label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-700);
  margin-bottom: 0.75rem;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.theme-button {
  position: relative;
  padding: 0.75rem;
  border: 2px solid var(--primary-300);
  border-radius: 0.375rem;
  background-color: white;
  color: var(--primary-700);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-button:hover {
  border-color: var(--primary-500);
  background-color: var(--tertiary-100);
}

.theme-button.active {
  border-color: var(--primary-500);
  background-color: var(--primary-50);
  color: var(--primary-900);
}

.theme-name {
  display: block;
  font-size: 0.875rem;
}

.checkmark {
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
  font-size: 1.25rem;
  color: var(--primary-500);
}

.toggle-container {
  display: flex;
  gap: 0.5rem;
}

.mode-button {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid var(--primary-300);
  border-radius: 0.375rem;
  background-color: white;
  color: var(--primary-700);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-button:hover {
  border-color: var(--primary-500);
  background-color: var(--tertiary-100);
}

.mode-button.active {
  border-color: var(--primary-500);
  background-color: var(--primary-50);
  color: var(--primary-900);
}

.current-settings {
  padding: 1rem;
  background-color: white;
  border-radius: 0.375rem;
  border: 1px solid var(--primary-200);
}

.setting-info {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: var(--primary-700);
}

.setting-info strong {
  color: var(--primary-900);
}
</style>
