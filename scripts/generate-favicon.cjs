const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '..', 'public', 'ut-logo.png');
const imgBase64 = fs.readFileSync(imgPath).toString('base64');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <!-- Dark High-Contrast Background Gradient -->
    <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050b17"/>
      <stop offset="100%" stop-color="#0d1b36"/>
    </linearGradient>

    <!-- Glowing Cyan-Blue Border -->
    <linearGradient id="badgeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d2ff"/>
      <stop offset="100%" stop-color="#3b5bff"/>
    </linearGradient>

    <!-- Drop Shadow Filter for Visibility -->
    <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.8"/>
      <feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="#00bdff" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- High-Contrast Squircle Badge (Visible on ANY browser tab: dark, light, or gray) -->
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#badgeBg)" stroke="url(#badgeBorder)" stroke-width="2.5"/>

  <!-- Centered UT Logo Emblem -->
  <g filter="url(#badgeShadow)">
    <image href="data:image/png;base64,${imgBase64}" x="8.5" y="9.5" width="47" height="45" preserveAspectRatio="xMidYMid meet"/>
  </g>
</svg>`;

const outputPath = path.join(__dirname, '..', 'public', 'favicon.svg');
fs.writeFileSync(outputPath, svgContent, 'utf8');
console.log('Created high-contrast favicon.svg successfully at:', outputPath);
