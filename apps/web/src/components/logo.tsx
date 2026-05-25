import { cn } from "@diffy/ui/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 32"
      fill="none"
      className={cn("text-primary", className)}
    >
      <image href="/logo-mark.svg" x="0" y="0" width="30" height="32" />
      <text
        x="36"
        y="24"
        fill="currentColor"
        fontSize="24"
        fontFamily="'Fustat Variable', ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        letterSpacing="-0.055em"
      >
        diffy
      </text>
    </svg>
  );
}
