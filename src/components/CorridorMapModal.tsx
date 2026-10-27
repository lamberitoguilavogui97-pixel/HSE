import React from 'react';
import { MapPin, Train, Anchor, Mountain, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface CorridorMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CorridorMapModal: React.FC<CorridorMapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const STATIONS = [
    {
      name: 'Port de Morebaya (Forécariah)',
      type: 'port',
      icon: Anchor,
      desc: 'Terminal portuaire en eau profonde & chargement minéralier. Risques : travail maritime, levage lourd, circulation portuaire dense.',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      name: 'Tronçon Ouest : Forécariah - Kindia (PK 0 à PK 180)',
      type: 'rail',
      icon: Train,
      desc: 'Pose de voie ferrée, terrassements côtiers, franchissements de cours d’eau. Risques : saison des pluies, glissements de terrain, convois de ballast.',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      name: 'Base Centrale : Mamou (PK 180 à PK 350)',
      type: 'rail',
      icon: Train,
      desc: 'Zone de relief accidenté, tunnels et viaducs ferroviaires majeurs. Risques : travaux en hauteur, explosifs, circulation convois exceptionnels.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      name: 'Plateforme Logistique : Kankan (PK 350 à PK 520)',
      type: 'depot',
      icon: MapPin,
      desc: 'Base logistique arrière, dépôts d’hydrocarbures et maintenance des engins. Risques : incendies carburants, maintenance sous engins, fatigue chauffeurs.',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      name: 'Gisements Minier : Beyla (Blocs 1, 2, 3 & 4 - PK 650)',
      type: 'mine',
      icon: Mountain,
      desc: 'Mines de fer à ciel ouvert (Simfer / WCS). Risques : dumpers 200T, tirs de mines, carottage géologique, conditions météo en altitude.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-4xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Cartographie Opérationnelle
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              Le Corridor Minier Simandou (650 km de voie ferrée CTG)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Railway Schematic Diagram */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span className="font-bold text-slate-300">Schéma Linéaire du Tracé Ferroviaire &amp; Minier :</span>
            <span className="text-amber-400 font-mono">650 km traversant la Guinée</span>
          </div>

          {/* Graphical timeline track */}
          <div className="relative py-4">
            <div className="h-2 bg-gradient-to-r from-cyan-500 via-amber-500 to-emerald-500 rounded-full w-full" />
            <div className="grid grid-cols-5 gap-2 mt-3 text-center">
              <span className="text-[11px] font-bold text-cyan-400">Port Morebaya (PK 0)</span>
              <span className="text-[11px] font-semibold text-slate-300">Kindia</span>
              <span className="text-[11px] font-bold text-amber-400">Mamou</span>
              <span className="text-[11px] font-semibold text-slate-300">Kankan</span>
              <span className="text-[11px] font-bold text-emerald-400">Beyla Mines (PK 650)</span>
            </div>
          </div>
        </div>

        {/* Hotspots breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-200">
            Points Clés d'Intervention de Simadou Safe Mine HSE :
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {STATIONS.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 text-xs"
                >
                  <div className={`p-2 rounded-lg border shrink-0 ${st.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-100 text-sm">{st.name}</h5>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Nos techniciens HSE sont mobiles et équipés de véhicules tout-terrain 4x4 avec permis minier pour intervenir en moins de 24h sur n'importe quel point kilométrique.
          </span>
        </div>

      </div>
    </div>
  );
};
