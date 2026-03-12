<template>
  <div class="theme-preview">
    <div class="preview-grid">
      <div
        v-for="theme in availableThemes"
        :key="theme.name"
        class="preview-card"
        :class="{ active: currentTheme === theme.name }"
        @click="selectTheme(theme.name)"
      >
        <!-- Color Swatches -->
        <div class="color-swatches">
          <div
            v-if="theme.colors"
            class="swatch-row"
          >
            <div
              class="swatch"
              :style="{ backgroundColor: theme.colors.primary }"
              :title="`Primary: ${theme.colors.primary}`"
            />
            <div
              class="swatch"
              :style="{ backgroundColor: theme.colors.secondary }"
              :title="`Secondary: ${theme.colors.secondary}`"
            />
            <div
              class="swatch"
              :style="{ backgroundColor: theme.colors.accent }"
              :title="`Accent: ${theme.colors.accent}`"
            />
            <div
              class="swatch"
              :style="{ backgroundColor: theme.colors.tertiary }"
              :title="`Tertiary: ${theme.colors.tertiary}`"
            />
          </div>
        </div>

        <!-- Theme Info -->
        <div class="theme-info">
          <h3 class="theme-name">{{ theme.label }}</h3>
          <p v-if="theme.description" class="theme-description">
            {{ theme.description }}
          </p>
        </div>

        <!-- Active Indicator -->
        <div v-if="currentTheme === theme.name" class="active-indicator">
          <span class="checkmark">✓</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme, type ThemeName } from '../composables/useTheme';

const { currentTheme: activeTheme, setTheme, getAvailableThemes } = useTheme();

const currentTheme = ref<ThemeName>('default');
const availableThemes = ref(getAvailableThemes());

onMounted(() => {
  currentTheme.value = activeTheme.value;
});

const selectTheme = (themeName: ThemeName) => {
  setTheme(themeName);
};
</script>

<style scoped>
.theme-preview {
  padding: 1.5rem;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.preview-card {
  position: relative;
  padding: 1rem;
  background-color: var(--tertiary-50);
  border: 2px solid var(--primary-200);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.preview-card:hover {
  border-color: var(--primary-500);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.preview-card.active {
  border-color: var(--primary-500);
  background-color: var(--primary-50);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-swatches {
  margin-bottom: 1rem;
}

.swatch-row {
  display: flex;
  gap: 0.5rem;
}

.swatch {
  flex: 1;
  height: 60px;
  border-radius: 0.375rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.swatch:hover {
  transform: scale(1.05);
}

.theme-info {
  margin-bottom: 0.5rem;
}

.theme-name {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-900);
}

.theme-description {
  margin: 0;
  font-size: 0.75rem;
  color: var(--primary-600);
  line-height: 1.4;
}

.active-indicator {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 28px;
  height: 28px;
  background-color: var(--primary-500);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.checkmark {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
