import {
  Heart, Brain, Zap, Droplets, Shield, Syringe,
  AlertOctagon, Droplet, Wind, Calculator, Pill,
  Activity, Table2, ChevronRight,
} from 'lucide-react';

const ICON_MAP = {
  Heart,
  Brain,
  Zap,
  Droplets,
  Shield,
  Syringe,
  AlertOctagon,
  Droplet,
  Wind,
  Calculator,
  Pill,
  Activity,
  Table2,
  ChevronRight,
};

export default function ModuleIcon({ name, size = 20, className = '' }) {
  const Icon = ICON_MAP[name] ?? Activity;
  return <Icon size={size} className={className} />;
}