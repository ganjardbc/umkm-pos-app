import { computed } from 'vue';
import { useTheme, type ThemeName } from './useTheme';

/**
 * Composable for theme-aware styling utilities
 * Provides computed properties for common styling patterns
 */
export function useThemeStyles() {
  const { currentTheme, isDarkMode } = useTheme();

  // Theme class for conditional styling
  const themeClass = computed(() => {
    return `theme-${currentTheme.value}`;
  });

  // Dark mode class
  const darkModeClass = computed(() => {
    return isDarkMode.value ? 'dark-mode' : 'light-mode';
  });

  // Combined theme classes
  const themeClasses = computed(() => {
    return [themeClass.value, darkModeClass.value];
  });

  // Get CSS variable value
  const getCSSVariable = (variableName: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  };

  // Get primary color
  const primaryColor = computed(() => {
    return getCSSVariable('--primary-500');
  });

  // Get secondary color
  const secondaryColor = computed(() => {
    return getCSSVariable('--secondary-500');
  });

  // Get accent color
  const accentColor = computed(() => {
    return getCSSVariable('--accent-500');
  });

  // Get tertiary color
  const tertiaryColor = computed(() => {
    return getCSSVariable('--tertiary-500');
  });

  // Get all primary shades
  const primaryShades = computed(() => {
    return {
      25: getCSSVariable('--primary-25'),
      50: getCSSVariable('--primary-50'),
      100: getCSSVariable('--primary-100'),
      200: getCSSVariable('--primary-200'),
      300: getCSSVariable('--primary-300'),
      400: getCSSVariable('--primary-400'),
      500: getCSSVariable('--primary-500'),
      600: getCSSVariable('--primary-600'),
      700: getCSSVariable('--primary-700'),
      800: getCSSVariable('--primary-800'),
      900: getCSSVariable('--primary-900'),
    };
  });

  // Get all secondary shades
  const secondaryShades = computed(() => {
    return {
      25: getCSSVariable('--secondary-25'),
      50: getCSSVariable('--secondary-50'),
      100: getCSSVariable('--secondary-100'),
      200: getCSSVariable('--secondary-200'),
      300: getCSSVariable('--secondary-300'),
      400: getCSSVariable('--secondary-400'),
      500: getCSSVariable('--secondary-500'),
      600: getCSSVariable('--secondary-600'),
      700: getCSSVariable('--secondary-700'),
      800: getCSSVariable('--secondary-800'),
      900: getCSSVariable('--secondary-900'),
    };
  });

  // Get all accent shades
  const accentShades = computed(() => {
    return {
      25: getCSSVariable('--accent-25'),
      50: getCSSVariable('--accent-50'),
      100: getCSSVariable('--accent-100'),
      200: getCSSVariable('--accent-200'),
      300: getCSSVariable('--accent-300'),
      400: getCSSVariable('--accent-400'),
      500: getCSSVariable('--accent-500'),
      600: getCSSVariable('--accent-600'),
      700: getCSSVariable('--accent-700'),
      800: getCSSVariable('--accent-800'),
      900: getCSSVariable('--accent-900'),
    };
  });

  // Get all tertiary shades
  const tertiaryShades = computed(() => {
    return {
      25: getCSSVariable('--tertiary-25'),
      50: getCSSVariable('--tertiary-50'),
      100: getCSSVariable('--tertiary-100'),
      200: getCSSVariable('--tertiary-200'),
      300: getCSSVariable('--tertiary-300'),
      400: getCSSVariable('--tertiary-400'),
      500: getCSSVariable('--tertiary-500'),
      600: getCSSVariable('--tertiary-600'),
      700: getCSSVariable('--tertiary-700'),
      800: getCSSVariable('--tertiary-800'),
      900: getCSSVariable('--tertiary-900'),
    };
  });

  // Get color by name and shade
  const getColor = (colorName: 'primary' | 'secondary' | 'accent' | 'tertiary', shade: number = 500): string => {
    const shadeKey = `--${colorName}-${shade}`;
    return getCSSVariable(shadeKey);
  };

  // Get contrasting text color based on background
  const getContrastColor = (backgroundColor: string): string => {
    // Simple luminance calculation
    const rgb = backgroundColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) return '#000000';

    const luminance = (0.299 * parseInt(rgb[0]) + 0.587 * parseInt(rgb[1]) + 0.114 * parseInt(rgb[2])) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  // Get gradient
  const getGradient = (colorName: 'primary' | 'secondary' | 'accent' | 'tertiary', direction: 'to-right' | 'to-bottom' = 'to-right'): string => {
    const startColor = getColor(colorName, 900);
    const endColor = getColor(colorName, 500);
    return `linear-gradient(${direction}, ${startColor}, ${endColor})`;
  };

  // Get shadow color
  const getShadowColor = (): string => {
    return isDarkMode.value ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)';
  };

  // Get border color
  const getBorderColor = (shade: number = 300): string => {
    return getColor('primary', shade);
  };

  // Get background color
  const getBackgroundColor = (): string => {
    return isDarkMode.value ? getColor('primary', 900) : getColor('tertiary', 50);
  };

  // Get text color
  const getTextColor = (): string => {
    return isDarkMode.value ? getColor('tertiary', 100) : getColor('primary', 900);
  };

  // Get hover color
  const getHoverColor = (baseColor: string): string => {
    // Darken if light, lighten if dark
    return isDarkMode.value ? getColor('primary', 700) : getColor('primary', 600);
  };

  // Style object for common patterns
  const buttonStyle = computed(() => ({
    backgroundColor: primaryColor.value,
    color: 'white',
    borderColor: primaryColor.value,
  }));

  const cardStyle = computed(() => ({
    backgroundColor: isDarkMode.value ? getColor('primary', 800) : getColor('tertiary', 50),
    borderColor: getBorderColor(),
    color: getTextColor(),
  }));

  const inputStyle = computed(() => ({
    backgroundColor: isDarkMode.value ? getColor('primary', 700) : 'white',
    borderColor: getBorderColor(),
    color: getTextColor(),
  }));

  return {
    // Classes
    themeClass,
    darkModeClass,
    themeClasses,

    // Colors
    primaryColor,
    secondaryColor,
    accentColor,
    tertiaryColor,

    // Shades
    primaryShades,
    secondaryShades,
    accentShades,
    tertiaryShades,

    // Utilities
    getCSSVariable,
    getColor,
    getContrastColor,
    getGradient,
    getShadowColor,
    getBorderColor,
    getBackgroundColor,
    getTextColor,
    getHoverColor,

    // Style objects
    buttonStyle,
    cardStyle,
    inputStyle,
  };
}
