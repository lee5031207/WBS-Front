// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Stack, Text } from '@chakra-ui/react';

const LoginPage = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!loginId || !password) {
      setError('로그인 ID와 비밀번호를 입력해주세요.');
      return;
    }
    
    // 로그인 로직 (API 호출 등)
    try {
      // 예시로 API 호출하고 JWT 받아오는 코드 (추후 추가)
      // const response = await axios.post('/api/login', { loginId, password });
      // 로그인 성공 시 처리 (예: localStorage에 토큰 저장 등)
      console.log('로그인 성공', loginId, password);
    } catch (e) {
      setError('로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt="300px" p={4} boxShadow="lg" borderRadius="md" border="1px solid #ccc">
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="loginId">로그인 ID</FormLabel>
          <Input
            id="loginId"
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="로그인 ID를 입력하세요"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </FormControl>

        {error && <Text color="red.500" fontSize="sm">{error}</Text>}

        <Button bg="brand.200" color="white" _hover={{ bg: 'brand.300' }} onClick={handleLogin}>
          로그인
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
