#!/bin/bash

# Messaggio di default
DEFAULT_MSG="📦 Push ignorante: tutto sistemato e spinto con amore"

# Colori
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Vai nella cartella dello script
cd "$(dirname "$0")"

# Chiedi messaggio commit o usa default
read -p "💬 Messaggio commit [invio per default]: " msg
if [ -z "$msg" ]; then
  msg="$DEFAULT_MSG"
fi

# Esegui le classiche 3 mosse
echo -e "${GREEN}🔍 Aggiungo tutto...${NC}"
git add .

echo -e "${GREEN}📝 Committo...${NC}"
git commit -m "$msg"

echo -e "${GREEN}📤 Faccio il push su origin/main...${NC}"
git push origin main

echo -e "${GREEN}✅ Fatto!${NC}"

