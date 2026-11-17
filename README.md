# Espace Famille 📷

Site privé pour partager vos photos avec vos enfants et vos amis.

## 🚀 Démarrage rapide

1. **Ouvrir le site** : double-cliquez sur `index.html`, ou mieux, servez le dossier :

   ```bash
   # avec Python
   python3 -m http.server 8000
   # puis ouvrez http://localhost:8000
   ```

2. **Mot de passe par défaut** : `famille2025`

## 📷 Ajouter vos photos

1. Créez un dossier dans `photos/`, par exemple `photos/vacances-2025/`
2. Copiez-y vos images (JPG ou WebP conseillé)
3. Ouvrez `js/photos.js` et ajoutez un album :

```js
{
  id: "vacances-2025",
  titre: "Vacances 2025",
  emoji: "🏖️",
  couverture: "photos/vacances-2025/01.jpg",   // optionnel
  photos: [
    { src: "photos/vacances-2025/01.jpg", legende: "La plage" },
    { src: "photos/vacances-2025/02.jpg" },
  ],
}
```

4. Rechargez la page : l'album apparaît dans la grille.

💡 **Conseil** : pour un chargement rapide, redimensionnez vos photos avant de les
déposer (par exemple 1920 px de large maximum, qualité 80 %). Des outils comme
[XnConvert](https://www.xnview.com/en/xnconvert/) ou [Squoosh](https://squoosh.app/)
font cela gratuitement.

## 🔐 Changer le mot de passe

1. Ouvrez `outils/mot-de-passe.html` dans votre navigateur (en local, pas en ligne)
2. Tapez votre nouveau mot de passe
3. Copiez l'empreinte affichée
4. Collez-la dans `js/photos.js`, champ `passwordHash`

## ☁️ Mettre le site en ligne (GitHub Pages — gratuit)

1. Créez un dépôt sur [GitHub](https://github.com/new) (par exemple `espace-famille`)
2. Envoyez ce dossier :

   ```bash
   git init
   git add .
   git commit -m "Site famille"
   git branch -M main
   git remote add origin https://github.com/VOTRE-NOM/espace-famille.git
   git push -u origin main
   ```

3. Dans le dépôt : **Settings → Pages → Source : Deploy from a branch → main / (root)** → Save
4. Votre site sera accessible sur `https://VOTRE-NOM.github.io/espace-famille/`
5. Communiquez l'adresse et le mot de passe à vos proches

## 🔒 À savoir sur la protection

Le mot de passe protège le site par un « rideau » : sans le bon mot de passe,
on ne voit aucune photo. C'est largement suffisant pour un usage familial.

En revanche, sur un hébergement statique gratuit comme GitHub Pages, une personne
très motivée et technique pourrait contourner ce rideau. Si un jour vous souhaitez
une protection renforcée (chiffrement réel des photos ou comptes individuels),
des solutions existent (Cloudflare Access en gratuit, ou un petit serveur auto-hébergé).
Pour un site familial, le niveau actuel est un très bon compromis simplicité/sécurité.

## 📁 Structure du projet

```
site-famille/
├── index.html              # Page principale
├── css/style.css           # Styles
├── js/photos.js            # ⭐ À modifier : albums + mot de passe
├── js/app.js               # Logique (verrou, galerie, lightbox)
├── outils/mot-de-passe.html # Outil pour changer le mot de passe
├── photos/                 # Vos photos (créez ce dossier)
└── README.md
```
