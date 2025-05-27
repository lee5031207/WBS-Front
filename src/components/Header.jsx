import { Box, Flex, Spacer, Tab, TabList, Tabs } from '@chakra-ui/react';
import ProjectList from '../features/project/ProjectList';
import MyInfo from '../features/user/MyInfoModal';

const Header = ({onchangeTabs}) => {

    //const [selectedTab, setSelectedTab] = useState(0); // Tabs의 선택된 Index 상태

    return (
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2' m='3'>
                <ProjectList />
            </Box>
            <Box p='2' m='3'>
                {/*<Heading size='md'>Project WBS App</Heading>*/}
                {/*<img src="/appLogo.png" alt="PlanSync 로고" width={150} />*/}
            </Box>
            <Tabs colorScheme='cyan' onChange={(index) => onchangeTabs(index)}>
                <TabList>
                    <Tab>프로젝트 세부 정보</Tab>
                    <Tab>프로젝트 WBS</Tab>
                </TabList>
            </Tabs>
            <Spacer />
            <MyInfo />
        </Flex>
    )   
}

export default Header;