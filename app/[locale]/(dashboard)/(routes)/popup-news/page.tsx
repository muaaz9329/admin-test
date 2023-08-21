"use client";

import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { buttonVariants } from "@/components/ui/button";
import { ListItem } from "@/components/ui/list-item";
import { NavLink } from "@/components/ui/nav-link";

export default function PopupNews() {
  return (
    <div>
      <NavLink href="/popup-news/add" className={buttonVariants()}>
        Add a popup news
      </NavLink>

      <ListItem className="">
        <span>lorem</span>
        <span>ipsum</span>
        <ActionsDropdown onEdit={() => {}} />
      </ListItem>
    </div>
  );
}
