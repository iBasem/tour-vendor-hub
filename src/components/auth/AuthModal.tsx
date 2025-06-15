
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SocialAuth } from "./SocialAuth";
import { AuthForm } from "./AuthForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
  userType?: "traveler" | "agency";
}

export function AuthModal({ isOpen, onClose, initialMode = "signin", userType = "traveler" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const navigate = useNavigate();

  const handleFormSubmit = (formData: any) => {
    console.log("Auth attempt:", { mode, userType, ...formData });
    
    if (userType === "agency") {
      navigate("/dashboard");
    } else if (userType === "traveler") {
      navigate("/traveler/dashboard");
    }
    
    onClose();
  };

  const handleGoogleAuth = () => {
    console.log("Google auth attempt:", { mode, userType });
    
    if (userType === "agency") {
      navigate("/dashboard");
    } else if (userType === "traveler") {
      navigate("/traveler/dashboard");
    }
    
    onClose();
  };

  const switchMode = (newMode: "signin" | "signup") => {
    setMode(newMode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-white">
            {mode === "signin" ? "Welcome back" : "Create Account"}
          </DialogTitle>
          <p className="text-center text-gray-400 text-sm">
            {userType === "agency" ? "Travel Agency Portal" : "Traveler Portal"}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          <SocialAuth onGoogleAuth={handleGoogleAuth} />

          <div className="relative">
            <Separator className="bg-gray-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-gray-900 px-3 text-sm text-gray-400">Or continue with email</span>
            </div>
          </div>

          <AuthForm mode={mode} onSubmit={handleFormSubmit} />

          <div className="text-center">
            {mode === "signin" ? (
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => switchMode("signup")}
                  className="text-white hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => switchMode("signin")}
                  className="text-white hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

          <div className="text-center text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
