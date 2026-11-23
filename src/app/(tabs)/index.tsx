import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

import ImageSlider from "@/components/BannerSlide";
import HamburguerTab from "@/components/hamburguer-tabs";
import ProfileName from "@/components/profile-name";

import CatalogProduct from "@/components/catalog/CatalogProduct";
import { ThemedText } from "@/components/themed-text";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
        >
          <View style={styles.innerWrapper}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <ProfileName nome="Entony" />
              </View>
              <HamburguerTab />
            </View>

            <View style={styles.section}>
              <ThemedText type="subtitle">
                O que será para o {"almoço"}?
              </ThemedText>
              <View style={styles.boundedBox}>
                <ImageSlider />
              </View>
              <ThemedText type="sectionTitle">A galera é fã</ThemedText>
              <View style={styles.boundedBox}>
                <CatalogProduct />
              </View>
            </View>
          </View>
        </ScrollView>
        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
  },
  safeArea: {
    flex: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
  },
  scroll: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  innerWrapper: {
    width: "100%",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 40,
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
  },
  section: {
    width: "100%",
    gap: 16,
  },
  boundedBox: {
    width: "100%",
  },
});
