import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Progress,
  useColorModeValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ViewIcon,
  ViewOffIcon,
  CheckCircleIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

import { signUpUser, checkIfEmailExists } from "../utils/firebase.utils";
import { checkPasswordStrength } from "../utils/passwordChecker.utils";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  phonenumber: "",
};

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);

  let navigate = useNavigate();
  const { email, username, password, confirmPassword, phonenumber } =
    formFields;
  let strength = {
    eightCharacter: false,
    upperCase: false,
    digit: false,
    lowerCase: false,
    specialCharacter: false,
    totalPoints: 0,
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const verifyCaptcha = () => {
    setCaptchaVerified(true);
  };

  const resetCaptcha = () => {
    setCaptchaVerified(false);
  };

  //method that is called when we submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    //check if the password satisfies all the strength rules
    if (
      strength.eightCharacter === false ||
      strength.upperCase === false ||
      strength.digit === false ||
      strength.lowerCase === false ||
      strength.specialCharacter === false
    ) {
      alert(`All password rules must be satisfied`);
      return;
    }

    //check if the passwords do not match
    if (password.length > 0 && password !== confirmPassword) {
      setShowPasswordMatch(true);
      return;
    }

    //check if the passwords match
    if (password === confirmPassword) {
      setShowPasswordMatch(false);
    }

    //check the captch has been verified
    if (!isCaptchaVerified) {
      alert(`Verify you're human`);
      return;
    }

    //check if the username exists
    const exists = await checkIfEmailExists(email);

    if (exists) {
      alert("Email already exists");
    } else {
      try {
        const doc = await signUpUser({ email, username, password });
        if (doc) {
          alert(
            "Registration successful! Please check your email for verification."
          );
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //check the password strength
  if (password.length > 0) {
    strength = checkPasswordStrength(password);
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        maxW={"lg"}
        py={12}
        px={6}
        border={"1px solid"}
        borderColor={"gray.300"}
        borderRadius={"10px"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="md"
      >
        <GridItem colSpan={2}>
          <Stack spacing={4}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Register
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Please Enter your details
                <ColorModeSwitcher />
              </Text>
            </Stack>
          </Stack>
        </GridItem>

        <GridItem>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                required={true}
                value={password}
                placeholder="Enter password"
                onChange={handleInputChange}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              required
              placeholder="Enter username"
              value={username}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={handleInputChange}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowConfirmPassword(
                      (showConfirmPassword) => !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl id="phonenumber" isRequired>
            <FormLabel>phonenumber</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              required
              placeholder="Enter PhoneNumber"
              value={phonenumber}
              onChange={handleInputChange}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Stack spacing={4}>
            {showPasswordMatch ? (
              <Text fontSize={"sm"} color={"red.600"}>
                Passwords do not match!
              </Text>
            ) : (
              ""
            )}

            <Progress
              value={strength.totalPoints}
              colorScheme={
                strength.totalPoints < 50
                  ? "red"
                  : strength < 65
                  ? "orange"
                  : strength < 85
                  ? "yellow"
                  : "green"
              }
            />

            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <Text fontSize={"xs"}>
                8+ Characters{" "}
                {strength.eightCharacter === true ? (
                  <CheckCircleIcon color="green.500" />
                ) : (
                  <WarningIcon color="red.500" />
                )}
              </Text>
              <Text fontSize={"xs"}>
                Uppercase letters{" "}
                {strength.upperCase === true ? (
                  <CheckCircleIcon color="green.500" />
                ) : (
                  <WarningIcon color="red.500" />
                )}
              </Text>
              <Text fontSize={"xs"}>
                Lowercase letters{" "}
                {strength.lowerCase === true ? (
                  <CheckCircleIcon color="green.500" />
                ) : (
                  <WarningIcon color="red.500" />
                )}
              </Text>
              <Text fontSize={"xs"}>
                Special Character{" "}
                {strength.specialCharacter === true ? (
                  <CheckCircleIcon color="green.500" />
                ) : (
                  <WarningIcon color="red.500" />
                )}
              </Text>
              <Text fontSize={"xs"}>
                Contains digits{" "}
                {strength.digit === true ? (
                  <CheckCircleIcon color="green.500" />
                ) : (
                  <WarningIcon color="red.500" />
                )}
              </Text>
            </Grid>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>

            <Link to="/login" color="blue">
              Click To Login
            </Link>

            <Stack>
              <ReCAPTCHA
                sitekey="6LcgtOIfAAAAAPKY4tPJouA-7ujrn7IHYJNvuOk6"
                onChange={verifyCaptcha}
                onExpired={resetCaptcha}
              />
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Flex>
  );
}