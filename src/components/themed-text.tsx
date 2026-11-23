import { Platform, StyleSheet, Text, type TextProps } from "react-native";

import { Fonts, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "sectionTitle"
    | "subtitle"
    | "link"
    | "linkPrimary"
    | "code";
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[{ color: theme[themeColor ?? "text"] }, styles[type], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontFamily: "Outfit_500Medium",
  },
  sectionTitle: {
    fontSize: 23,
    fontFamily: "Outfit_500Medium",
  },
  default: {
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
  },
  title: {
    fontSize: 48,
    fontFamily: "Outfit_600SemiBold", // Corrigido para corresponder ao _layout.tsx
  },
  subtitle: {
    fontSize: 32,
    fontFamily: "Outfit_600SemiBold", // Corrigido e removido o fontWeight conflitante
  },
  link: {
    fontSize: 14,
    fontFamily: "Outfit_400Regular",
  },
  linkPrimary: {
    fontSize: 14,
    color: "#3c87f7",
    fontFamily: "Outfit_400Regular",
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: (Platform.select({ android: "700" }) as any) ?? "500",
    fontSize: 12,
  },
});
