import React from 'react'

import * as S from './styles'

export const Dashboard: React.FC = () => {
    return (
        <S.Container>
            <S.Header>
                <S.UserWrapper>

                <S.UserInfo>
                    <S.Photo source={{ uri: 'https://avatars.githubusercontent.com/u/64219605?v=4' }}/>
                    <S.User>
                        <S.UserGreeting>Olá, </S.UserGreeting>
                        <S.UserName>Rodrigo</S.UserName>
                    </S.User>
                </S.UserInfo>
                </S.UserWrapper>
            </S.Header>
        </S.Container>
    )
}