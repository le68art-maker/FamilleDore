/* ============================================================
   CONFIGURATION DU SITE — modifiez ce fichier pour personnaliser
   ============================================================ */

const CONFIG = {
  // Empreinte SHA-256 du mot de passe.
  // Mot de passe par défaut : « famille2025 »
  // Pour le changer : ouvrez outils/mot-de-passe.html dans votre navigateur,
  // tapez votre nouveau mot de passe et copiez l'empreinte ici.
  passwordHash: "1c4af588eca7e3613684d7990c9bfcedab8d7055b3746297b1e66286f657a7ec",

  // Titre affiché sur le site
  siteTitle: "Espace Famille",
};

/* ============================================================
   ALBUMS PHOTOS
   ------------------------------------------------------------
   Pour ajouter un album, copiez un bloc existant et adaptez :

   {
     id: "mon-album",              // identifiant unique, sans espaces
     titre: "Mes vacances",        // nom affiché
     emoji: "🏖️",                  // petite icône (si pas d'image de couverture)
     couverture: "photos/mon-album/01.jpg",  // photo de couverture (optionnel)
     photos: [
       { src: "photos/mon-album/01.jpg", legende: "La plage" },
       { src: "photos/mon-album/02.jpg" },       // légende optionnelle
     ],
   },

   Placez ensuite vos fichiers image dans le dossier « photos/ ».
   Formats conseillés : JPG ou WebP.
   ============================================================ */

const ALBUMS = [
  {
    id: "exemple",
    titre: "Exemple — mes photos ici",
    emoji: "📷",
    couverture: "",
    photos: [
      { src: "", legende: "Remplacez ce contenu par vos propres photos dans le fichier js/photos.js" },
    ],
  },
];
