# French Translation Plan

> **~170 English strings** to translate across **10 frontend components + 4 backend services**.
> Items marked ✅ are already in French.

---

## 1. Header (`frontend/src/app/components/header/header.component.ts`)

| Current (EN)  | → French (FR)       |
|---------------|---------------------|
| Home          | Accueil             |
| Dashboard     | Tableau de bord     |
| Profile       | Profil              |
| Logout (title)| Se déconnecter     |
| Login (title) | Se connecter        |

---

## 2. Hero (`frontend/src/app/components/hero/hero.component.ts`)

| Current | Status |
|---------|--------|
| Rechercher un intitulé du poste ou PFE | ✅ Already French |
| Rechercher un emplacement | ✅ Already French |
| Rechercher | ✅ Already French |

**No changes needed.**

---

## 3. Offers Section (`frontend/src/app/components/offers-section/offers-section.component.ts`)

| Current (EN)              | → French (FR)                  |
|---------------------------|--------------------------------|
| ✅ Offres de stage disponibles | — |
| ✅ Chargement des offres... | — |
| ✅ Aucune offre disponible... | — |
| Like (title attr)          | J'aime                         |
| Apply                      | Postuler                       |
| Applied ✓                  | Postulé ✓                      |
| Sign in to apply           | Connectez-vous pour postuler   |
| Posted by:                 | Publié par :                   |
| Date:                      | Date :                         |
| Liked                      | Aimé                           |
| Like (modal btn)           | J'aime                         |
| Apply Now                  | Postuler maintenant            |

---

## 4. Login (`frontend/src/app/components/auth/login.component.ts`)

| Current (EN)                        | → French (FR)                                |
|-------------------------------------|----------------------------------------------|
| Internship & PFE Management        | Gestion des Stages & PFE                     |
| Sign In (heading)                   | Connexion                                    |
| Access your internship platform     | Accédez à votre plateforme de stages         |
| Email Address                       | Adresse e-mail                               |
| your@email.com (placeholder)        | votre@email.com                              |
| Password                            | Mot de passe                                 |
| ••••••••                            | ••••••••                                     |
| Forgot password?                    | Mot de passe oublié ?                        |
| Signing in...                       | Connexion en cours...                        |
| Sign In (button)                    | Se connecter                                 |
| or                                  | ou                                           |
| Don't have an account?              | Vous n'avez pas de compte ?                  |
| Create one                          | Créer un compte                              |
| Please enter email and password (TS)| Veuillez saisir votre e-mail et mot de passe |
| Login failed. Please try again. (TS)| Échec de la connexion. Veuillez réessayer.   |

---

## 5. Signup (`frontend/src/app/components/auth/signup.component.ts`)

| Current (EN)                                             | → French (FR)                                                       |
|----------------------------------------------------------|---------------------------------------------------------------------|
| Internship & PFE Management                             | Gestion des Stages & PFE                                            |
| Create Account                                           | Créer un compte                                                     |
| Sign up to browse and apply for internship offers        | Inscrivez-vous pour consulter et postuler aux offres de stage       |
| First Name                                               | Prénom                                                              |
| John (placeholder)                                       | Jean                                                                |
| Last Name                                                | Nom                                                                 |
| Doe (placeholder)                                        | Dupont                                                              |
| Email Address                                            | Adresse e-mail                                                      |
| your@email.com                                           | votre@email.com                                                     |
| Password                                                 | Mot de passe                                                        |
| Min. 12 characters                                       | Min. 12 caractères                                                  |
| Must contain uppercase, lowercase, number & special char | Doit contenir majuscule, minuscule, chiffre et caractère spécial    |
| I agree to the                                           | J'accepte les                                                       |
| Terms                                                    | Conditions                                                          |
| and                                                      | et la                                                               |
| Privacy Policy                                           | Politique de confidentialité                                        |
| Creating Account...                                      | Création du compte...                                               |
| Create Account (button)                                  | Créer un compte                                                     |
| Already have an account?                                 | Vous avez déjà un compte ?                                          |
| Sign In                                                  | Se connecter                                                        |
| Please fill in all required fields (TS)                  | Veuillez remplir tous les champs obligatoires                       |
| Please agree to the terms and conditions (TS)            | Veuillez accepter les conditions d'utilisation                      |
| Signup failed. Please try again. (TS)                    | Échec de l'inscription. Veuillez réessayer.                         |

---

## 6. Profile (`frontend/src/app/components/profile/profile.component.ts`)

| Current (EN)                                  | → French (FR)                                       |
|-----------------------------------------------|-----------------------------------------------------|
| My Account                                    | Mon Compte                                          |
| View and manage your account information      | Consultez et gérez vos informations de compte       |
| Personal Information                          | Informations personnelles                           |
| First Name                                    | Prénom                                              |
| Last Name                                     | Nom                                                 |
| Email Address                                 | Adresse e-mail                                      |
| Role & Department                             | Rôle & Département                                  |
| Role                                          | Rôle                                                |
| Department                                    | Département                                         |
| Edit Profile (section heading)                | Modifier le profil                                  |
| First Name (edit label)                       | Prénom                                              |
| Last Name (edit label)                        | Nom                                                 |
| Email (edit label)                            | E-mail                                              |
| Cancel                                        | Annuler                                             |
| Saving...                                     | Enregistrement...                                   |
| Save Changes                                  | Enregistrer                                         |
| Edit Profile (button)                         | Modifier le profil                                  |
| Sign Out                                      | Se déconnecter                                      |
| Loading your profile...                       | Chargement de votre profil...                       |
| HR Admin (TS)                                 | Administrateur RH                                   |
| Department Chief (TS)                         | Chef de département                                 |
| Super Admin (TS)                              | Super administrateur                                |
| Candidate (TS)                                | Candidat                                            |
| Update failed. Please try again. (TS)         | Échec de la mise à jour. Veuillez réessayer.        |

---

## 7. Candidate Dashboard (`frontend/src/app/components/dashboard/candidate-dashboard.component.ts`)

| Current (EN)                                                          | → French (FR)                                                        |
|-----------------------------------------------------------------------|----------------------------------------------------------------------|
| Welcome back, {{ userName }}!                                         | Bon retour, {{ userName }} !                                         |
| Track your liked offers and applications.                             | Suivez vos offres aimées et vos candidatures.                        |
| Liked Offers (stat label)                                             | Offres aimées                                                        |
| My Applications (stat label)                                          | Mes candidatures                                                     |
| Liked Offers ({{ count }}) (tab)                                      | Offres aimées ({{ count }})                                          |
| My Applications ({{ count }}) (tab)                                   | Mes candidatures ({{ count }})                                       |
| You haven't liked any offers yet. Browse offers and save your favorites! | Vous n'avez aimé aucune offre. Parcourez les offres et sauvegardez vos favoris ! |
| Applied                                                               | Postulé                                                              |
| Apply                                                                 | Postuler                                                             |
| Offer (fallback title)                                                | Offre                                                                |
| You haven't applied to any offers yet.                                | Vous n'avez postulé à aucune offre.                                  |
| Submitted (TS)                                                        | Soumise                                                              |
| Under Review (TS)                                                     | En cours d'examen                                                    |
| Accepted (TS)                                                         | Acceptée                                                             |
| Rejected (TS)                                                         | Rejetée                                                              |

---

## 8. Chief Dashboard (`frontend/src/app/components/dashboard/chief-dashboard.component.ts`)

| Current (EN)                                                       | → French (FR)                                                          |
|--------------------------------------------------------------------|------------------------------------------------------------------------|
| Department Chief Dashboard                                         | Tableau de bord Chef de département                                    |
| Manage your internship offers and track their status.              | Gérez vos offres de stage et suivez leur statut.                       |
| New Offer                                                          | Nouvelle offre                                                         |
| Total Offers                                                       | Total des offres                                                       |
| Pending Approval                                                   | En attente d'approbation                                               |
| Approved                                                           | Approuvées                                                             |
| Declined                                                           | Refusées                                                               |
| My Offers                                                          | Mes offres                                                             |
| You haven't created any offers yet. Click "New Offer" to get started. | Vous n'avez créé aucune offre. Cliquez sur « Nouvelle offre » pour commencer. |
| Title (table header)                                               | Titre                                                                  |
| Topics (table header)                                              | Sujets                                                                 |
| Status                                                             | Statut                                                                 |
| Applicants                                                         | Candidats                                                              |
| Created                                                            | Créée le                                                               |
| Actions                                                            | Actions                                                                |
| Edit                                                               | Modifier                                                               |
| Edit Offer (modal)                                                 | Modifier l'offre                                                       |
| Create New Offer (modal)                                           | Créer une nouvelle offre                                               |
| Title (form label)                                                 | Titre                                                                  |
| e.g. Stage Développeur Web (placeholder)                           | ex. Stage Développeur Web                                              |
| Description (form label)                                           | Description                                                            |
| Describe the internship... (placeholder)                           | Décrivez le stage...                                                   |
| Topics (max 3)                                                     | Sujets (max 3)                                                         |
| Maximum 3 topics allowed                                           | Maximum 3 sujets autorisés                                             |
| Cancel                                                             | Annuler                                                                |
| Saving...                                                          | Enregistrement...                                                      |
| Update                                                             | Mettre à jour                                                          |
| Create                                                             | Créer                                                                  |
| Something went wrong. Please try again. (TS)                      | Une erreur est survenue. Veuillez réessayer.                           |

---

## 9. HR Dashboard (`frontend/src/app/components/dashboard/hr-dashboard.component.ts`)

| Current (EN)                                                             | → French (FR)                                                          |
|--------------------------------------------------------------------------|------------------------------------------------------------------------|
| HR Admin Dashboard                                                       | Tableau de bord Administration RH                                      |
| Review, approve, and decline internship offers from Department Chiefs.   | Examinez, approuvez et refusez les offres de stage des chefs de département. |
| Total Offers                                                             | Total des offres                                                       |
| Pending Review                                                           | En attente d'examen                                                    |
| Approved                                                                 | Approuvées                                                             |
| Declined                                                                 | Refusées                                                               |
| All                                                                      | Toutes                                                                 |
| Pending ({{ count }})                                                    | En attente ({{ count }})                                               |
| Approved (filter)                                                        | Approuvées                                                             |
| Declined (filter)                                                        | Refusées                                                               |
| No offers matching this filter.                                          | Aucune offre ne correspond à ce filtre.                                |
| applicant / applicants                                                   | candidat / candidats                                                   |
| Approve                                                                  | Approuver                                                              |
| Decline                                                                  | Refuser                                                                |

---

## 10. Footer (`frontend/src/app/components/footer/footer.component.ts`)

**✅ Already fully in French.** No changes needed.

---

## 11. Landing / FAQ (`frontend/src/app/components/landing/landing.component.ts`)

**✅ Already fully in French.** No changes needed.

---

## 12. Backend – Auth Service (`backend/src/auth/auth.service.ts`)

| Current (EN)                                        | → French (FR)                                                    |
|-----------------------------------------------------|------------------------------------------------------------------|
| User with this email already exists                 | Un utilisateur avec cet e-mail existe déjà                       |
| Candidate role not configured                       | Rôle candidat non configuré                                      |
| Department is required for DEPT_CHIEF role          | Le département est requis pour le rôle chef de département       |
| Invalid role                                        | Rôle invalide                                                    |
| Invalid or expired activation token                 | Jeton d'activation invalide ou expiré                            |
| Account activated successfully                      | Compte activé avec succès                                        |
| Invalid credentials                                 | Identifiants invalides                                           |
| Account locked until ${date}                        | Compte verrouillé jusqu'au ${date}                               |
| Account is suspended                                | Le compte est suspendu                                           |
| Account is not activated                            | Le compte n'est pas activé                                       |
| Account locked due to multiple failed attempts      | Compte verrouillé suite à plusieurs tentatives échouées          |
| Invalid or expired refresh token                    | Jeton de rafraîchissement invalide ou expiré                     |
| User not found or inactive                          | Utilisateur introuvable ou inactif                               |
| Logged out successfully                             | Déconnexion réussie                                              |
| User not found                                      | Utilisateur introuvable                                          |
| Email already in use                                | Cet e-mail est déjà utilisé                                      |
| If the email exists, a reset link has been sent     | Si l'e-mail existe, un lien de réinitialisation a été envoyé     |
| Invalid or expired reset token                      | Jeton de réinitialisation invalide ou expiré                     |
| Cannot reuse recent passwords                       | Impossible de réutiliser les mots de passe récents               |
| Password reset successfully                         | Mot de passe réinitialisé avec succès                            |
| Multiple failed login attempts                      | Tentatives de connexion échouées multiples                       |

---

## 13. Backend – Auth Controller (`backend/src/auth/auth.controller.ts`)

| Current (EN)                    | → French (FR)                              |
|---------------------------------|--------------------------------------------|
| Refresh token not provided      | Jeton de rafraîchissement non fourni       |
| Logged out successfully         | Déconnexion réussie                        |

> Swagger `@ApiOperation` / `@ApiResponse` descriptions are developer-facing API docs and can remain in English.

---

## 14. Backend – Offers Service (`backend/src/offers/offers.service.ts`)

| Current (EN)                                     | → French (FR)                                            |
|--------------------------------------------------|----------------------------------------------------------|
| You must belong to a department to create offers | Vous devez appartenir à un département pour créer des offres |
| One or more topic IDs are invalid                | Un ou plusieurs identifiants de sujet sont invalides     |
| Offer not found                                  | Offre introuvable                                        |
| You can only view your own offers                | Vous ne pouvez voir que vos propres offres               |
| You can only edit your own offers                | Vous ne pouvez modifier que vos propres offres           |

---

## 15. Backend – Applications Service (`backend/src/applications/applications.service.ts`)

| Current (EN)                              | → French (FR)                                   |
|-------------------------------------------|-------------------------------------------------|
| Offer not found or not available          | Offre introuvable ou non disponible              |
| You have already applied to this offer    | Vous avez déjà postulé à cette offre            |

---

## 16. Backend – Likes Service (`backend/src/likes/likes.service.ts`)

| Current (EN)                              | → French (FR)                                   |
|-------------------------------------------|-------------------------------------------------|
| Offer not found or not available          | Offre introuvable ou non disponible              |
| You have already liked this offer         | Vous avez déjà aimé cette offre                 |
| Like not found                            | Like introuvable                                |

---

## Summary

| Area               | Strings to translate | Already French |
|--------------------|:--------------------:|:--------------:|
| Header             | 5                    | 0              |
| Hero               | 0                    | 3              |
| Offers Section     | 11                   | 3              |
| Login              | 15                   | 0              |
| Signup             | 22                   | 0              |
| Profile            | 22                   | 0              |
| Candidate Dashboard| 15                   | 0              |
| Chief Dashboard    | 28                   | 0              |
| HR Dashboard       | 14                   | 0              |
| Footer             | 0                    | 10+            |
| Landing/FAQ        | 0                    | 7              |
| Backend Auth       | 22                   | 0              |
| Backend Offers     | 5                    | 0              |
| Backend Apps       | 2                    | 0              |
| Backend Likes      | 3                    | 0              |
| **TOTAL**          | **~164**             | **~23**        |
