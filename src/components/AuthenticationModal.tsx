import "./AuthenticationModal.scss";
import { ArrowRightToSquare, PersonPlus } from "@gravity-ui/icons";
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
} from "@heroui/react";
import { signUp, login } from "../services/firebase-auth";
import { useState } from "react";

type AuthenticationModalProps = {
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AuthenticationModal({
  setOpenAuthModal,
}: AuthenticationModalProps) {
  type AuthType = "signup" | "login" | "signedup" | "loggedin";

  const [type, setType] = useState<AuthType>("signup");
  const titles: Record<AuthType, string> = {
    signup: "Sign Up",
    login: "Log In",
    signedup: "Your account has been created!",
    loggedin: "Logged In  Successfully",
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      setLoginError("");
      try {
        await signUp(email, password);
        setOpenAuthModal(false);
        setType("signedup");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setOpenAuthModal(false);
      setType("loggedin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("auth/invalid-credential")) {
          setLoginError("Invalid email or password.");
        }
      }
    }
  };

  return (
    <div
      className={
        type === "signup"
          ? "auth-modal-container py-12"
          : "auth-modal-container px-8 py-12"
      }
    >
      <p className="text-xl font-bold">{titles[type]}</p>

      {/* ---------------------------Signup Form --------------------------- */}

      {type === "signup" && (
        <div className="auth-modal">
          <Form
            className="flex flex-col gap-5"
            render={(props) => <form {...props} data-custom="foo" />}
            onSubmit={handleSignup}
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
              <Input placeholder="Enter your password" />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>
            <div className="flex gap-2">
              <Button type="submit" variant="primary">
                <PersonPlus />
                Sign Up
              </Button>
            </div>
          </Form>
          <Separator />
          <div className="flex items-center gap-3 justify-center">
            <p>Already have an account?</p>
            <Button variant="primary" onClick={() => setType("login")}>
              Log In
            </Button>
          </div>
        </div>
      )}

      {/* ---------------------------Login Form --------------------------- */}

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
            <div className="flex gap-2">
              <Button type="submit" variant="primary">
                <ArrowRightToSquare />
                Login
              </Button>
              <Button variant="tertiary">Forgot Password?</Button>
            </div>
          </Form>
          <ErrorMessage>{loginError}</ErrorMessage>
          <Separator />
          <div className="flex items-center gap-3 justify-center">
            <p>Not registered yet?</p>
            <Button variant="primary" onClick={() => setType("signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      )}

      {/* ---------------------------Post Signup Message --------------------------- */}

      {type === "signedup" && (
        <div className="auth-modal w-full justify-center items-center text-center gap-5">
          <p>
            Verication email has been sent to your inbox. Please verify your
            email
          </p>
          <Button variant="primary" onClick={() => setOpenAuthModal(false)}>
            Close
          </Button>
        </div>
      )}

      {/* ---------------------------Post Login Message --------------------------- */}

      {type === "loggedin" && (
        <div className="auth-modal w-full justify-center items-center text-center gap-5">
          <p>You have successfully logged in!</p>
          <Button variant="primary" onClick={() => setOpenAuthModal(false)}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
