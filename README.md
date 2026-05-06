# LettriA — Générateur de lettres de motivation par IA

## Déploiement en 5 étapes

### 1. Uploade le projet sur GitHub
- Va sur github.com → "New repository" → nomme-le `lettria`
- Upload tous les fichiers de ce dossier

### 2. Connecte Vercel à GitHub
- Va sur vercel.com → "Add New Project"
- Choisis ton repo `lettria`
- Clique "Deploy" (Vercel détecte Next.js automatiquement)

### 3. Ajoute ta clé API Anthropic
- Dans Vercel → Settings → Environment Variables
- Ajoute : `ANTHROPIC_API_KEY` = ta clé (sur console.anthropic.com)

### 4. Redéploie
- Vercel → Deployments → "Redeploy"

### 5. Ton site est en ligne ! 🎉
- URL gratuite : lettria.vercel.app (ou ton domaine perso)

## Prochaines étapes
- Ajouter Stripe pour les paiements (9€/mois)
- Ajouter un système de comptes utilisateurs
- SEO pour attirer du trafic organique
