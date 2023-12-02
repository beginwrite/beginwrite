import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.beginwrite.app',
  appName: 'native',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
