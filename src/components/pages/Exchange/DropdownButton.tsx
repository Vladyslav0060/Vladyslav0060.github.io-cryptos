const buttonLabel = (symbol: any) => {
  return (
    <div className="exchange-label">
      {symbol?.id.toUpperCase() + "(" + symbol?.symbol.toUpperCase() + ") ▼"}
    </div>
  );
};
interface IProps {
  symbol: any;
  modalsOpened: any;
  setModalsOpened: any;
  isFirstSymbol: boolean;
}

const DropdownButton = (props: IProps) => {
  const { symbol, modalsOpened, setModalsOpened, isFirstSymbol } = props;
  const onClick = () => {
    setModalsOpened((prevState: any) =>
      isFirstSymbol
        ? { ...prevState, first: !modalsOpened.first }
        : {
            ...prevState,
            second: !modalsOpened.second,
          }
    );
  };
  return <button onClick={onClick}>{buttonLabel(symbol)}</button>;
};

export default DropdownButton;
