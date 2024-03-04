interface ActionBarBtnProps {
  className?: string;
  onClick: () => void;
  icon: string;
  text?: string;
  iconClassName?: string;
}

const ActionBarBtn: React.FC<ActionBarBtnProps> = ({
  onClick,
  className = "is-primary is-small",
  icon,
  text,
  iconClassName,
}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && (
        <span className={`icon ${iconClassName}`}>
          <i className={icon} />
        </span>
      )}
      {text && <span>{text}</span>}
    </button>
  );
};

export default ActionBarBtn;
