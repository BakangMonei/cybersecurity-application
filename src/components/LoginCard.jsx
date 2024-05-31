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
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { loginUser, verifyOTP } from "../utils/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [uid, setUid] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const { email, password } = formFields;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
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
    if (!isCaptchaVerified) {
      alert("Verify you're human");
      return;
    }

    const user = await loginUser(email, password);
    if (user) {
      setUid(user.uid);
      onOpen();
    }
  };

  const handleOtpSubmit = async () => {
    const isVerified = await verifyOTP(uid, otp);
    if (isVerified) {
      alert("OTP verified successfully!");
      navigate("/dashboard");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        maxW={"lg"}
        py={12}
        px={6}
        border={"1px solid"}
        borderColor={"gray.300"}
        borderRadius={"10px"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="md"
      >
        <Stack spacing={4}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Login
            </Heading>
          </Stack>
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

          <Stack spacing={4}>
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
              Login
            </Button>
            <Link to="/signup" color={"blue.500"}>
              Sign Up
            </Link>
            <ReCAPTCHA
              sitekey="6LcgtOIfAAAAAPKY4tPJouA-7ujrn7IHYJNvuOk6"
              onChange={verifyCaptcha}
              onExpired={resetCaptcha}
            />
          </Stack>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>OTP</FormLabel>
              <Input
                type="text"
                placeholder="Enter the OTP"
                value={otp}
                onChange={handleOtpChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleOtpSubmit}>
              Verify OTP
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}