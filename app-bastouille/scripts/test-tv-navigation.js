#!/usr/bin/env node

/**
 * Script de test pour la navigation TV
 * Simule les touches de télécommande et vérifie le comportement
 */

const puppeteer = require('puppeteer');

async function testTVNavigation() {
  console.log('🧪 Test de la navigation TV...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  
  // Simuler un environnement TV
  await page.setUserAgent('Mozilla/5.0 (SMART-TV; Linux; Tizen 7.0) AppleWebKit/537.36');
  
  try {
    // Naviguer vers la page TV
    console.log('📺 Navigation vers /tv...');
    await page.goto('http://localhost:3000/tv', { waitUntil: 'networkidle0' });
    
    // Attendre que la page se charge
    await page.waitForTimeout(3000);
    
    // Vérifier que les éléments sont présents
    const periodButtons = await page.$$('.tv-period-button');
    console.log(`✅ ${periodButtons.length} boutons de période trouvés`);
    
    // Tester la navigation avec les touches directionnelles
    console.log('🎮 Test de la navigation par télécommande...');
    
    // Focus sur le premier élément
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    
    // Naviguer vers la droite
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    
    // Naviguer vers le bas (vers les cartes de culture)
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
    
    // Sélectionner avec Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    console.log('✅ Tests de navigation terminés');
    
    // Prendre une capture d'écran
    await page.screenshot({ path: 'tv-navigation-test.png' });
    console.log('📸 Capture d\'écran sauvegardée: tv-navigation-test.png');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  } finally {
    await browser.close();
  }
}

// Vérifier que le serveur est en cours d'exécution
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch {
    return false;
  }
}

// Fonction fetch simple pour Node.js
async function fetch(url) {
  const http = require('http');
  const https = require('https');
  
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      resolve({ ok: res.statusCode >= 200 && res.statusCode < 300 });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => req.destroy());
  });
}

// Exécuter le test
async function main() {
  console.log('🔍 Vérification du serveur...');
  
  if (await checkServer()) {
    console.log('✅ Serveur détecté, lancement des tests...');
    await testTVNavigation();
  } else {
    console.log('❌ Serveur non détecté sur localhost:3000');
    console.log('💡 Assurez-vous que npm run dev est en cours d\'exécution');
  }
}

main().catch(console.error);
