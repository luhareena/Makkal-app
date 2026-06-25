import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  // ஆப்பின் தற்போதைய பக்கத்தை நிர்வகிக்க (Navigation State)
  // 'Login', 'Dashboard', 'Services', 'Profile'
  const [currentScreen, setCurrentScreen] = useState('Login');
  
  // பயனர் விவரங்களுக்கான மாநிலங்கள் (States)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('பொதுப்பயனர்');

  // லாகின் செய்வதற்கான லாஜிக்
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('பிழை', 'மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('பாதுகாப்பு எச்சரிக்கை', 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்கள் இருக்க வேண்டும்.');
      return;
    }
    // தற்காலிகமாக லாகின் வெற்றி என எடுத்துக்கொண்டு டேஷ்போர்டு செல்லுதல்
    setUserName(email.split('@')[0]);
    setCurrentScreen('Dashboard');
  };

  // லாக் அவுட் செய்ய
  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setCurrentScreen('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3d59" />

      {/* 1. லாகின் ஸ்கிரீன் (LOGIN SCREEN) */}
      {currentScreen === 'Login' && (
        <View style={styles.authContainer}>
          <View style={styles.logoSection}>
            <MaterialIcons name="gavel" size={60} color="#ff6e40" />
            <Text style={styles.appTitle}>மக்கள் APP</Text>
            <Text style={styles.appSubtitle}>மக்களுக்கான டிஜிட்டல் சேவைத் தளம்</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="மின்னஞ்சல் முகவரி (Email)"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="கடவுச்சொல் (Password)"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>உள்நுழை (Login)</Text>
            </TouchableOpacity>

            <Text style={styles.forgotText}>கடவுச்சொல் மறந்துவிட்டதா?</Text>
          </View>
        </View>
      )}

      {/* 2. முதன்மைப் பக்கம் (DASHBOARD SCREEN) */}
      {currentScreen === 'Dashboard' && (
        <View style={styles.mainContainer}>
          <View style={styles.appHeader}>
            <Text style={styles.headerTitle}>வணக்கம், {userName}!</Text>
            <TouchableOpacity onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            {/* விளம்பரப் பலகை (Banner Card) */}
            <View style={styles.bannerCard}>
              <Text style={styles.bannerTitle}>அரசு அறிவிப்புகள் 2026</Text>
              <Text style={styles.bannerDesc}>மக்களுக்கான புதிய நலத்திட்டங்கள் மற்றும் வேலைவாய்ப்புச் செய்திகள் இங்கே உடனுக்குடன் உடனே தெரிந்து கொள்ளுங்கள்.</Text>
            </View>

            {/* விரைவுச் சேவைகள் (Quick Services) */}
            <Text style={styles.sectionHeading}>முக்கிய சேவைகள்</Text>
            <View style={styles.gridContainer}>
              <TouchableOpacity style={styles.gridCard} onPress={() => setCurrentScreen('Services')}>
                <MaterialIcons name="description" size={32} color="#1e3d59" />
                <Text style={styles.cardLabel}>சான்றிதழ்கள்</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.gridCard}>
                <MaterialIcons name="account-balance" size={32} color="#1e3d59" />
                <Text style={styles.cardLabel}>அரசு உதவிகள்</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridCard}>
                <MaterialIcons name="campaign" size={32} color="#1e3d59" />
                <Text style={styles.cardLabel}>புகார்கள்</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridCard} onPress={() => setCurrentScreen('Profile')}>
                <MaterialIcons name="person" size={32} color="#1e3d59" />
                <Text style={styles.cardLabel}>சுயவிவரம்</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* 3. சேவைகள் பக்கம் (SERVICES SCREEN) */}
      {currentScreen === 'Services' && (
        <View style={styles.mainContainer}>
          <div style={{display: 'none'}}></div>
          <View style={styles.appHeader}>
            <TouchableOpacity onPress={() => setCurrentScreen('Dashboard')}>
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>டிஜிட்டல் சான்றிதழ்கள்</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.listItem}>
              <FontAwesome5 name="id-card" size={20} color="#1e3d59" />
              <View style={styles.listTextWrapper}>
                <Text style={styles.listTitle}>வருமான சான்றிதழ் (Income Certificate)</Text>
                <Text style={styles.listSub}>விண்ணப்பிக்க மற்றும் பதிவிறக்க</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </View>

            <View style={styles.listItem}>
              <FontAwesome5 name="home" size={20} color="#1e3d59" />
              <View style={styles.listTextWrapper}>
                <Text style={styles.listTitle}>இருப்பிட சான்றிதழ் (Nativity Certificate)</Text>
                <Text style={styles.listSub}>இருப்பிட சான்று விண்ணப்பங்கள்</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </View>

            <View style={styles.listItem}>
              <FontAwesome5 name="users" size={20} color="#1e3d59" />
              <View style={styles.listTextWrapper}>
                <Text style={styles.listTitle}>ஜாதிச் சான்றிதழ் (Community Certificate)</Text>
                <Text style={styles.listSub}>சமூக சான்றிதழ் சேவைகள்</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            </View>
          </ScrollView>
        </View>
      )}

      {/* 4. சுயவிவரப் பக்கம் (PROFILE SCREEN) */}
      {currentScreen === 'Profile' && (
        <View style={styles.mainContainer}>
          <View style={styles.appHeader}>
            <TouchableOpacity onPress={() => setCurrentScreen('Dashboard')}>
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>எனது சுயவிவரம்</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.profileContent}>
            <View style={styles.avatarCircle}>
              <MaterialIcons name="account-circle" size={100} color="#1e3d59" />
            </View>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{email || 'user@makkalapp.com'}</Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>ஆப் பதிப்பு (App Version)</Text>
              <Text style={styles.infoValue}>v1.0.0 (Production)</Text>
            </View>

            <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
              <Text style={styles.dangerButtonText}>கணக்கிலிருந்து வெளியேறு (Logout)</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* கீழே இருக்கும் நேவிகேஷன் பார் (Bottom Tab Bar - லாகின் பக்கத்தில் தெரியாது) */}
      {currentScreen !== 'Login' && (
        <View style={styles.bottomTabBar}>
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('Dashboard')}
          >
            <MaterialIcons name="home" size={24} color={currentScreen === 'Dashboard' ? '#ff6e40' : '#888'} />
            <Text style={[styles.tabLabel, { color: currentScreen === 'Dashboard' ? '#ff6e40' : '#888' }]}>முகப்பு</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('Services')}
          >
            <MaterialIcons name="apps" size={24} color={currentScreen === 'Services' ? '#ff6e40' : '#888'} />
            <Text style={[styles.tabLabel, { color: currentScreen === 'Services' ? '#ff6e40' : '#888' }]}>சேவைகள்</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('Profile')}
          >
            <MaterialIcons name="person" size={24} color={currentScreen === 'Profile' ? '#ff6e40' : '#888'} />
            <Text style={[styles.tabLabel, { color: currentScreen === 'Profile' ? '#ff6e40' : '#888' }]}>சுயவிவரம்</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// ஸ்டைல்கள் (Professional UI Blue & Orange Theme)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fa',
  },
  authContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#1e3d59',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#ff6e40',
    marginTop: 5,
  },
  formSection: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fdfdfd',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#333',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#ff6e40',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotText: {
    textAlign: 'center',
    color: '#1e3d59',
    marginTop: 15,
    fontSize: 13,
  },
  mainContainer: {
    flex: 1,
  },
  appHeader: {
    backgroundColor: '#1e3d59',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
    padding: 15,
  },
  bannerCard: {
    backgroundColor: '#ff6e40',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerDesc: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.9,
    lineHeight: 18,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3d59',
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    backgroundColor: '#fff',
    width: (width - 45) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eef2f5',
    elevation: 2,
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bottomTabBar: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eef2f5',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: '500',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eef2f5',
  },
  listTextWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  listSub: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  profileContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  avatarCircle: {
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3d59',
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eef2f5',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 12,
    color: '#888',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  dangerButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d9534f',
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dangerButtonText: {
    color: '#d9534f',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
