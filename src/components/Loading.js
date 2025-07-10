import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({ visible }) => (
  <Modal
    transparent
    animationType="fade"
    visible={visible}
    statusBarTranslucent
  >
    <View style={styles.overlay}>
      <View style={styles.popup}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default Loading;