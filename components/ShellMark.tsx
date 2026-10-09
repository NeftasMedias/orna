import { SHELL_PATHS, SHELL_TRANSFORM, SHELL_VIEWBOX } from "@/lib/shell";

// Shell mark from the Oṛna logo. Inherits colour via currentColor.
export function ShellMark({ className }: { className?: string }) {
  return (
    <svg viewBox={SHELL_VIEWBOX} fill="currentColor" aria-hidden="true" className={className}>
      <g transform={SHELL_TRANSFORM}>
        {SHELL_PATHS.map((d) => (
          <path key={d.slice(0, 24)} d={d} />
        ))}
      </g>
    </svg>
  );
}
