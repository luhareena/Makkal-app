import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
// ஐகான்களுக்காக (Icons)
import { MaterialIcons } from '@expo/vector-icons'; 

export default function App() {
  // டெக்ஸ்ட் பாக்ஸில் நாம் டைப் செய்யும் பெயரை சேமிக்க State
  const [name, setName] = useState('');

  // ஆப் திறக்கும் போது ஒரு மெசேஜ் காட்ட (useEffect)
  useEffect(() => {
    console.log("ஆப் ரெடியாகிவிட்டது!");
  }, []);

  // பட்டனை கிளிக் செய்யும் போது நடக்கும் செயல்
  const handlePress = () => {
    if (name.trim() === '') {
      Alert.alert('ஹலோ!', 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.');
    } else {
      Alert.alert('வரவேற்பு!', `வணக்கம் ${name}! உங்கள் ஆப் சூப்பராக வேலை செய்கிறது.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* மேல் பகுதி (Header) */}
      <View style={styles.header}>
        <MaterialIcons name="smartphone" size={30} color="#fff" />
        <Text style={styles.headerText}>எனது முதல் ஆப்</Text>
      </View>

      {/* நடுப்பகுதி (Main Content) */}
      <View style={styles.content}>
        <Text style={styles.title}>வரவேற்கிறோம்!</Text>
        
        {/* இன்புட் பாக்ஸ் */}
        <TextInput
          style={styles.input}
          placeholder="உங்கள் பெயரை இங்கே டைப் செய்யவும்..."
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {/* கிளிக் செய்யும் பட்டன் */}
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>கிளிக் செய்யவும்</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// டிசைன் செய்ய பயன்படும் Stylesheet (CSS போன்றது)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
