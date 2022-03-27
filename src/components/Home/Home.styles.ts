import styled, { css } from 'styled-components/native'

export const StyledHome = styled.View`
	${({theme}) => css`
		background: ${theme.background};
		height: 100%;
		padding: 25px 0;
	`}
`