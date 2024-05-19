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
    BorderProps,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import {
    ViewIcon,
    ViewOffIcon,
    CheckCircleIcon,
    WarningIcon,
  } from "@chakra-ui/icons";
  import { ColorModeSwitcher } from "../ColorModeSwitcher";
  import ReCAPTCHA from "react-google-recaptcha";
  import { useNavigate } from "react-router-dom";
  import { checkPasswordStrength } from "../utils/passwordChecker.utils";
  
  const defaultFormFields = {
    email: "",
    password: "",
  };
  
  export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [isCaptchaVerified, setCaptchaVerified] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
  
    let navigate = useNavigate();
    const { email, password } = formFields;
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Call your login API or function here
      // For example:
      // await loginAPI(email, password);
      // navigate("/dashboard");
    };
  
    // Check password strength
    if (password.length > 0) {
      strength = checkPasswordStrength(password);
      setPasswordStrength(strength.totalPoints);
    }
  
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Grid
          templateColumns="repeat(1, 1fr)"
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
                  Login <ColorModeSwitcher />
                </Heading>
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
  
          <GridItem colSpan={2}>
            <Stack spacing={4}>
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
            <Link to="/login" color={"red.500"}>
              Forgot Password
            </Link>
          </GridItem>
        </Grid>
      </Flex>
    );
  }
  