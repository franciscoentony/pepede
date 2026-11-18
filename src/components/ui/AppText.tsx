import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  weight?: "regular" | "bold";
}

export function AppText({ style, weight = "regular", ...props }: AppTextProps) {
  const fontFamily = weight === "bold" ? "Outfit_700Bold" : "Outfit_400Regular";
  return <Text style={[{ fontFamily }, style]} {...props} />;
}
