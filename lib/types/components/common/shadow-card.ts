import type { HTMLAttributes } from "vue";

/**
 * Available shadow sizes
 */
export type ShadowSize
  = | "2xs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "none";

/**
 * Special shadow colors
 */
export type ShadowSpecialColor
  = | "inherit"
    | "current"
    | "transparent"
    | "black"
    | "white";

/**
 * Color shade variants (50-950)
 */
export type ColorShade
  = | "50" | "100" | "200" | "300" | "400" | "500"
    | "600" | "700" | "800" | "900" | "950";

/**
 * Base color names
 */
export type BaseColorName
  = | "red" | "orange" | "amber" | "yellow" | "lime" | "green"
    | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo"
    | "violet" | "purple" | "fuchsia" | "pink" | "rose"
    | "gray" | "slate" | "zinc" | "neutral" | "stone";

/**
 * Full color variants (color-shade format)
 */
export type ShadowColorVariant = `${BaseColorName}-${ColorShade}`;

/**
 * Complete shadow color type including special colors and all variants
 */
export type ShadowColor
  = | ShadowSpecialColor
    | ShadowColorVariant;

/**
 * Props interface for ShadowCard component
 */
export type ShadowCardProps = {
  /** Additional CSS classes to apply to the card */
  class?: HTMLAttributes["class"];
  /** Shadow intensity/size */
  shadowSize?: ShadowSize;
  /** Shadow color for light mode */
  shadowColor?: ShadowColor;
  /** Shadow color for dark mode */
  darkShadowColor?: ShadowColor;
};

/**
 * Default props for ShadowCard component
 */
export const SHADOW_CARD_DEFAULTS = {
  shadowSize: "lg" as const,
  shadowColor: undefined,
  darkShadowColor: "white" as const,
} satisfies Partial<ShadowCardProps>;

/**
 * Type guard to check if a string is a valid shadow color
 */
export function isValidShadowColor(color: string): color is ShadowColor {
  const specialColors: ShadowSpecialColor[] = ["inherit", "current", "transparent", "black", "white"];
  const baseColors: BaseColorName[] = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "gray",
    "slate",
    "zinc",
    "neutral",
    "stone",
  ];
  const shades: ColorShade[] = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

  // Check special colors
  if (specialColors.includes(color as ShadowSpecialColor)) {
    return true;
  }

  // Check color-shade format
  const parts = color.split("-");
  if (parts.length === 2) {
    const [colorName, shade] = parts;
    return baseColors.includes(colorName as BaseColorName) && shades.includes(shade as ColorShade);
  }

  return false;
}

/**
 * Type guard to check if a string is a valid shadow size
 */
export function isValidShadowSize(size: string): size is ShadowSize {
  const validSizes: ShadowSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "none"];
  return validSizes.includes(size as ShadowSize);
}
