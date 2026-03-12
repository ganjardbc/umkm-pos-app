<template>
  <div class="theme-switcher">
    <!-- Theme Selector -->
    <div class="theme-selector">
      <label for="theme-select" class="theme-label">Theme:</label>
      <select
        id="theme-select"
        v-model="currentTheme"
        @change="handleThemeChange"
        class="theme-select"
      >
        <option v-for="theme in availableThemes" :key="theme.name" :value="theme.name">
          {{ theme.label }}
        </option>
      </select>
    </div>

    <!-- Dark Mode Toggle -->
    <div class="dark-mode-toggle">
      <label for="dark-mode-checkbox" class="dark-mode-label">
        <input
          id="dark-mode-checkbox"
          type="checkbox"
          v-model="isDarkMode"
          @change="handleDarkModeChange"
          class="dark-mode-checkbox"
        />
        <span class="toggle-text">{{ isDarkMode ? '🌙 Dark' : '☀️ Light' }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme, type ThemeName } from '../composables/useTheme';

const { currentTheme: activeTheme, isDarkMode: darkMode, setTheme, toggleDarkMode, getAvailableThemes } = useTheme();

const currentTheme = ref<ThemeName>('default');
const isDarkMode = ref(false);
const availableThemes = ref(getAvailableThemes());

onMounted(() => {
  currentTheme.value = activeTheme.value;
  isDarkMode.value = darkMode.value;
});

const handleThemeChange = () => {
  setTheme(currentTheme.value);
};

const handleDarkModeChange = () => {
  toggleDarkMode();
};
</script>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.theme-selector,
.dark-mode-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-label,
.dark-mode-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-700);
}

.theme-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--primary-300);
  border-radius: 0.375rem;
  background-color: var(--tertiary-50);
  color: var(--primary-700);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-select:hover {
  border-color: var(--primary-500);
  background-color: var(--tertiary-100);
}

.theme-select:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}

.dark-mode-checkbox {
  cursor: pointer;
  width: 1rem;
  height: 1rem;
}

.toggle-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-700);
}
</style>
