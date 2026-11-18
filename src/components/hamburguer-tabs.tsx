import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native";

export default function HamburguerTabs() {
  return (
    <TouchableOpacity style={{ padding: 10 }}>
      <FontAwesome6 name="bars-staggered" size={24} color="black" />
    </TouchableOpacity>
  );
}
