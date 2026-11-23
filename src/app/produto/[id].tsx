import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useProducts } from "@/data/products";

const HERO_HEIGHT = 360; // altura da foto
const BASE_PRICE = 55; // preço do prato (mock)

// Adicionais (mock)
const EXTRAS = [
  { id: "molho", name: "Molho Extra", price: 2 },
  { id: "queijo", name: "Mais Queijo", price: 4 },
  { id: "chapa", name: "Hambúrguer na Chapa", price: 7 },
];

function formatPrice(value: number) {
  return "R$ " + value.toFixed(2).replace(".", ",");
}

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { products, loading } = useProducts();

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Parallax: pega a posição do scroll e anima a foto
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useScrollOffset(scrollRef);

  const imageStyle = useAnimatedStyle(() => ({
    // a escala cresce a partir do topo, então a foto sempre cobre até o painel
    transformOrigin: "top",
    transform: [
      // ao rolar para cima, a foto sobe na metade da velocidade (parallax)
      { translateY: -Math.max(scrollY.value, 0) * 0.5 },
      // ao puxar a tela para baixo, a foto estica
      { scale: interpolate(scrollY.value, [-HERO_HEIGHT, 0], [2, 1], "clamp") },
    ],
  }));

  const product = products.find((p) => p.id === id);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  if (!product) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  // Marca ou desmarca um adicional
  function toggleExtra(extraId: string) {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  }

  // Total = (preço + adicionais marcados) x quantidade
  const extrasTotal = EXTRAS.filter((e) => selectedExtras.includes(e.id)).reduce(
    (sum, e) => sum + e.price,
    0,
  );
  const total = (BASE_PRICE + extrasTotal) * quantity;

  return (
    <View style={styles.container}>
      {/* Foto no fundo */}
      <Animated.Image
        source={product.source}
        style={[styles.hero, imageStyle]}
        resizeMode="cover"
      />

      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets // iOS: sobe o conteúdo quando o teclado abre
        keyboardShouldPersistTaps="handled"
      >
        {/* Espaço vazio para a foto aparecer */}
        <View style={{ height: HERO_HEIGHT - 40 }} />

        {/* Painel branco por cima da foto */}
        <View style={styles.sheet}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {EXTRAS.map((extra) => (
            <View key={extra.id} style={styles.extraRow}>
              <View>
                <Text style={styles.extraName}>{extra.name}</Text>
                <Text style={styles.extraPrice}>
                  + {formatPrice(extra.price)}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.roundButton,
                  selectedExtras.includes(extra.id) && styles.roundButtonActive,
                ]}
                onPress={() => toggleExtra(extra.id)}
              >
                <Text style={styles.roundButtonText}>
                  {selectedExtras.includes(extra.id) ? "✓" : "+"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.label}>Observações: (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Alguma observação?"
            placeholderTextColor="#aaa"
            multiline
            value={note}
            onChangeText={setNote}
          />

          <View style={styles.quantityRow}>
            <Text style={styles.label}>Quantidade: {quantity}</Text>
            <TouchableOpacity
              style={[styles.roundButton, { backgroundColor: "#F2B93B" }]}
              onPress={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <Text style={styles.roundButtonText}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roundButton, { backgroundColor: "#5CC13C" }]}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.roundButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.total}>{formatPrice(total)}</Text>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar a Sacola</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>

      {/* Botão voltar por cima de tudo */}
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 12 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>‹ Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  hero: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: HERO_HEIGHT,
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 48,
    minHeight: 700,
  },
  title: { fontSize: 28, fontFamily: "Outfit_600SemiBold", color: "#000" },
  description: {
    fontSize: 16,
    color: "#888",
    marginTop: 12,
    marginBottom: 24,
    fontFamily: "Outfit_400Regular",
  },
  extraRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  extraName: { fontSize: 18, color: "#000", fontFamily: "Outfit_400Regular" },
  extraPrice: { color: "#888", fontFamily: "Outfit_400Regular" },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C98B35",
    alignItems: "center",
    justifyContent: "center",
  },
  roundButtonActive: { backgroundColor: "#5CC13C" },
  roundButtonText: { color: "#fff", fontSize: 22, lineHeight: 26 },
  label: { fontSize: 18, color: "#000", fontFamily: "Outfit_400Regular" },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 16,
    height: 100,
    padding: 16,
    marginTop: 12,
    marginBottom: 24,
    textAlignVertical: "top",
    fontFamily: "Outfit_400Regular",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  total: { fontSize: 32, color: "#000", fontFamily: "Outfit_600SemiBold" },
  addButton: {
    backgroundColor: "#DDB43F",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Outfit_500Medium",
  },
  backButton: { position: "absolute", left: 16 },
  backText: { color: "#fff", fontSize: 20, fontFamily: "Outfit_500Medium" },
});
