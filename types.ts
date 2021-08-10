/*******************
 * JSON Object Types
 *******************/
export interface ItemData {
  total_pages: number;
  total_entries: number;
}

export type WinesArray = Wine[];
export type ProteinsArray = Protein[];
export type SaucesArray = Sauce[];
export type GrapesArray = Grape[];
export type DishesArray = Dish[];

export interface WinesData extends ItemData {
  wines: WinesArray;
}

export interface GrapesData extends ItemData {
  grapes: GrapesArray;
}

export interface DishesData extends ItemData {
  dishes: DishesArray;
}

export interface ProteinsData extends ItemData {
  proteins: ProteinsArray;
}

export interface SaucesData extends ItemData {
  sauces: SaucesArray;
}

export interface UsersData {
  users: User[];
}

export interface UserData {
  is_logged_in: boolean;
  user: User;
}

export interface OneUserData {
  user: User;
}

/**********************
 * Data Types
 **********************/

export type Item = Wine | Protein | Sauce;

export interface Wine {
  id: number;
  name: string;
  description: string;
  producer: string;
  vintage?: number;
  has_vintage: boolean;
  country: string;
  region?: string;
  subregion?: string;
}

export interface Grape {
  id: number;
  name: string;
  description?: string;
}

export interface Dish {
  id: number;
  name: string;
  description?: string;
}

export interface Protein {
  id: number;
  name: string;
}

export interface Sauce {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  is_admin: boolean;
  account_id: number;
}

/***********************
 * Form Types
 ***********************/

export interface SignInValues {
  username: string;
  password: string;
}

export interface FetchOptions {
  body?: string;
  headers: Headers;
  method: string;
  credentials?: RequestCredentials;
}

/*********************
 * Prop Types
 ********************/

export interface CurrentUserProps {
  currentUser: User;
}

export interface CurrentUserAndQueryProps extends CurrentUserProps {
  query: {
    id?: string;
    token?: string;
  };
}
