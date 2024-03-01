interface ActionBarBtnProps {
  className?: string;
  onClick: () => void;
  icon: string;
}

const ActionBarBtn: React.FC<ActionBarBtnProps> = ({
  onClick,
  className = "is-primary is-small",
  icon,
}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      <span className="icon">
        <i className={icon} />
      </span>
    </button>
  );
};

export default ActionBarBtn;
