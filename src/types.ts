// Navigation types

export type RootStackParams = {
  EventDashboard: undefined;
  EventDetails: undefined;
};

export type EventDetailsTabParams = {
  Players: PlayersStackParams;
  Orders: OrdersStackParams;
  Holdings: HoldingsStackParams;
  Activity: ActivityStackParams;
  Leaderboard: LeaderboardStackParams;
};

export type PlayersStackParams = {
  EventPlayers: undefined;
};

export type OrdersStackParams = {
  EventOrders: undefined;
};

export type HoldingsStackParams = {
  EventHoldings: undefined;
};

export type ActivityStackParams = {
  EventActivity: undefined;
};

export type LeaderboardStackParams = {
  EventLeaderboard: undefined;
};

// Sort types

export enum TradeableSortType {
  PointsProjected = 'pointsProjected',
  PointsScored = 'pointsScored',
  PriceEstimated = 'priceEstimated',
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

// Event data types

export interface Weather {
  status: string;
  event: Event;
}

export interface Event {
  id: string;
  object: string;
  name: string;
  description: string;
  type: string;
  status: string;
  league: string;
  is_simulated: boolean;
  currency: string;
  shares: number;
  updated_at: number;
  scoring_method: string;
  ipo_open_at: number;
  live_at_estimated: number;
  close_at_estimated: number;
  starting_bid: number;
  min_tick: number;
  ipo_completed_at: number;
  amount_completed: number;
  tradeables?: TradeablesEntity[] | null;
  games?: GamesEntity[] | null;
}

export interface TradeablesEntity {
  id: string;
  object: string;
  league: string;
  entity_id: string;
  event_id: string;
  focus_game_id: string;
  shares: number;
  amount_completed?: number | null;
  price: Price;
  rank: Rank;
  points: Points;
  stats?: StatsEntity[] | null;
  updated_at: number;
  entity: Entity;
}

export interface Price {
  ipo?: number | null;
  last?: number | null;
  estimated?: number | null;
  bid?: number | null;
  ask?: number | null;
}

export interface Rank {
  projected: number;
  projected_live: number;
  scored: number;
  price: number;
}

export interface Points {
  projected: number;
  projected_live?: number | null;
  scored?: number | null;
}

export interface StatsEntity {
  blocks: number;
  points: number;
  steals: number;
  assists: number;
  game_id: string;
  minutes?: string | null;
  rebounds: number;
  turnovers: number;
  field_goals_att: number;
  free_throws_att: number;
  field_goals_made: number;
  free_throws_made: number;
  three_points_att: number;
  three_points_made: number;
  defensive_rebounds: number;
  offensive_rebounds: number;
}

export interface Entity {
  id: string;
  object: string;
  name: string;
  league: string;
  is_simulated: boolean;
  image_url: string;
  current_team_id: string;
  height: number;
  status: string;
  weight: number;
  college: string;
  position: string;
  birthdate: string;
  last_name: string;
  first_name: string;
  rookie_year?: number | null;
  current_team: string;
  jersey_number: string;
  preferred_name: string;
  updated_at: number;
}

export interface GamesEntity {
  id: string;
  object: string;
  name: string;
  league: string;
  is_simulated: boolean;
  scheduled_start: number;
  amount_completed?: number | null;
  status: string;
  state: State;
  updated_at: number;
}

export interface State {
  home: HomeOrAway;
  away: HomeOrAway;
  clock?: string | null;
  quarter?: number | null;
}

export interface HomeOrAway {
  team_id: string;
  points?: number | null;
}
