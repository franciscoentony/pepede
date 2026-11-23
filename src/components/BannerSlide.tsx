import { Spacing } from "@/constants/theme";
import React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

import { cachedFoodPhotos } from "../../services/unspash";

const IMAGES = [
  { id: "1", source: require("@/assets/images/icon.png") },
  { id: "2", source: require("@/assets/images/splash-icon.png") },
  { id: "3", source: require("@/assets/images/react-logo.png") },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const SLIDER_WIDTH = SCREEN_WIDTH - Spacing.four * 2;
const SLIDER_HEIGHT = 180;

export default function ImageSlider({
  images = IMAGES,
  autoPlayInterval = 5000,
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [photos, setPhotos] = React.useState<any[]>([]);

  const flatListRef = React.useRef<FlatList>(null);

  // Valor animado que acompanha a posição X do scroll em tempo real
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // Busca as fotos UMA vez (se falhar, ficam as imagens locais)
  React.useEffect(() => {
    cachedFoodPhotos().then(setPhotos).catch(console.error);
  }, []);

  // Autoplay, separado da busca
  React.useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [activeIndex, images.length, autoPlayInterval]);

  // Troca só o source; o resto do item fica igual
  const items = images.map((item, i) => ({
    ...item,
    source: photos[i] ? { uri: photos[i].urls.regular } : item.source,
  }));

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollOffset / SLIDER_WIDTH);
    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Animated.FlatList
          ref={flatListRef}
          data={items}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          getItemLayout={(_, index) => ({
            length: SLIDER_WIDTH,
            offset: SLIDER_WIDTH * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image
                source={item.source}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>

      {/* Bolinhas interpolando largura e cor conforme o scrollX */}
      <View style={styles.pagination}>
        {images.map((item, index) => {
          const inputRange = [
            (index - 1) * SLIDER_WIDTH,
            index * SLIDER_WIDTH,
            (index + 1) * SLIDER_WIDTH,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#E0E0E0", "#BDBDBD", "#E0E0E0"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  backgroundColor,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: SLIDER_WIDTH,
    marginTop: 16,
  },
  container: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
  },
  slide: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
