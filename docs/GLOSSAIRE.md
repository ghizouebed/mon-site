# Glossaire A-Z — Jargon Dev Web, SaaS & Automatisation

Un mot manque ? Demande-moi de l'ajouter au fur et à mesure de ton apprentissage.

## A
- **API (Application Programming Interface)** : une "porte d'entrée" qu'un logiciel expose pour que d'autres logiciels puissent lui parler (envoyer/recevoir des données).
- **API REST** : un style d'API très répandu basé sur les méthodes HTTP (GET, POST, PUT, DELETE) et des URLs représentant des ressources (`/users/42`).
- **Async / Asynchrone** : une opération qui ne bloque pas le programme pendant qu'elle s'exécute (ex : attendre la réponse d'un serveur). Indispensable en automatisation.
- **Authentification** : vérifier qui est l'utilisateur (ex : email + mot de passe).
- **Autorisation** : vérifier ce que l'utilisateur a le droit de faire une fois identifié.

## B
- **Backend** : la partie "serveur" d'une application — logique métier, base de données, sécurité. Invisible pour l'utilisateur final.
- **Backoff exponentiel** : stratégie de réessai après une erreur, en augmentant le délai à chaque tentative (1s, 2s, 4s, 8s...).
- **Base de données (BDD)** : système qui stocke les données de façon structurée et durable.
- **Billing (facturation)** : gestion des abonnements et paiements dans un SaaS.

## C
- **Cache** : stockage temporaire de données pour éviter de les recalculer/re-télécharger.
- **CI/CD (Continuous Integration / Continuous Deployment)** : automatiser les tests et le déploiement du code à chaque changement.
- **Client** : le programme qui fait une requête (souvent le navigateur).
- **Cron / Cron job** : une tâche planifiée qui s'exécute automatiquement à intervalle régulier (ex : tous les jours à minuit).
- **CRUD** : Create, Read, Update, Delete — les 4 opérations de base sur des données.

## D
- **DOM (Document Object Model)** : la représentation en mémoire de la page HTML, que JavaScript peut manipuler.
- **Docker** : outil pour empaqueter une application avec tout son environnement dans un "conteneur" portable.
- **Déclencheur (Trigger)** : l'événement qui démarre un workflow d'automatisation (ex : "nouvel email reçu").

## E
- **Endpoint** : une URL précise d'une API (ex : `POST /api/users`).
- **Environnement (variables d'environnement)** : valeurs de configuration (clés API, secrets) stockées hors du code, souvent dans un fichier `.env`.
- **Event-driven (architecture pilotée par les événements)** : un système où les actions se déclenchent en réaction à des événements plutôt qu'en séquence fixe.

## F
- **Framework** : une structure de code prête à l'emploi qui impose des conventions (ex : Express pour le backend, React pour le frontend).
- **Frontend** : la partie visible et interactive d'une application, exécutée dans le navigateur.
- **Fetch** : fonction JavaScript native pour faire une requête réseau (appeler une API).

## G
- **Git** : système de gestion de versions du code (suivre l'historique des changements).
- **GitHub** : plateforme d'hébergement de dépôts Git, avec collaboration (pull requests, issues).

## H
- **Hébergement (Hosting)** : faire tourner ton application sur un serveur accessible depuis Internet.
- **HTTP / HTTPS** : le protocole de communication du web (HTTPS = version chiffrée/sécurisée).
- **Header (en-tête HTTP)** : métadonnées envoyées avec une requête/réponse HTTP (ex : type de contenu, authentification).

## I
- **Idempotence** : propriété d'une action qui produit le même résultat même si elle est exécutée plusieurs fois (crucial pour éviter les doublons en automatisation).
- **Intégration** : connexion entre ton système et un service tiers (ex : "intégration Slack").

## J
- **JSON (JavaScript Object Notation)** : format de données texte, standard pour échanger de l'information entre systèmes.
- **JWT (JSON Web Token)** : un jeton signé utilisé pour authentifier un utilisateur sans avoir à revérifier son mot de passe à chaque requête.

## K
- **Kanban** : méthode de gestion de projet visuelle (colonnes "à faire / en cours / fait"), souvent utilisée pour suivre le développement.

## L
- **Latence** : le temps que met une requête à obtenir une réponse.
- **Load balancer (répartiteur de charge)** : distribue le trafic entre plusieurs serveurs.
- **Logs (journaux)** : traces écrites par une application pour suivre ce qui s'est passé (utile pour déboguer).

## M
- **Middleware** : une fonction qui s'exécute entre la requête et la réponse dans un backend (ex : vérifier l'authentification avant d'exécuter une route).
- **Multi-tenancy** : architecture où plusieurs clients (tenants) partagent la même application tout en ayant leurs données isolées.
- **Migration (BDD)** : script qui modifie la structure d'une base de données de façon versionnée.

## N
- **n8n** : outil open-source d'automatisation de workflows, bonne référence à étudier.
- **Node.js** : environnement qui permet d'exécuter du JavaScript côté serveur.
- **NoSQL** : bases de données qui ne suivent pas le modèle relationnel classique (ex : MongoDB).

## O
- **OAuth / OAuth2** : protocole standard pour autoriser une app à accéder à des données d'un autre service sans partager le mot de passe (ex : "Se connecter avec Google").
- **ORM (Object-Relational Mapping)** : outil qui permet de manipuler une base de données avec du code plutôt qu'avec du SQL brut (ex : Prisma).

## P
- **Payload** : les données réellement transportées dans une requête/réponse.
- **Pipeline** : une suite d'étapes de traitement automatisées.
- **Pull Request (PR)** : proposition de changement de code soumise pour revue avant d'être fusionnée.

## Q
- **Queue (file d'attente)** : structure qui stocke des tâches à traiter dans l'ordre, souvent en arrière-plan (ex : Redis + BullMQ).
- **Query (requête)** : une demande de données, que ce soit à une base de données (requête SQL) ou une API (paramètres d'URL).

## R
- **Rate limiting** : limite du nombre de requêtes qu'une API accepte sur une période donnée.
- **Repository (dépôt)** : un projet suivi par Git (comme `mon-site`).
- **REST** : voir *API REST*.
- **Retry (réessai)** : réexécuter une action après un échec.

## S
- **SaaS (Software as a Service)** : un logiciel accessible en ligne par abonnement, sans installation (ex : Zapier, Notion).
- **Scalabilité** : capacité d'un système à supporter une charge croissante.
- **Serverless** : exécuter du code à la demande sans gérer de serveur soi-même (ex : fonctions AWS Lambda).
- **SQL** : langage utilisé pour interroger les bases de données relationnelles.
- **Stack (technique)** : l'ensemble des technologies utilisées dans un projet (ex : "stack JavaScript : React + Node + PostgreSQL").
- **Stripe** : service de paiement en ligne très utilisé pour la facturation SaaS.

## T
- **Token** : une chaîne de caractères servant à authentifier ou autoriser une requête.
- **TypeScript** : sur-ensemble de JavaScript qui ajoute un système de types.

## U
- **UI (User Interface)** : l'interface visuelle avec laquelle l'utilisateur interagit.
- **UX (User Experience)** : l'expérience globale de l'utilisateur (facilité d'usage, clarté...).

## V
- **Variable d'environnement** : voir *Environnement*.
- **Versioning** : suivre les différentes versions d'un code ou d'une API.

## W
- **Webhook** : un mécanisme où un service externe envoie automatiquement une requête HTTP à ton application dès qu'un événement se produit (ex : Stripe t'envoie un webhook quand un paiement est reçu). Concept central de l'automatisation.
- **Workflow** : une suite d'étapes automatisées (déclencheur → actions) — le cœur d'un outil comme Zapier.

## Z
- **Zapier** : SaaS d'automatisation grand public qui connecte des milliers d'applications entre elles — une référence pour comprendre le produit que tu veux construire.
