'use client';

import { useAuth0 } from "@auth0/auth0-react";
import { useClick, useDismiss, useFloating, useInteractions } from "@floating-ui/react";
import LoginButton from "@/app/components/auth/LoginButton";
import UserOptionsDropdown from "./UserOptionsDropdown";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-end',
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss
  ]);

  return (
    <nav className="w-full flex flex-row justify-between p-4 stretch items-center h-12 bg-slate-50">
      <span>Personal Finance</span>
      <div className="flex flex-row">
        {!isAuthenticated && <LoginButton />}

        {!isLoading && user?.picture &&
          <img
            ref={refs.setReference}
            className="w-8 h-8 m-2 rounded-full"
            src={user.picture}
            alt={user.name}
            {...getReferenceProps()}
          />
        }
        {
          isOpen &&
          <UserOptionsDropdown
            ref={refs.setFloating}
            styles={floatingStyles}
            {...getFloatingProps()}
          />
        }
      </div>
    </nav>
  )
};

export default Navbar;
