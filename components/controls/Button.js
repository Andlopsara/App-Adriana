import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export default function Button({ label, type = 'black', onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styles.container,
      type === 'white' && styles.containerWhite
    ]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "#013424",
    borderRadius: 25,
    paddingVertical: 5,
    width: '90%',
  },
  text: {
    color: "#e9fff9",
    fontFamily: Fonts.family.regular,
    fontSize: 25,
    fontWeight: 'bold',
  },
  containerWhite: {
    borderColor: "#013424",
    borderRadius: 25,
    borderWidth: 10,
  },
});