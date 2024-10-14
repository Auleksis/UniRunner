import s from "./ContextMenu.module.css";

export enum MenuItemType {
  input,
  button,
}

interface MenuItemProps extends React.ComponentProps<"button"> {
  menuItemType: MenuItemType;
  text: string;
  svg: React.ReactNode;
}

const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  menuItemType,
  text,
  svg,
  ...buttonProps
}) => {
  return (
    <button className={s.menu_item_div} {...buttonProps}>
      <div className={s.svg_div}>
        {svg}
        <hr className={s.vertical_line}></hr>
      </div>
      <p className={s.invert_subtext}>{text}</p>
    </button>
  );
};
