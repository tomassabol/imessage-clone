import {
  Button,
  ButtonGroup,
  Center,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
      /**
       * createusername mutation to send to the graphql API
       */
    } catch (error) {
      console.log("onSubmit error:", error);
      console.error(error);
    }
  };

  return (
    <>
      <Center height="100vh">
        <Stack spacing={8} align="center">
          {session ? (
            <>
              <Text>Create a Username</Text>
              <Input
                placeholder="Enter a username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Button width='100%' onClick={onSubmit}>Save</Button>
            </>
          ) : (
            <>
              <Text fontSize="3xl">MessengerQL</Text>
              <Button
                onClick={() => signIn("google")}
                leftIcon={<Image height="20px" src="/images/googlelogo.png" />}
              >
                Continue with Google
              </Button>
            </>
          )}
        </Stack>
      </Center>
    </>
  );
};

export default Auth;
