export interface IFetchedData {
  id: number;
  name: string;
  color: string;
}
export interface IAccessibility {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IMenuToggleProps {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
export interface IContactMe {
  opened: boolean;
  nModal: number;
  symbols: any;
  currentSymbol: any;
  setCurrentSymbol: any;
  setOpened: React.Dispatch<
    React.SetStateAction<{
      first: boolean;
      second: boolean;
    }>
  >;
}
export interface ICoinRequest {
  id: string;
  name: string;
  symbol: string;
  total_volume: number;
  market_cap: number;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}
export interface IAntTableProps {
  fetchedData: ICoinRequest[];
  searchField: any;
  setSearchField: any;
}
