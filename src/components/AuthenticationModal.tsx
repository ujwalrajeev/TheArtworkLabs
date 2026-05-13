import "./AuthenticationModal.scss";
import {
  ArrowRightToSquare,
  PersonPlus,
  Envelope,
  Xmark,
} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Separator,
  ErrorMessage,
  CloseButton,
} from "@heroui/react";
import {
  signUp,
  login,
  signInWithGoogle,
  forgotPassword,
  updateUserProfile,
  logout,
} from "../services/firebase-auth";
import { useState } from "react";
import { useAuthStore } from "../utils/state-machine";

type AuthenticationModalProps = {
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AuthenticationModal({
  setOpenAuthModal,
}: AuthenticationModalProps) {
  type AuthType =
    | "signup"
    | "login"
    | "signedup"
    | "loggedin"
    | "forgotpassword"
    | "passwordsent"
    | "emailnotverified";

  const [type, setType] = useState<AuthType>("signup");
  const titles: Record<AuthType, string> = {
    signup: "Sign Up",
    login: "Log In",
    signedup: "Your account has been created!",
    loggedin: "Logged In  Successfully",
    forgotpassword: "Forgot Password",
    passwordsent: "Forgot Password",
    emailnotverified: "Email Not Verified",
  };

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      setLoginError("");
      try {
        const userCredential = await signUp(email, password);
        await updateUserProfile({ displayName: fullName });
        setType("signedup");
        useAuthStore.getState().setUser(userCredential.user);
        logout();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await login(email, password);
      if (!userCredential.user.emailVerified) {
        setType("emailnotverified");
        logout();
        return;
      }
      setOpenAuthModal(false);
      useAuthStore.getState().setIsLoggedIn(true);
      useAuthStore.getState().setUser(userCredential.user);
      setType("loggedin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("auth/invalid-credential")) {
          setLoginError("Invalid email or password.");
        }
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      setOpenAuthModal(false);
      setType("loggedin");
      useAuthStore.getState().setIsLoggedIn(true);
      useAuthStore.getState().setUser(userCredential.user);
    } catch (err) {
      console.error("Error signing in with Google:", err);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setType("passwordsent");
    } catch (err) {
      console.error("Error sending password reset email:", err);
    }
  };

  return (
    <div
      className={
        type === "signup"
          ? "auth-modal-container py-12 relative"
          : "auth-modal-container px-8 py-12 relative"
      }
    >
      <CloseButton
        onClick={() => setOpenAuthModal(false)}
        className="absolute top-4 right-4 text-white bg-[var(--color-secondary-accent)] hover:bg-[var(--color-secondary)]"
      />
      <p
        className={
          "font-bold text-wrap" +
          (type === "signup" || type === "login" ? " text-3xl" : " text-xl")
        }
      >
        {titles[type]}
      </p>

      {/* --------------------------- Signup Form --------------------------- */}

      {type === "signup" && (
        <div className="auth-modal">
          <Form
            className="flex flex-col gap-5"
            render={(props) => <form {...props} data-custom="foo" />}
            onSubmit={handleSignup}
          >
            <TextField
              isRequired
              name="fullname"
              type="text"
              validate={(value) => {
                if (value.trim() === "") {
                  return "Please enter your full name";
                }
                return null;
              }}
              onChange={(e) => setFullName(e)}
            >
              <Label>Full Name</Label>
              <Input placeholder="Enter your full name" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
              onChange={(e) => setEmail(e)}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
              onChange={(e) => setPassword(e)}
            >
              <Label>Password</Label>
              <Input placeholder="Choose your password" />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="confirmPassword"
              type="password"
              validate={(value) => {
                if (value !== password) {
                  return "Passwords do not match";
                }
                return null;
              }}
            >
              <Label>Confirm Password</Label>
              <Input placeholder="Confirm your password" />
              <FieldError />
            </TextField>
            <div className="flex gap-2 items-center justify-center mt-5">
              <Button type="submit" variant="primary">
                <PersonPlus />
                Sign Up
              </Button>
              <p>or</p>
              <Button variant="outline" onClick={handleSignInWithGoogle}>
                <img
                  src="/Icons/google.png"
                  alt="Google Logo"
                  className="size-4"
                />
                <p className="text-[var(--color-text-secondary)]">
                  Sign up with Google
                </p>
              </Button>
            </div>
          </Form>
          <Separator />
          <div className="flex items-center gap-3 justify-center">
            <p className="text-[var(--color-text-secondary)]">
              Already have an account?
            </p>
            <Button variant="primary" onClick={() => setType("login")}>
              Log In
            </Button>
          </div>
        </div>
      )}

      {/* --------------------------- Login Form --------------------------- */}

      {type === "login" && (
        <div className="auth-modal">
          <Form
            className="flex flex-col gap-5"
            render={(props) => <form {...props} data-custom="foo" />}
            onSubmit={handleLogin}
          >
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
              onChange={(e) => setEmail(e)}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              onChange={(e) => setPassword(e)}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <FieldError />
            </TextField>
            <div className="flex gap-3 items-center justify-center mt-5">
              <Button type="submit" variant="primary">
                <ArrowRightToSquare />
                Login
              </Button>
              <p>or</p>
              <Button variant="outline" onClick={handleSignInWithGoogle}>
                <img
                  src="/Icons/google.png"
                  alt="Google Logo"
                  className="size-4"
                />
                <p className="text-[var(--color-text-secondary)]">
                  Sign in with Google
                </p>
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                className={"underline underline-offset-4"}
                onClick={() => setType("forgotpassword")}
              >
                Forgot Password?
              </Button>
            </div>
          </Form>
          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
          <Separator />
          <div className="flex items-center gap-3 justify-center">
            <p>Not registered yet?</p>
            <Button variant="primary" onClick={() => setType("signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      )}

      {/* --------------------------- Post Signup Message --------------------------- */}

      {type === "signedup" && (
        <div className="auth-modal w-full justify-center items-center text-center gap-5">
          <p>
            Verification email has been sent to your inbox. Please verify your
            email to login to your account.
          </p>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => setType("login")}>
              Login
            </Button>
            <Button variant="outline" onClick={() => setOpenAuthModal(false)}>
              Need help?
            </Button>{" "}
            {/* FIXME: Go to support page */}
          </div>
        </div>
      )}

      {/* --------------------------- Post Login Message --------------------------- */}

      {type === "loggedin" && (
        <div className="auth-modal w-full justify-center items-center text-center gap-5">
          <p>You have successfully logged in!</p>
          <Button variant="primary" onClick={() => setOpenAuthModal(false)}>
            Close
          </Button>
        </div>
      )}

      {/* --------------------------- Email Not Verified Message --------------------------- */}

      {type === "emailnotverified" && (
        <div className="auth-modal w-full justify-center items-center text-center gap-5">
          <p>
            Your email is not verified. Please check your inbox for a
            verification email. Login again after verifying your email to access
            your account.
          </p>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => setType("login")}>
              Login
            </Button>
            <Button variant="outline" onClick={() => setType("login")}>
              Need help?
            </Button>
            {/* FIXME: Go to support page */}
          </div>
        </div>
      )}

      {/* --------------------------- Forgot Password Form --------------------------- */}

      {type === "forgotpassword" && (
        <div className="auth-modal">
          <p className="text-center">
            To reset your password, please enter your email address and we'll
            send you instructions.
          </p>
          <Form
            className="flex flex-col gap-5"
            render={(props) => <form {...props} data-custom="foo" />}
            onSubmit={handleForgotPassword}
          >
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
              onChange={(e) => setEmail(e)}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>
            <div className="flex gap-3 items-center justify-center mt-5">
              <Button type="submit" variant="primary">
                <Envelope />
                Send Reset Link
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setType("login")}
              >
                <Xmark />
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}

      {/* --------------------------- Post Forgot Password Message --------------------------- */}

      {type === "passwordsent" && (
        <div className="auth-modal w-full justify-center items-center text-center gap-5">
          <p>
            A password reset email has been sent to your inbox if you are a
            registered user.
          </p>
          <Button variant="primary" onClick={() => setOpenAuthModal(false)}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
