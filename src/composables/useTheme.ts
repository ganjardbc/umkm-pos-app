import { ref, watch, onMounted } from 'vue';
import { themeService, type ThemeName, type ThemeConfig, type ThemeState } from '../services/themeService';

const currentTheme = ref<ThemeName>('default');
const isDarkMode = ref(false);
const themeHistory = ref<ThemeName[]>([]);

export function useTheme() {
  // Initialize theme from service
  const initializeTheme = () => {
    themeService.initialize();
    updateRefs();
  };

  // Update refs from service
  const updateRefs = () => {
    const state = themeService.exportState();
    currentTheme.value = state.currentTheme;
    isDarkMode.value = state.isDarkMode;
    themeHistory.value = themeService.getThemeHistory();
  };

  // Subscribe to theme changes
  onMounted(() => {
    const unsubscribe = themeService.subscribe((state: ThemeState) => {
      currentTheme.value = state.currentTheme;
      isDarkMode.value = state.isDarkMode;
      themeHistory.value = themeService.getThemeHistory();
    });

    return () => unsubscribe();
  });

  // Set theme
  const setTheme = (themeName: ThemeName) => {
    themeService.setTheme(themeName);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    themeService.toggleDarkMode();
  };

  // Set dark mode
  const setDarkMode = (value: boolean) => {
    themeService.setDarkMode(value);
  };

  // Get all available themes
  const getAvailableThemes = (): ThemeConfig[] => {
    return themeService.getAvailableThemes();
  };

  // Get current theme
  const getCurrentTheme = (): ThemeConfig => {
    return themeService.getCurrentTheme();
  };

  // Get theme by name
  const getTheme = (name: ThemeName): ThemeConfig | null => {
    return themeService.getTheme(name);
  };

  // Get theme history
  const getHistory = (): ThemeName[] => {
    return themeService.getThemeHistory();
  };

  // Clear history
  const clearHistory = () => {
    themeService.clearHistory();
    themeHistory.value = [];
  };

  // Reset to default
  const reset = () => {
    themeService.reset();
    updateRefs();
  };

  // Export state
  const exportState = () => {
    return themeService.exportState();
  };

  // Import state
  const importState = (state: Partial<ThemeState>) => {
    themeService.importState(state);
    updateRefs();
  };

  return {
    // Reactive properties
    currentTheme,
    isDarkMode,
    themeHistory,

    // Methods
    initializeTheme,
    setTheme,
    toggleDarkMode,
    setDarkMode,
    getAvailableThemes,
    getCurrentTheme,
    getTheme,
    getHistory,
    clearHistory,
    reset,
    exportState,
    importState,
  };
}

// Export types
export type { ThemeName, ThemeConfig, ThemeState } from '../services/themeService';
