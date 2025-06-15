import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
  userType?: "traveler" | "agency";
}

export function AuthModal({ isOpen, onClose, initialMode = "signin", userType = "traveler" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication logic
    console.log("Auth attempt:", { mode, userType, email });
    
    // Redirect based on user type
    if (userType === "agency") {
      navigate("/dashboard");
    } else if (userType === "traveler") {
      navigate("/traveler/dashboard");
    }
    
    onClose();
  };

  const handleGoogleAuth = () => {
    console.log("Google auth attempt:", { mode, userType });
    
    // Redirect based on user type
    if (userType === "agency") {
      navigate("/dashboard");
    } else if (userType === "traveler") {
      navigate("/traveler/dashboard");
    }
    
    onClose();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  const switchMode = (newMode: "signin" | "signup") => {
    setMode(newMode);
    resetForm();
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
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="relative">
            <Separator className="bg-gray-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-gray-900 px-3 text-sm text-gray-400">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">Password</Label>
                {mode === "signin" && (
                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Forgot your password?
                  </button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            {mode === "signup" && (
              <div>
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            )}

            <Button type="submit" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
          </form>

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
