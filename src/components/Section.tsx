import React from 'react'
import { Typography, Card, CardContent, styled } from '@mui/material'

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(3),
}))

export const Section: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <>
      <Typography variant="h6" margin={3}>
        {title}
      </Typography>
      <StyledCard>
        <CardContent>{children}</CardContent>
      </StyledCard>
    </>
  )
}
