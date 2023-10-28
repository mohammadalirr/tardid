import { useMantineTheme } from '@mantine/core'

function useColor() {
  const theme = useMantineTheme()

  return { 
    primary: theme.colors.primary[9],
    darkSecondary: theme.colors.secondary[8],
    secondary: theme.colors.secondary[6],
    white: '#fff',
  }
}

export default useColor
