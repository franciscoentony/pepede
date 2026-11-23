import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Spacing } from "@/constants/theme";
import { useProducts } from "@/data/products";
import CardProduct from "./Card/CardProduct";

export default function CatalogProduct({ data }: { data?: any[] }) {
  const { products, loading } = useProducts();

  const { width } = useWindowDimensions();
  // Desconta o padding lateral aproximado da SafeAreaView (ex: 16 * 2 = 32)
  const cardWidth = Math.max(width - 300, 180);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={data ?? products}
        keyExtractor={(item) => item.id}
        horizontal

        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 18, paddingHorizontal: Spacing.four }}
        renderItem={({ item }) => (
          <CardProduct item={item} style={{ width: cardWidth, height: 300 }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    // vaza o padding da tela para o card não ser cortado na borda da lista
    marginHorizontal: -Spacing.four,
    minHeight: 220,
  },
});
