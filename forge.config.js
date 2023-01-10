module.exports = {
  packagerConfig: {
    name: 'AZTEC Admin',
    productName: 'Admin',
    icon: 'logo/favicon.ico',
    appBundleId: 'com.aztec-enterprise.package',
    asar: true, // or an object containing your asar options
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
        iconUrl: 'https://url/to/icon.ico',
        // The ICO file to use as the icon for the generated Setup.exe
        setupIcon: './logo/favicon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './logo/192X192-dark.png',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: './logo/favicon.ico',
      },
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'cse-mkamble',
          name: 'test-update',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};
