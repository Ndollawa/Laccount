
enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

export function getDeviceThemeMode(): ThemeMode {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? ThemeMode.Dark : ThemeMode.Light;
}

