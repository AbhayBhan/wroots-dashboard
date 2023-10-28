import * as React from "react"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/organism/spinner";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/authentication";

import { auth } from "@/services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export function UserAuthForm({ className, ...props }) {
	const navigate = useNavigate();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

	const {mutate} = useMutation(login, {
		onSuccess : ({data}) => {
			localStorage.setItem('userdata', JSON.parse(data.recruiter));
			navigate("/");
		}
	});

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setIsLoading(false);
        mutate({recruiterEmail : email});
      })
      .catch((err) => {
        console.log(err.message)
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
							value={password}
              placeholder="Enter your Password"
							onChange={(e) => setPassword(e.target.value)}
              type="password"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In
          </Button>
        </div>
      </form>
    </div>
  )
}