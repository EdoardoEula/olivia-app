import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomePage: React.FC = () => {
  return (
    <View style={styles.pageContainer}>
      <Feather name="home" size={64} color="#333" />
      <Text style={styles.pageTitle}>Home</Text>
      <Text style={styles.pageSubtitle}>Welcome to your dashboard.</Text>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f8',
  },
  pageTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  pageSubtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
});
