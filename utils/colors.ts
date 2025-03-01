// utils/colors.ts

export const generateColors = (names: string[]) => {
  const baseColors = [
    "#4338ca", // indigo-700
    "#0284c7", // sky-600
    "#059669", // emerald-600
    "#7c3aed", // violet-600
    "#db2777", // pink-600
    "#ea580c", // orange-600
    "#ca8a04", // yellow-600
    "#16a34a", // green-600
    "#2563eb", // blue-600
    "#9333ea", // purple-600
  ];

  // Create a dynamic color mapping
  const colorMap: { [key: string]: string } = {};

  names.forEach((name, index) => {
    if (index < baseColors.length) {
      // Use predefined colors first
      colorMap[name] = baseColors[index];
    } else {
      // Generate a unique color if we run out of base colors
      const hue = (index * 137.508) % 360; // Golden angle approximation
      const saturation = 65;
      const lightness = 45;
      colorMap[name] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
  });

  return colorMap;
};
