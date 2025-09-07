const fs = require('fs');
const path = require('path');

describe('App Icons', () => {
  const iconsDir = path.join(__dirname, '../../icons');
  
  test('icons directory exists', () => {
    expect(fs.existsSync(iconsDir)).toBe(true);
  });

  test('icon-192.png exists', () => {
    const iconPath = path.join(iconsDir, 'icon-192.png');
    expect(fs.existsSync(iconPath)).toBe(true);
  });

  test('icon-512.png exists', () => {
    const iconPath = path.join(iconsDir, 'icon-512.png');
    expect(fs.existsSync(iconPath)).toBe(true);
  });

  test('icon files are not empty', () => {
    const icon192 = path.join(iconsDir, 'icon-192.png');
    const icon512 = path.join(iconsDir, 'icon-512.png');
    
    if (fs.existsSync(icon192)) {
      const stats192 = fs.statSync(icon192);
      expect(stats192.size).toBeGreaterThan(0);
    }
    
    if (fs.existsSync(icon512)) {
      const stats512 = fs.statSync(icon512);
      expect(stats512.size).toBeGreaterThan(0);
    }
  });

  test('icon files are PNG format', () => {
    const icon192 = path.join(iconsDir, 'icon-192.png');
    const icon512 = path.join(iconsDir, 'icon-512.png');
    
    if (fs.existsSync(icon192)) {
      const buffer192 = fs.readFileSync(icon192);
      // PNG files start with these bytes
      expect(buffer192[0]).toBe(0x89);
      expect(buffer192[1]).toBe(0x50);
      expect(buffer192[2]).toBe(0x4E);
      expect(buffer192[3]).toBe(0x47);
    }
    
    if (fs.existsSync(icon512)) {
      const buffer512 = fs.readFileSync(icon512);
      expect(buffer512[0]).toBe(0x89);
      expect(buffer512[1]).toBe(0x50);
      expect(buffer512[2]).toBe(0x4E);
      expect(buffer512[3]).toBe(0x47);
    }
  });
});
