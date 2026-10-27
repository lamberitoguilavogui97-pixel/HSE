import React from 'react';
import { HardHat, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC<{ onOpenCorridorMap: () => void }> = ({ onOpenCorridorMap }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <HardHat className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight font-heading">
                SIMADOU <span className="text-amber-400">SAFE MINE</span> HSE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cabinet d’assistance technique, d’audit et de conformité HSE dédié aux PME sous-traitantes du corridor minier et ferroviaire Simandou (Guinée).
            </p>
            <div className="text-[11px] text-amber-400 font-semibold">
              « Zéro arrêt de chantier • Zéro incident majeur »
            </div>
          </div>

          {/* Col 2: Forfaits & Services */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Forfaits d'Assistance
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Pack Basic (1 200 $/mois) - 1 visite mensuelle</li>
              <li>Pack Standard (2 500 $/mois) - 1 jour/semaine</li>
              <li>Pack Premium (4 000 $/mois) - 2 à 3 jours/semaine</li>
              <li>Remise contractuelle 15% pour 12 mois</li>
              <li>Audit Initial Flash déductible (500$ - 1 000$)</li>
            </ul>
          </div>

          {/* Col 3: Secteurs PME Simandou */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Corps de Métier Accompagnés
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Transport routier lourd, hydrocarbures &amp; convois</li>
              <li>BTP, terrassement &amp; voie ferrée CTG</li>
              <li>Restauration de camp &amp; gestion des bases-vie</li>
              <li>Sécurité, gardiennage &amp; contrôle d’accès</li>
              <li>Location &amp; conduite d’engins de terrassement</li>
            </ul>
          </div>

          {/* Col 4: Contact & Agences */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Bases Opérationnelles
            </h4>
            <div className="space-y-1 text-slate-400 text-xs">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Siège : Camayenne, Conakry, Guinée</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Antennes : Morebaya (Port) &amp; Beyla (Mines)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Hotline : +224 624405552</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contact@simandousafepro.com</span>
              </div>
            </div>
            <button
              onClick={onOpenCorridorMap}
              className="mt-2 text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Consulter la carte du corridor</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Legal & Standards */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Simadou Safe Mine HSE SARL. Tous droits réservés. République de Guinée.
          </div>
          <div className="flex items-center gap-4">
            <span>Conforme Code Minier Guinéen</span>
            <span>•</span>
            <span>Standards ISO 45001 &amp; ISO 14001</span>
            <span>•</span>
            <span>Accompagnement à la conformité aux exigences HSE des donneurs d'ordre du corridor Simandou</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
