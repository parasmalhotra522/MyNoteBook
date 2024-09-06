import { useToast } from '@chakra-ui/react'

const Alert = ({title, description, status}) => {
    const toast = useToast();
    
    const showToast = () => {
        toast({
            position:'top-right',
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true,
        });
    };

  return showToast;
}

export default Alert
