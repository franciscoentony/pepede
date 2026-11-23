import { AddToBag } from "@/components/Buttons";
import { ThemedText } from "@/components/themed-text";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

export default function CardProduct({ item, style }: any) {
  const router = useRouter();

  return (
    <View
      style={[
        style,
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.55}
        style={{ width: "100%" }}
        onPress={() =>
          router.push({
            pathname: "/produto/[id]",
            params: { id: item.id },
          })
        }
      >
        <View style={styles.imageContainer}>
          <Image source={item.source} style={styles.image} resizeMode="cover" />
        </View>
        <View style={{ paddingTop: 13, paddingBottom: 20 }}>
          <ThemedText numberOfLines={1} style={styles.title}>
            {item?.title ?? "Titulo do Prato"}
          </ThemedText>
          <ThemedText numberOfLines={3} style={styles.description}>
            {item?.description}
          </ThemedText>
        </View>
      </TouchableOpacity>
      <AddToBag>Adicionar a Sacola</AddToBag>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 120,
    borderRadius: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    paddingBottom: 5,
    fontSize: 18,
    fontFamily: "Outfit_500Medium",
  },
  description: {
    opacity: 0.5,
  },
});
