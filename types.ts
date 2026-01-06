export interface MenuItem {
  id: string;
  name: string;
  category?: 'food' | 'drink' | 'dessert';
  selected: boolean;
}

export interface AppState {
  logo: string | null;
  title: string;
  items: MenuItem[];
}