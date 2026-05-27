import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.dn.project',
  appName: 'dn-project',
  webDir: '.output/public',
	server: {
    androidScheme: 'https'
  }
};

export default config;
