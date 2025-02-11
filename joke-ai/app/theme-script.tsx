import React from "react";

export function ThemeScript() {
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getTheme() {
              const storedTheme = localStorage.getItem('theme')
              if (storedTheme) return storedTheme
              
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            }
            
            const theme = getTheme()
            document.documentElement.classList.toggle('dark', theme === 'dark')
          })()
        `,
      }}
    />
  );
} 