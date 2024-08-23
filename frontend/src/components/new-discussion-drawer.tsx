import { useState } from "react";
import MarkdownEditor from "@/components/markdown-editor";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  IconButton,
  Spacer,
  VStack,
  useBreakpointValue
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiMaximize2, FiMinimize2 } from "react-icons/fi";

interface NewDiscussionDrawerProps extends DrawerProps {
  pageName: string;
  content: string;
  setContent: (content: string) => void;
  onOKCallback: () => void;
}

const NewDiscussionDrawer: React.FC<NewDiscussionDrawerProps> = ({
  pageName,
  content,
  setContent,
  onOKCallback,
  ...drawerProps
}) => {
  const [fullHeight, setFullHeight] = useState<boolean>(false);
  const _width = useBreakpointValue({ base: "100%", md: "60%" })
  const { t } = useTranslation();

  return (
    <Drawer 
      placement="bottom"
      blockScrollOnMount={false}
      closeOnOverlayClick={false}
      isFullHeight={fullHeight}
      {...drawerProps}
    >
      <DrawerOverlay />
      <DrawerContent
        width={fullHeight ? "100%" : _width}
        margin={"0 auto"}
        rounded={"lg"}
      >
        <Flex>
          <DrawerHeader flex="1">
            {t(`${pageName}.drawer.title`)}
          </DrawerHeader>
          <Spacer />
          <IconButton
            aria-label="Full Height"
            variant="ghost"
            icon={fullHeight ? <FiMinimize2 /> : <FiMaximize2 />}
            onClick={() => setFullHeight(current => !current)}
            size="lg"
          />
          <IconButton
            aria-label="Close Drawer"
            variant="ghost"
            size="lg"
            icon={<FiChevronDown />}
            onClick={drawerProps.onClose}
          />
        </Flex>
        <DrawerBody>
          <MarkdownEditor
            content={content}
            resize="none"
            h="100%"
            onContentChange={(content) => {
              setContent(content);
            }}
          />
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={drawerProps.onClose}>
            {t(`${pageName}.drawer.cancel`)}
          </Button>
          <Button colorScheme="blue" onClick={onOKCallback} ml={3}>
            {t(`${pageName}.drawer.submit`)}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewDiscussionDrawer;
