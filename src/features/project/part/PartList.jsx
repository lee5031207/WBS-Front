import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text } from '@chakra-ui/react'
import { useState } from "react";

const PartList = ({ parts }) => {

    const [partList, setPartList] = useState(parts);

    return (
        <Card maxW='sm' m='10'>
            <CardHeader>
                <Heading size='md'>프로젝트 Part</Heading>
            </CardHeader>
            {partList}
            
            {/* Part암것도 없어서 에러발생 ?
            {partList.map((elm, idx) => (
                <CardBody key={idx}>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            {elm.partNm}
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                            {elm.partDesc}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            ))} */}
        </Card>
    )
}

export default PartList;