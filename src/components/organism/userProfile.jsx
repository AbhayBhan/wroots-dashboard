import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { auth } from "@/services/firebaseConfig";
import { signOut } from 'firebase/auth';

const UserProfile = () => {
  const {name, email} = JSON.parse(localStorage.getItem('userdata')) || {name : "User", email : "usermail"};
  const navigate = useNavigate();
  const signout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate('/login');
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/wraeapp.appspot.com/o/user%20(1).png?alt=media&token=aaa47440-c97b-4ad8-bf3c-1f0aacb777f6" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
