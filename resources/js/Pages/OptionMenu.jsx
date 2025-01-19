import React from 'react'
import WifiIcon from '@mui/icons-material/Wifi';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BoltIcon from '@mui/icons-material/Bolt';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AppsIcon from '@mui/icons-material/Apps';
import GridViewIcon from '@mui/icons-material/GridView';

function OptionMenu() {
  return (
    <div>
        <div className='flex my-4 gap-8 h-auto w-auto items-start justify-center'>
            <div className='flex flex-col  justify-start items-center w-30'>
                <WifiIcon color='primary' fontSize='large'/>
                <div className='pt-4 '>
                    <p className='text-center font-semibold'>Paket Data</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-20'>
                <SignalCellularAltIcon sx={{ color: 'red' }} fontSize='large'/>
                <div className='pt-4'>
                    <p className='text-center font-semibold'>Pulsa Prabayar</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-20'>
                <BoltIcon sx={{ color: 'green' }} fontSize='large'/>
                <div className='pt-4'>
                    <p className='text-center font-semibold'>Token Listrik</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-20'>
                <SportsEsportsIcon color='primary' fontSize='large'/>
                <div className='pt-4'>
                    <p className='text-center font-semibold'>Top Up Game</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-20'>
                <MedicalInformationIcon sx={{ color: 'green' }} fontSize='large'/>
                <div className='pt-4'>
                    <p className='text-center font-semibold'>BPJS Kesehatan</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-20'>
                <AppShortcutIcon sx={{ color: 'gray' }} fontSize='large'/>
                <div className='pt-4'>
                    <p className='text-center font-semibold'>Aplikasi Premium</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-20'>
                <AccountBalanceWalletIcon color='primary' fontSize='large'/>
                <div className='pt-4'>
                    <p className='text-center font-semibold'>E-wallet</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-30'>
                  <GridViewIcon style={{ color:'gray',fontSize: '40px' }} className='rounded rounded-xl bg-slate-200 p-1' />
                <div className='pt-3'>
                    <p className='text-center font-semibold'>Semua menu</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OptionMenu
