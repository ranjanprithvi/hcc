import {
    useDisclosure,
    Button,
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    header: string;
    body: string;
    renderFooter: () => ReactNode;
}

function Modal({ header, body, renderFooter, isOpen, onClose }: Props) {
    return (
        <ChakraModal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>{body}</ModalBody>

                <ModalFooter>{renderFooter()}</ModalFooter>
            </ModalContent>
        </ChakraModal>
    );
}
export default Modal;
