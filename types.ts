export interface MenuItem {
  id: string;
  name: string;
  category?: 'food' | 'drink' | 'dessert';
  selected: boolean;
  quantity: number;
}

export interface FontSettings {
  family: string;
  size: number;
  color: string;
  isBold: boolean;
  isUppercase: boolean;
}

export interface SebraeConfig {
  rowColors: string[];
}

export interface AppState {
  logo: string | null;
  title: string;
  items: MenuItem[];
  fontSettings: FontSettings;
  sebraeConfig: SebraeConfig;
}