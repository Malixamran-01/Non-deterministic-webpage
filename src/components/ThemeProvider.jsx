import React, { useEffect } from 'react'

export default function ThemeProvider({ theme, children }) {
  useEffect(() => {
    const root = document.documentElement;

    // Provide a safe fallback theme if missing
    const safeTheme = theme && Array.isArray(theme.palette) && theme.palette.length >= 5
      ? theme
      : {
          palette: ['#ffffff', '#eeeeee', '#cccccc', '#999999', '#000000'],
          fonts: {
            body: 'Arial, sans-serif',
            heading: 'Georgia, serif',
            mono: 'Courier New, monospace'
          }
        };

    root.style.setProperty('--bg', safeTheme.palette[0]);
    root.style.setProperty('--fg', safeTheme.palette[4]);
    root.style.setProperty('--accent', safeTheme.palette[1]);
    root.style.setProperty('--surface', safeTheme.palette[1]);
    root.style.setProperty('--card', safeTheme.palette[2]);
    root.style.setProperty('--primary', safeTheme.palette[3]);

    if (safeTheme.fonts) {
      root.style.setProperty('--font-body', safeTheme.fonts.body);
      root.style.setProperty('--font-heading', safeTheme.fonts.heading);
      root.style.setProperty('--font-mono', safeTheme.fonts.mono);
    }
  }, [theme]);

  return children;
}


