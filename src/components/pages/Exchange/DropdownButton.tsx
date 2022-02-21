const buttonLabel = (symbol: any) => {
  return (
    <>{symbol?.id.toUpperCase() + "(" + symbol?.symbol.toUpperCase() + ") ▼"}</>
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
