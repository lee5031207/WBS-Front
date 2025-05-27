import { Box, Flex, Radio, RadioGroup, Spacer, Text } from '@chakra-ui/react';
const WbsHeader = ({projectId, startDt, endDt, onChangeRadio, onChangeSelect}) => {
    return (
        <>
            <Box m={4}>
                <Flex gap={4} align="center">
                <Spacer />
                <RadioGroup defaultValue='plan'>
                    <Flex gap={4}>
                    <Radio 
                        sx={{
                            '&[data-checked]': {
                                backgroundColor: '#48A6A7',
                                borderColor: '#48A6A7',
                            }
                        }}
                        value='plan'
                        onChange={(e) => {
                            onChangeRadio(e.target.value);
                        }}>
                        계획
                    </Radio>
                    <Radio 
                        sx={{
                            '&[data-checked]': {
                                backgroundColor: '#788CEF',
                                borderColor: '#788CEF',
                            }
                        }} 
                        value='real'
                        onChange={(e) => {
                            onChangeRadio(e.target.value);
                        }}>
                        실적
                    </Radio>
                    </Flex>
                </RadioGroup>
                <Text>프로젝트 기간 : [ {startDt} ~ {endDt} ] </Text>
                </Flex>
            </Box>
        </>
    )
}

export default WbsHeader;