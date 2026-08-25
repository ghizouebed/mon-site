# Roadmap — Devenir développeuse de SaaS d'automatisation

Objectif final : être capable de concevoir et coder un **SaaS d'automatisation**
(le genre d'outil qui connecte des applications entre elles et exécute des
workflows automatiquement — pense Zapier, Make, n8n) en partant de zéro.

Chaque étape s'appuie sur la précédente. Ne saute pas d'étape : en
automatisation, tu empiles constamment plusieurs couches (front, back, API,
base de données, files d'attente...), donc les fondations doivent être solides.

---

## Étape 0 — Outils de base (1 semaine)
- Terminal / ligne de commande (naviguer, créer des fichiers, exécuter des commandes)
- Git & GitHub (déjà en cours avec ce dépôt : commit, push, branches, pull request)
- Éditeur de code (VS Code) : extensions, raccourcis, débogueur

**Tu sais que tu as réussi quand :** tu peux créer un dépôt, faire des commits
clairs, et pousser du code sans aide.

---

## Étape 1 — Les fondations du web (2-4 semaines)
- **HTML** : structure sémantique d'une page
- **CSS** : mise en page (Flexbox, Grid), responsive design
- **JavaScript** : variables, fonctions, conditions, boucles, tableaux, objets,
  manipulation du DOM, événements
- Ce dépôt (`mon-site`) est ton terrain d'entraînement : à chaque notion apprise,
  ajoute une fonctionnalité au site.

**Ressources :** MDN Web Docs (référence), freeCodeCamp (exercices).

---

## Étape 2 — JavaScript avancé & asynchrone (2-3 semaines)
- `this`, closures, prototypes/classes
- **Asynchrone** : callbacks → Promises → `async`/`await` (essentiel pour
  l'automatisation : tout appel à une API externe est asynchrone)
- `fetch` pour appeler une API depuis le navigateur
- JSON : format d'échange de données universel

**Pourquoi c'est critique pour un SaaS d'automatisation :** un "workflow"
n'est rien d'autre qu'une chaîne d'appels asynchrones à des APIs externes
(Gmail, Slack, Stripe...) déclenchés par un événement.

---

## Étape 3 — Backend & bases de données (4-6 semaines)
- **Node.js** : exécuter du JS côté serveur
- Framework backend : **Express** (ou NestJS plus tard pour du code structuré)
- Créer une **API REST** (routes, méthodes HTTP : GET/POST/PUT/DELETE)
- Authentification : sessions, tokens **JWT**, OAuth (se connecter "avec Google")
- Base de données :
  - **SQL** (PostgreSQL) : tables, relations, requêtes — la base de tout SaaS
  - **ORM** (Prisma ou équivalent) pour manipuler la BDD depuis le code
- Variables d'environnement, secrets, `.env`

**Projet pratique suggéré :** une API qui reçoit un webhook et enregistre les
données en base — c'est littéralement 30% de ce que fait un SaaS d'automatisation.

---

## Étape 4 — Concepts spécifiques à l'automatisation (3-4 semaines)
C'est le cœur de ce que tu veux construire.

- **Webhooks** : comment une app externe "prévient" ton système qu'un
  événement s'est produit (ex : "un nouveau paiement a été reçu")
- **APIs tierces** : lire une documentation d'API, gérer l'authentification
  (clé API, OAuth2), les limites de débit (*rate limiting*)
- **Files d'attente / Message Queues** (Redis + BullMQ, ou RabbitMQ) :
  pour exécuter des tâches en arrière-plan sans bloquer l'utilisateur
- **Jobs planifiés (cron)** : exécuter une action à intervalle régulier
- **Moteur de workflow** : comment représenter une suite d'étapes
  (déclencheur → conditions → actions) sous forme de données (JSON) et
  l'exécuter dynamiquement — c'est l'architecture centrale d'un outil comme
  Zapier ou n8n
- **Gestion des erreurs et retries** : que se passe-t-il si une API externe
  échoue ? (backoff exponentiel, files de "dead letter")
- **Idempotence** : garantir qu'une action automatisée ne s'exécute pas deux
  fois par erreur

**Projet pratique suggéré :** reproduire une mini-version de Zapier — "quand
je reçois un email avec tel mot-clé (via webhook), envoyer un message Slack".

---

## Étape 5 — Construire un vrai SaaS (multi-utilisateurs) (4-6 semaines)
- **Multi-tenancy** : isoler les données de chaque client/utilisateur
- **Facturation (billing)** : intégrer Stripe (abonnements, essais gratuits,
  webhooks de paiement)
- **Frontend d'application** (au-delà du site vitrine) : React ou Vue,
  gestion d'état, formulaires, tableaux de bord
- **Sécurité** : validation des entrées, hashage des mots de passe, protection
  contre les injections, gestion des secrets/clients OAuth
- **Notifications** : emails transactionnels (Resend/SendGrid), notifications in-app

---

## Étape 6 — Déploiement & DevOps (2-3 semaines)
- Héberger le frontend (Vercel/Netlify) et le backend (Railway/Render/Fly.io)
- **Docker** : containeriser une application
- **CI/CD** : tests et déploiement automatiques (GitHub Actions)
- Monitoring, logs, gestion des erreurs en production (Sentry)

---

## Étape 7 — Aller plus loin (continu)
- **TypeScript** : ajouter du typage à ton JavaScript (standard dans l'industrie)
- Architecture **event-driven** à plus grande échelle
- Intégration de l'IA dans les workflows (appeler un LLM comme étape
  d'automatisation, ex : "résumer cet email avant de l'envoyer sur Slack")
- Étudier les produits existants (Zapier, Make, n8n — n8n est open-source,
  tu peux lire son code) pour comprendre leurs choix d'architecture

---

## Comment utiliser cette roadmap avec ce dépôt
1. Chaque étape = une branche ou un dossier de projet pratique.
2. Documente ce que tu apprends dans `docs/` (tu peux créer un fichier
   `journal.md` avec tes notes).
3. Consulte `docs/GLOSSAIRE.md` dès qu'un mot t'échappe.
4. N'hésite pas à me redemander de l'aide à chaque étape — je peux générer
   des exercices, corriger ton code, ou construire les projets pratiques
   avec toi pas à pas.
