import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  Flex,
  Box,
  VStack,
  Image,
} from "@chakra-ui/react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleSignIn from "./GoogleSignIn";
import MetaMaskConnect from "./MetamaskConnect";

const SignInModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="User account"
        onClick={onOpen}
        icon={<FontAwesomeIcon icon={faUser} />}
        isRound={true}
        size="lg"
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <Flex>
            {/* Section 1: Text content */}
            <Box w="60%" p="4">
              <ModalHeader>Sign in</ModalHeader>
              <ModalCloseButton color="white"/>
              <ModalBody>
                <VStack>
                  <MetaMaskConnect />
                  <GoogleSignIn />
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </Box>

            {/* Section 2: Illustrative Image */}
            <Box w="40%" bg="gray.100">
              <Image
                src="1.webp"
                alt="Illustration"
                objectFit="cover"
                w="300p"
                h="300px"
              />
            </Box>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignInModal;
