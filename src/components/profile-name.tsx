import { ThemedText } from "@/components/themed-text";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProfileName({ nome, perfil }: any) {
  return (
    <TouchableOpacity style={styles.btnProfile}>
      {!perfil ? (
        <View style={styles.profilePicture}>
          <ThemedText style={{ fontSize: 25 }}>{nome[0]}</ThemedText>
        </View>
      ) : (
        <Image
          src={perfil}
          alt="Foto de Perfil"
          style={styles.profilePicture}
        />
      )}
      <ThemedText style={{ fontSize: 20 }}>Olá, {nome}!</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnProfile: {
    maxWidth: "70%",
    height: 70,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    backgroundColor: "#b8b8b8",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
