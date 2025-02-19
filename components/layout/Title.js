import { View, Text, StyleSheet } from 'react-native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

export function Title({ title, color }) {
  return (
    <View style={styles.container}>
      <Text style={
        [styles.text, { color: color || Colors.black }]}
      >{title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop:-40,
    marginBottom: 96,
    marginLeft:10,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
     fontWeight: 'bold',
     fontFamily: Fonts.family.regular,
  }
});