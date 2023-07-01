import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.moviepedia.app',
  appName: 'MoviePedia',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
