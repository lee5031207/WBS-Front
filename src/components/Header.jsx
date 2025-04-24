import { 
    Flex, Heading, Divider ,Spacer, Text, Center, Square, Box,
    Avatar, AvatarBadge, AvatarGroup 
} from '@chakra-ui/react';
import ProjectDrawer from '../features/project/ProjectDrawer'
import MyInfo from '../features/user/MyInfoModal';

const Header = () => {
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2' m='3'>
                {/*<Heading size='md'>Project WBS App</Heading>*/}
                {/*<img src="/appLogo.png" alt="PlanSync 로고" width={150} />*/}
            </Box>
            <ProjectDrawer name="Project"/>
            <Spacer />
            <MyInfo />
        </Flex>
    )   
}

export default Header;