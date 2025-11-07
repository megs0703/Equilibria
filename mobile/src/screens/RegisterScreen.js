import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: [],
    injuries: [],
  });

  const { register, loading } = useAuth();

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.gender || !formData.height || !formData.weight) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const result = await register({
      ...formData,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
    });
    
    if (!result.success) {
      Alert.alert('Registration Failed', result.error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <LinearGradient
          colors={['#16a34a', '#2563eb']}
          style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Join Equilibria</Text>
            
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry
              />
              
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Age"
                  placeholderTextColor="#9ca3af"
                  value={formData.age}
                  onChangeText={(text) => setFormData({...formData, age: text})}
                  keyboardType="numeric"
                />
                
                <View style={[styles.input, styles.halfInput, styles.pickerContainer]}>
                  <Picker
                    selectedValue={formData.gender}
                    onValueChange={(value) => setFormData({...formData, gender: value})}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>
              
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Height (cm)"
                  placeholderTextColor="#9ca3af"
                  value={formData.height}
                  onChangeText={(text) => setFormData({...formData, height: text})}
                  keyboardType="numeric"
                />
                
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Weight (kg)"
                  placeholderTextColor="#9ca3af"
                  value={formData.weight}
                  onChangeText={(text) => setFormData({...formData, weight: text})}
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.registerButtonText}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginText}>
                  Already have an account? <Text style={styles.loginLinkText}>Sign in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  pickerContainer: {
    justifyContent: 'center',
    paddingVertical: 0,
  },
  picker: {
    color: '#1f2937',
  },
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  loginLinkText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default RegisterScreen;