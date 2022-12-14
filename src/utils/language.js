import { Platform, NativeModules } from 'react-native';

export function getLanguageByDevice() {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale // Adquire o idioma no device iOS
    : NativeModules.I18nManager.localeIdentifier; // Adquire o idioma no device Android
}
