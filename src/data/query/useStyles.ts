import { ch } from "~/config/common"
import useColor from "~/data/query/useColor"

function useStyles() {
    const colors = useColor()
    const styles = {
        tab: {
            tab: {
              background: 'transparent',
              borderBottomWidth: 1.5,
              color: ch(colors.primary, 50),
              paddingBlock: '1.3rem',
              ':hover': {
                background: ch(colors.primary, 2),
              },
              '&[data-active]': {
                color: colors.primary
              }
            },
            tabsList: {
              borderBottomColor: ch(colors.primary, 10),
              borderBottomWidth: 1.5,
            },
        },
        accordion: {
          control: {
            background: 'transparent',
            borderBottomWidth: 1.5,
            color: colors.primary,
            paddingBlock: '0.2rem',
            ':hover': {
              background: ch(colors.primary, 2),
            },
          },
          item: {
            borderBottomColor: ch(colors.primary, 10),
            borderBottomWidth: 1.5,
            
          },
          panel: {
            fontSize: '0.9rem',
            color: ch(colors.primary, 50)
          }
      }
    }

    return styles
}

export default useStyles
