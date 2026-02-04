# How to Start Expo and Connect

## Option 1: Start in Your Terminal (Recommended)

1. Open a new terminal window
2. Navigate to your project:
   ```bash
   cd "/Users/romanahmed/Desktop/Today App/today-app"
   ```

3. Start Expo:
   ```bash
   npx expo start
   ```

4. Once it starts, you'll see a QR code. Press 'w' to open in web browser or scan the QR code with your Expo Go app.

## Option 2: If Connection Issues Persist

If your phone shows "Unable to connect to server":

### Make sure both devices are on the same WiFi network:
- Your computer and phone MUST be on the same WiFi
- Don't use VPN on either device
- Check your computer's firewall isn't blocking port 8081

### Try LAN mode:
```bash
npx expo start --lan
```

### Try Tunnel mode (slower but works across networks):
```bash
npx expo start --tunnel
```

## Option 3: Use Expo Go App

1. Make sure Expo Go is installed on your phone
2. On iOS: Open Camera app and point at QR code
3. On Android: Open Expo Go app and tap "Scan QR code"

## Troubleshooting

If you see "Unable to connect to remote debugger":
- Press 'r' in the terminal to reload
- Shake your phone and tap "Reload"

If you see "Something went wrong":
- Clear cache: `npx expo start --clear`
- Restart Metro: Press 'r' in terminal

If nothing works:
- Restart your computer's WiFi
- Restart your phone's WiFi
- Make sure no VPN is active
- Check firewall settings (allow port 8081)
