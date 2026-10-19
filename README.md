# CCOS : Plateforme d'inscription administrative (Spring Boot + Angular)

![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?logo=springboot&logoColor=white)
![JHipster](https://img.shields.io/badge/JHipster-8.1-3E8ACC?logo=jhipster&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

Projet de **montée en compétence au CCOS** : une application de gestion des inscriptions administratives universitaires, construite avec une API **Spring Boot** (générée avec JHipster) et un front-end **Angular** indépendant qui la consomme via JWT.

Le service de scolarité gère le référentiel (formations, niveaux, années académiques), les comptes étudiants, les inscriptions et les annonces ; chaque étudiant dispose d'un espace personnel pour suivre ses inscriptions.

---

## Fonctionnalités

**Scolarité** (rôle `ROLE_ADMIN`)
- Tableau de bord
- Gestion des étudiants : création du compte utilisateur et de la fiche étudiant (code, téléphone, e-mail personnel, adresse, sexe, date de naissance)
- Gestion des formations, niveaux et années académiques
- Gestion des inscriptions (étudiant × formation × niveau × année)
- Publication d'informations (titre, image, contenu) affichées sur la page d'accueil
- Consultation et modification du profil

**Étudiant** (rôle `ROLE_USER`)
- Espace personnel : informations et liste de ses inscriptions
- Activation du compte : à sa création, l'étudiant reçoit un e-mail avec un lien pour définir son mot de passe

**Public**
- Page d'accueil avec les annonces, vidéo de présentation et guide PDF
- Connexion, réinitialisation du mot de passe

## Architecture

```
ccos-monteecompetence/
├── monteecompetenceback-main/monteecompetenceback-main/   # API REST (JHipster 8.1, monolithe)
│   ├── src/main/java/dev/junior/ccos/
│   │   ├── domain/        # Entités JPA : Etudiant, Formation, Niveau, AnneeAcademique, Inscription, Information
│   │   ├── repository/    # Spring Data JPA
│   │   ├── service/       # Services, DTO et mappers MapStruct
│   │   ├── web/rest/      # Contrôleurs REST (/api/...)
│   │   └── security/      # JWT, rôles
│   ├── src/main/resources/config/
│   │   ├── application*.yml
│   │   └── liquibase/     # Schéma et données initiales
│   └── .jhipster/         # Définition des entités
└── monteecompetencefront-main/monteecompetencefront-main/ # Front-end Angular 17 (standalone)
    └── src/app/
        ├── core/          # Services API, auth (guards, intercepteur JWT)
        ├── shared/        # Composants communs, modèles, directive de rôle
        └── views/         # home, auth, etudiant, scolarite
```

**Modèle de données**

```
Etudiant ──1:1── User (compte JHipster)
Etudiant ──1:N── Inscription ──N:1── Formation
                             ──N:1── Niveau
                             ──N:1── AnneeAcademique
Information (annonces, indépendante)
```

**Principaux points d'API** (préfixe `/api`) : `authenticate`, `account`, `admin/users`, `etudiants` (dont `by-user/{userId}`), `inscriptions` (dont `list-inscription-etudiant/{id}` et `{id}/info-direct`), `formations`, `niveaus`, `annee-academiques`, `information`.

## Prérequis

- Java 17
- Node.js 18+ et npm
- PostgreSQL 14+
- Un compte SMTP (envoi des e-mails d'activation et de réinitialisation)

## Installation

### 1. Base de données

```sql
CREATE DATABASE monteecompetenceback;
```

### 2. Back-end

```bash
cd monteecompetenceback-main/monteecompetenceback-main
```

Le fichier de configuration de développement `src/main/resources/config/application-dev.yml` n'est pas versionné. Créez-le à partir de `application-prod.yml` en renseignant vos propres valeurs :

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/monteecompetenceback
    username: <utilisateur>
    password: <mot-de-passe>
  mail:
    host: smtp.gmail.com
    port: 587
    username: <adresse e-mail>
    password: <mot de passe d'application>
jhipster:
  security:
    authentication:
      jwt:
        base64-secret: <clé secrète en base64, au moins 64 octets>
```

Puis lancez l'API (Liquibase crée les tables au premier démarrage) :

```bash
./mvnw            # Windows : mvnw.cmd
```

L'API écoute sur `http://localhost:8080`. Liquibase crée deux comptes par défaut, `admin` (rôle scolarité) et `user`, avec les mots de passe JHipster par défaut : changez-les dès la première connexion.

### 3. Front-end

```bash
cd monteecompetencefront-main/monteecompetencefront-main
npm install
npm start          # ng serve
```

Ouvrez `http://localhost:4200`. Les URL de l'API se règlent dans `src/environments/environment.ts`.

## Tests

```bash
# Back-end
./mvnw verify

# Front-end
npm test
```

## Pistes d'amélioration

- Externaliser tous les secrets (base de données, SMTP, clé JWT) dans des variables d'environnement, y compris pour le profil `prod`.
- Générer un certificat d'inscription en PDF depuis l'espace étudiant.
- Ajouter un `docker-compose` (PostgreSQL + API + front) pour démarrer le projet en une commande.
- Regrouper `back/` et `front/` à la racine du dépôt (les dossiers sont actuellement imbriqués deux fois).

## Auteur

Demba Hamet Guissé
