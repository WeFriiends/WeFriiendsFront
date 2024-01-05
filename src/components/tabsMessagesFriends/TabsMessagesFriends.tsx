import * as React from 'react'
import { Tab, Tabs, Box } from '@mui/material'
import Messages from './Messages'
import Friends from './Friends'
import { UserProfileData } from '../../types/UserProfileData'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface TabsMessagesFriendsProps {
  onClick: (userProfileData: UserProfileData) => void
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <div>
      {value === index && (
        <Box
          sx={{
            padding: '30px 0',
            height: '80vh',
            overflowY: 'scroll',
          }}
        >
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  )
}

const TabsMessagesFriends: React.FC<TabsMessagesFriendsProps> = ({
  onClick,
}) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Messages" />
        <Tab label="Friends" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Messages />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Friends onClick={onClick} />
      </TabPanel>
    </Box>
  )
}

export default TabsMessagesFriends
