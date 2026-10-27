import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // HSE AI Assistant & Document Generator endpoint
  app.post('/api/generate-hse', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Clé API Gemini non configurée sur le serveur.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const { type, industry, pmeName, details } = req.body;

      let systemInstruction = `Tu es l'ingénieur HSE en chef et directeur de Simadou Safe Mine HSE, cabinet expert en santé, sécurité et environnement pour les PME sous-traitantes du mégaprojet minier Simandou en Guinée (donneurs d'ordre : Rio Tinto Simfer, Winning Consortium Simandou - WCS, Baowu, Compagnie du Transguinéen - CTG / CFTG, Port de Morebaya, Mines de Beyla et Forécariah).
Tes réponses doivent être ultra-professionnelles, concrètes, conformes aux standards OHSAS / ISO 45001 / ISO 14001 et aux règles d'or (Golden Rules) minières. Ton style est clair, structuré avec des puces précises, des actions mesurables et du vocabulaire technique adapté au terrain guinéen.`;

      let prompt = '';
      if (type === 'audit-checklist') {
        prompt = `Génère une Check-list d'Audit Initial & Diagnostic Flash pour l'entreprise "${pmeName || 'PME Sous-traitante'}" opérant dans le secteur "${industry}".
Détails opérationnels: "${details || 'Opérations quotidiennes sur le corridor ferroviaire et minier Simandou'}".

Inclus impérativement :
1. RAPPEL DES EXIGENCES DONNEURS D'ORDRE (Rio Tinto Simfer / WCS / CTG)
2. LES 7 POINTS BLOQUANTS ÉLIMINATOIRES LORS D'UN AUDIT CLIENT (Non-conformités majeures entraînant arrêt de chantier immédiat)
3. MATRICE D'ÉVALUATION RAPIDE DES RISQUES SPÉCIFIQUES (Risque, Gravité/Probabilité, Mesure Barrière obligatoire)
4. PLAN D'ACTIONS CORRECTIVES SUR 30 JOURS (Semaine 1 à 4 pour être prêt à l'inspection)
5. RECOMMANDATION D'ACCOMPAGNEMENT SIMADOU SAFE MINE HSE (Forfait Basic, Standard ou Premium adapté)`;
      } else if (type === 'toolbox-talk') {
        prompt = `Rédige une fiche complète de "Causerie Sécurité / 1/4 d'heure HSE" (Toolbox Talk) terrain pour l'activité "${industry}".
Sujet précis: "${details || 'Circulation sur piste latéritique, angles morts des engins 100T et poussières'}".
Entreprise: "${pmeName || 'Sous-traitant Simandou'}".

Format demandé :
- THÈME & OBJECTIF CLAIR (Durée : 15 minutes)
- RETOUR D'EXPÉRIENCE OU SCÉNARIO RÉEL DU CORRIDOR (Ce qui s'est déjà produit ou failli se produire)
- LES 5 RÈGLES D'OR VITALES À APPLIQUER MAINTENANT
- 3 QUESTIONS PIÈGES À POSER AUX ÉQUIPES POUR TESTER LEUR VIGILANCE
- ENGAGEMENT DU JOUR ET FORMULE DE CONCLUSION DU CHEF D'ÉQUIPE
- ENCADRÉ D'ÉMARGEMENT TYPE (Date, Chantier, Nom superviseur)`;
      } else if (type === 'prequal-doc') {
        prompt = `Rédige une synthèse de "Dossier de Pré-qualification HSE & Engagement de Direction" prête à être soumise aux départements Achats et QHSE des grands comptes (Rio Tinto / WCS / CTG) pour la PME "${pmeName || 'PME Partenaire'}" dans le domaine "${industry}".
Spécificités: "${details || 'Candidature pour contrat de sous-traitance corridor'}".

Structure :
1. DÉCLARATION D'ENGAGEMENT SÉCURITÉ ZÉRO ACCIDENT DE LA DIRECTION GÉNÉRALE
2. ORGANISATION ET RESPONSABILITÉS HSE SUR SITE
3. PROCÉDURES CLÉS (Permis de travail, port des EPI certifiés, maintenance préventive, causeries)
4. PROTOCOLE D'ALERTE EN CAS D'INCIDENT / PRESQU'ACCIDENT (Délai de notification 2h)
5. CERTIFICATION DE CONFORMITÉ ENVERS LE DONNEUR D'ORDRE`;
      } else if (type === 'objection-advice') {
        prompt = `En tant que directeur commercial du cabinet Simadou Safe Mine HSE, conseille notre consultant qui est au téléphone avec un gérant de PME de "${industry}" sur le corridor Simandou.
L'objection du gérant est : "${details}".
Donne la réponse tactique en 3 points :
1. Reformulation empathique
2. L'argument choc lié aux risques réels de Simandou (pénalités, exclusion d'appel d'offres, immobilisation de camions/chantiers)
3. La proposition de transition vers l'Audit Initial gratuit ou à tarif réduit pour débloquer le rendez-vous.`;
      } else {
        prompt = `En tant qu'expert de Simadou Safe Mine HSE, analyse la demande suivante pour le secteur ${industry}: ${details}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ result: response.text });
    } catch (err: any) {
      console.error('API Error /api/generate-hse:', err);
      res.status(500).json({ error: err.message || 'Erreur lors de la génération du document HSE' });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Simadou Safe Mine HSE API',
      timestamp: new Date().toISOString(),
    });
  });

  // Dev mode: Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Simadou Safe Mine HSE] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
