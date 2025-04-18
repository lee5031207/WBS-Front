import { 
    Flex, Heading, Divider ,Spacer, Text, Center, Square, Box,
    Avatar, AvatarBadge, AvatarGroup 
} from '@chakra-ui/react';
import ProjectDrawer from './ProjectDrawer';
import MyInfo from './MyInfoModal';

const Header = () => {
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2' m='3'>
                {/*<Heading size='md'>Project WBS App</Heading>*/}
                <img src="/appLogo.png" alt="PlanSync 로고" width={150} />
            </Box>
            <ProjectDrawer />
            <Spacer />
            <MyInfo />
        </Flex>
    )   
}

export default Header;