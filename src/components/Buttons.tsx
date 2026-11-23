import { ThemedText } from "@/components/themed-text";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function AddToBag({ children }: any) {
  return (
    <TouchableOpacity style={styles.btnAddToBag}>
      <View
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "120%",
            height: 15,
            backgroundColor: "#422C0B",
            borderRadius: 100,
            position: "absolute",
            top: 4,
          }}
        ></View>
        <View
          style={{
            width: "120%",
            height: 5,
            backgroundColor: "#317F17",
            borderRadius: 100,
            position: "absolute",
          }}
        ></View>
      </View>
      <ThemedText style={{ color: "white", fontFamily: "Outfit_500Medium" }}>
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnAddToBag: {
    width: "95%",
    height: 45,
    padding: 10,
    backgroundColor: "#E2B12B",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 100,
  },
});
