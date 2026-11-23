import { useEffect, useState } from "react";

import { cachedFoodPhotos } from "../../services/unspash";

export const PRODUCTS = [
  {
    id: "1",
    source: require("../../assets/images/android-icon-foreground.png"),
    title: "Hamburguer da Casa",
    description: "Cheddar, bacon, doritos, molho especial e 180g de carne.",
  },
  {
    id: "2",
    source: require("../../assets/images/splash-icon.png"),
    title: "Pizza Tamanho G com 8 fatias",
    description:
      "Queijo Mussarela, molho de tomate, borda com recheio de catupiri e calebra acebolada.",
    price: 45.9,
  },
  {
    id: "3",
    source: require("../../assets/images/react-logo.png"),
    title: "Açaí completo de 500ml",
    description: "Açaí completo com complementos personalizados.",
  },
];

// Junta os produtos locais com as fotos do Unsplash (cache compartilhado entre telas).
// Se a busca falhar, mantém a imagem local.
export function useProducts() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cachedFoodPhotos()
      .then(setPhotos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const products = PRODUCTS.map((item, i) => ({
    ...item,
    source: photos[i] ? { uri: photos[i].urls.regular } : item.source,
  }));

  return { products, loading };
}
