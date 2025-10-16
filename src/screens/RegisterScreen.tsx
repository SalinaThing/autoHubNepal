import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import Footer from '../components/Footer';

type FormSectionProps = {
  title: string;
  children: React.ReactNode;
};

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const RegisterBusinessPage: React.FC = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    garageName: '',
    description: '',
    category: '',
    phone: '',
    whatsapp: '',
    emailAddress: '',
    website: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'http://10.0.2.2:5000/api/register-business',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        }
      );

      const data = await response.json();

      if (data.success) {
        Alert.alert('✅ Success', data.message);
        setFormState({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          garageName: '',
          description: '',
          category: '',
          phone: '',
          whatsapp: '',
          emailAddress: '',
          website: '',
        });
      } else {
        Alert.alert('❌ Error', data.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('❌ Network Error', error.message || 'Server not reachable');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.mainTitle}>Register Your Workshop</Text>

      {/* Login Information */}
      <FormSection title="Login Information">
        <View style={styles.twoCol}>
          <TextInput
            style={styles.input}
            placeholder="Username *"
            value={formState.username}
            onChangeText={text => handleChange('username', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email *"
            keyboardType="email-address"
            value={formState.email}
            onChangeText={text => handleChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password *"
            secureTextEntry
            value={formState.password}
            onChangeText={text => handleChange('password', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password *"
            secureTextEntry
            value={formState.confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
          />
        </View>
      </FormSection>

      {/* Business Information */}
      <FormSection title="Business Information">
        <TextInput
          style={styles.input}
          placeholder="Garage Name *"
          value={formState.garageName}
          onChangeText={text => handleChange('garageName', text)}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Description *"
          value={formState.description}
          onChangeText={text => handleChange('description', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Category (e.g. Repair / Car Wash / Painting)"
          value={formState.category}
          onChangeText={text => handleChange('category', text)}
        />
        <View style={styles.uploadBox}>
          <Text style={{ color: '#666' }}>Business Photo Upload Placeholder</Text>
        </View>
      </FormSection>

      {/* Location Information */}
      <FormSection title="Location Information">
        <Text style={{ marginBottom: 10, color: '#555' }}>
          A map placeholder would be here to select location.
        </Text>
        <View style={styles.mapPlaceholder}>
          <Text style={{ color: '#999' }}>Map Placeholder</Text>
        </View>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationButtonText}>📍 Use Current Location</Text>
        </TouchableOpacity>
      </FormSection>

      {/* Contact Information */}
      <FormSection title="Contact Information">
        <View style={styles.twoCol}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            keyboardType="phone-pad"
            value={formState.phone}
            onChangeText={text => handleChange('phone', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="WhatsApp Number"
            keyboardType="phone-pad"
            value={formState.whatsapp}
            onChangeText={text => handleChange('whatsapp', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={formState.emailAddress}
            onChangeText={text => handleChange('emailAddress', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Website URL"
            value={formState.website}
            onChangeText={text => handleChange('website', text)}
          />
        </View>
      </FormSection>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Register Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterBusinessPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  sectionHeader: {
    backgroundColor: '#dc2626',
    padding: 12,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  sectionBody: {
    padding: 16,
  },
  twoCol: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    flexBasis: '48%',
  },
  uploadBox: {
    height: 100,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  locationButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});
