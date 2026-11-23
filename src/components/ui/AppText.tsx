import { Text } from "react-native";

export function AppText({ style, weight = "regular", ...props }: any) {
  const fontFamily = weight === "bold" ? "Outfit_700Bold" : "Outfit_400Regular";
  return <Text style={[{ fontFamily }, style]} {...props} />;
}
