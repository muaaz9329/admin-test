import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";

export default function PopupNews() {
  return (
    <div>
      <NavLink href="/popup-news/add" className={buttonVariants()}>
        Add a popup news
      </NavLink>
    </div>
  );
}
