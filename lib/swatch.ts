// Approximate colours for photo placeholders, matched from a product's colour name.
// Only used until real photos are added. The first keyword found in the colour name wins.
const swatches: Array<[RegExp, string]> = [
  [/indigo/i, "#33478c"],
  [/turquoise/i, "#2ba3a6"],
  [/teal/i, "#1f6f78"],
  [/royal blue|blue/i, "#3e5fa8"],
  [/blush|rose|pink/i, "#d39aa6"],
  [/lavender/i, "#b6a6d6"],
  [/mauve/i, "#9c7a8e"],
  [/plum/i, "#5b2a4e"],
  [/maroon/i, "#6e1f2a"],
  [/crimson|scarlet|deep red/i, "#a8232e"],
  [/rust/i, "#a4492a"],
  [/red/i, "#b3302e"],
  [/sunshine|yellow/i, "#e2b53a"],
  [/gold/i, "#c49a3a"],
  [/olive/i, "#6b6b3a"],
  [/forest|deep green/i, "#24533a"],
  [/green/i, "#3f7a4a"],
  [/cocoa|brown/i, "#5a3a2b"],
  [/sand|beige/i, "#cdb998"],
  [/charcoal|black|noir/i, "#2e2e33"],
  [/grey|gray/i, "#8c8c91"],
  [/ivory|white/i, "#eee6d6"],
  [/multicolour/i, "#c98b5a"],
];

export function swatchFor(colourName: string | undefined): string {
  if (!colourName) return "#9fb4dd";
  for (const [pattern, hex] of swatches) {
    if (pattern.test(colourName)) return hex;
  }
  return "#9fb4dd";
}
