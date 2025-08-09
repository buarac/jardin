#!/usr/bin/env bash
set -e

YELLOW='\033[1;33m'; GREEN='\033[1;32m'; RED='\033[1;31m'; NC='\033[0m'

say() { echo -e "$1"; }
ok()  { say "${GREEN}✔${NC} $1"; }
warn(){ say "${YELLOW}⚠${NC} $1"; }
err() { say "${RED}✖${NC} $1"; }

# 0) Dans un dépôt Git ?
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  err "Tu n’es pas dans un dépôt Git."
  exit 1
fi

# 1) Remote configuré ?
if ! git remote get-url origin >/dev/null 2>&1; then
  warn "Aucun remote 'origin' configuré."
  say "   → Fais:  git remote add origin <URL-de-ton-repo>"
else
  ok "Remote 'origin' = $(git remote get-url origin)"
fi

# 2) Récupère l’état distant (silencieusement)
git fetch -q origin || true

# 3) Branche actuelle / detached HEAD ?
HEAD_DESC=$(git rev-parse --abbrev-ref HEAD)
if [ "$HEAD_DESC" = "HEAD" ]; then
  warn "Tu es en mode ${YELLOW}detached HEAD${NC} (sur un tag ou un commit, pas sur une branche)."
  say "   → Reviens sur une branche avec :  git switch main"
  say "   → Ou crée une branche depuis ici :  git switch -c ma-branche"
else
  ok "Branche actuelle : ${HEAD_DESC}"
fi

# 4) Rebase / merge en cours ?
if [ -d .git/rebase-apply ] || [ -d .git/rebase-merge ]; then
  warn "Un ${YELLOW}rebase${NC} est en cours."
  say "   → Termine-le :  git rebase --continue"
  say "   → Ou annule-le :  git rebase --abort"
fi
if [ -f .git/MERGE_HEAD ]; then
  warn "Un ${YELLOW}merge${NC} est en cours."
  say "   → Termine-le :  git commit"
  say "   → Ou annule-le :  git merge --abort"
fi

# 5) Modifs locales non commitées ?
PORC=$(git status --porcelain)
if [ -n "$PORC" ]; then
  warn "Tu as des changements non commitées (ou non suivis)."
  say "   → Pour enregistrer :  git add -A && git commit -m \"wip\""
  say "   → Ou pour mettre de côté :  git stash push -u -m \"wip\""
else
  ok "Aucune modification locale en attente."
fi

# 6) En avance / en retard sur origin ?
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "HEAD" ] && git rev-parse --verify "origin/$BRANCH" >/dev/null 2>&1; then
  # comptera les commits gauche(distant)..droite(local)
  set +e
  AHEAD_BEHIND=$(git rev-list --left-right --count "origin/$BRANCH...$BRANCH" 2>/dev/null)
  set -e
  LEFT=$(echo "$AHEAD_BEHIND" | awk '{print $1}')   # commits sur origin non présents en local
  RIGHT=$(echo "$AHEAD_BEHIND" | awk '{print $2}')  # commits en local non présents sur origin

  if [ -z "$AHEAD_BEHIND" ]; then
    warn "Impossible de comparer avec origin/$BRANCH (pas d’accès ?)."
  else
    if [ "$RIGHT" -gt 0 ] && [ "$LEFT" -eq 0 ]; then
      warn "Ta branche est ${YELLOW}en avance${NC} de $RIGHT commit(s) sur origin/$BRANCH."
      say "   → Publie:  git push"
    elif [ "$LEFT" -gt 0 ] && [ "$RIGHT" -eq 0 ]; then
      warn "Ta branche est ${YELLOW}en retard${NC} de $LEFT commit(s) par rapport à origin/$BRANCH."
      say "   → Récupère:  git pull --ff-only   (ou  git pull --rebase)"
    elif [ "$LEFT" -gt 0 ] && [ "$RIGHT" -gt 0 ]; then
      warn "Ta branche et origin/$BRANCH ont divergé (tu as $RIGHT commit(s) locaux, origin en a $LEFT)."
      say "   → Recommande:  git pull --rebase   (puis résous conflits si besoin)"
    else
      ok "Ta branche est alignée avec origin/$BRANCH."
    fi
  fi
else
  warn "Pas de branche distante correspondante (origin/$BRANCH). Si normal, ignore."
fi

# 7) Dossier public/ suivi par Git ?
if git ls-files --error-unmatch public >/dev/null 2>&1; then
  warn "Le dossier ${YELLOW}public/${NC} est versionné."
  say "   → Si tu veux qu'il soit ignoré (recréé par ton prebuild) :"
  say "     1) Ajoute /public à .gitignore (au bon niveau)"
  say "     2) Dé-versionne sans supprimer les fichiers locaux :"
  say "        git rm -r --cached public && git commit -m \"chore: untrack public\""
else
  ok "public/ n'est pas suivi par Git (ok si tu le régénères en prebuild)."
fi

# 8) Conseil prod (NUC)
HOST=$(hostname 2>/dev/null || echo "")
if echo "$HOST" | grep -iq "nuc"; then
  warn "Tu sembles être sur le NUC (host: $HOST). Évite d'éditer ici."
  say "   → Déploiement typique :"
  say "      git fetch --all && git checkout main && git pull --ff-only"
  say "      # ou verrouille une version : git checkout v1.x.y"
fi

say ""
ok "Diagnostic terminé."
say "Pro tip : configure un pull plus strict :"
say "  git config --global pull.ff only     # pas de merge automatique"
say "  # (optionnel) git config --global pull.rebase true"
