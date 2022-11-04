import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Content, KeyboardAvoidingView, ScrollView, View } from './styles';

export default function Page({ children, simple, hasSidePadding = true }) {
  if (simple) {
    return (
      <View hasSidePadding={hasSidePadding}>
        <StatusBar barStyle="light-content" />
        <Content>{children}</Content>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        hasSidePadding={hasSidePadding}
        keyboardShouldPersistTaps="handled">
        <StatusBar barStyle="light-content" />
        <Content>{children}</Content>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
