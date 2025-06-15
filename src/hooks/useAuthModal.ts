
import { useState } from "react";

export function useAuthModal() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAgencyAuthModalOpen, setIsAgencyAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const openAgencyAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setIsAgencyAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  const closeAgencyAuthModal = () => setIsAgencyAuthModalOpen(false);

  return {
    isAuthModalOpen,
    isAgencyAuthModalOpen,
    authMode,
    openAuthModal,
    openAgencyAuthModal,
    closeAuthModal,
    closeAgencyAuthModal,
  };
}
