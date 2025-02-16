import { Box, Button } from '@mui/material'
import React from 'react'
import { styled as muiStyled } from '@mui/material/styles';
export default function CommonTabButton({activeTab,setActiveTab,tabList}:{activeTab?:string,setActiveTab?:any,tabList?:any}) {

    const TabButton = muiStyled(Button, {
        shouldForwardProp: (prop) => prop !== 'active',
      })<{ active?: boolean }>(({ active }) => ({
        color: active ? '#fff' : '#fff',
        background: active ? 'linear-gradient(90deg, #1AB3E5 0%, #034F89 50%, #1AB3E5 100%);' : 'transparent',
        borderRadius: '20px',
        padding: '8px 24px',
        border:active? "1px solid #1AB3E5":"none",
        boxShadow: "0px 4px 4px 0px #00000040",

        '&:hover': {
          backgroundColor: active ? 'rgba(0, 163, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
        },
      }));
  return (
    <Box >
        {tabList.map((item:any)=>{
            return(

                <TabButton
                active={activeTab === item.value}
                onClick={() => setActiveTab(item.value)}
                sx={{ mr: 1 }}
              >
               {item.title}
              </TabButton>

            )
        })}
        {/* <TabButton
          active={activeTab === 'self'}
          onClick={() => setActiveTab('self')}
          sx={{ mr: 1 }}
        >
          Self Earning
        </TabButton>
        <TabButton
          active={activeTab === 'team'}
          onClick={() => setActiveTab('team')}
        >
          Team Reward
        </TabButton> */}
      </Box>
  )
}
