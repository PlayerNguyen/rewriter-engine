import { clsx, type ClassValue } from "clsx";

// Simple tailwind-merge replacement - handles common conflicts
function twMerge(...classes: (string | undefined | false | null)[]): string {
  // Split all classes, track last occurrence of each
  const classMap = new Map<string, string>();
  const order: string[] = [];
  
  for (const cls of classes) {
    if (!cls) continue;
    for (const c of cls.split(/\s+/)) {
      if (!c) continue;
      // Use the class prefix (before first '-') as key for conflict detection
      const prefix = c.match(/^(bg|text|border|rounded|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w|h|min|max|gap|flex|grid|justify|items|self|order|font|leading|tracking|shadow|ring|outline|opacity|z|inset|top|right|bottom|left|overflow|whitespace|truncate)/)?.[0] || c;
      if (classMap.has(prefix)) {
        // Remove old class with same prefix
        const old = classMap.get(prefix)!;
        const idx = order.indexOf(old);
        if (idx !== -1) order.splice(idx, 1);
      }
      classMap.set(prefix, c);
      order.push(c);
    }
  }
  
  return order.join(" ");
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(...inputs.map(c => clsx(c)));
}
