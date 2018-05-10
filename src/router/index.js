import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import FoundWallet from '@/components/FoundWallet'
import ImportWallet from '@/components/ImportWallet'
import MnemonicWords from '@/components/MnemonicWords'
import ConfirmWords from '@/components/ConfirmWords'
import Wallet from '@/components/Wallet'
import TransferNotice from '@/components/TransferNotice'
import WalletSet from '@/components/WalletSet'
import WalletRecord from '@/components/WalletRecord'
import WalletUser from '@/components/WalletUser'
import WalletRegion from '@/components/WalletRegion'
import WalletInfo from '@/components/WalletInfo'
import WalletHelp from '@/components/WalletHelp'
import trend from '@/components/trend'
import AddAssets from '@/components/AddAssets'
import WalletDetails from '@/components/WalletDetails'
import BuildUser from '@/components/BuildUser'


Vue.use(Router)

export default new Router({
  // mode:'history',
  // base:'/src/',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: HomePage
    },
    {
      path: '/add',
      name: 'add',
      component: FoundWallet
    },
    {
      path: '/import',
      name: 'import',
      component: ImportWallet
    },
    {
      path: '/helpwords',
      name: 'helpwords',
      component: MnemonicWords
    },
    {
      path: '/confirmwords',
      name: 'confirmwords',
      component: ConfirmWords
    },
    {
      path: '/wallet/:id',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/notice',
      name: 'notice',
      component: TransferNotice
    },
    {
      path: '/setting',
      name: 'setting',
      component: WalletSet
    },
    {
      path: '/records',
      name: 'records',
      component: WalletRecord
    },
    {
      path: '/users',
      name: 'users',
      component: WalletUser
    },
    {
      path: '/setup',
      name: 'setup',
      component: WalletRegion
    },
    {
      path: '/about',
      name: 'about',
      component: WalletInfo
    },
    {
      path: '/help',
      name: 'help',
      component: WalletHelp
    },
    {
      path: '/trend',
      name: 'trend',
      component: trend
    },
    {
      path: '/assets',
      name: 'assets',
      component: AddAssets
    },
    {
      // path: '/details/:id/:assetName',
      path: '/details',
      name: 'details',
      component: WalletDetails
    },
    {
      path: '/adduser',
      name: 'adduser',
      component: BuildUser
    },
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
