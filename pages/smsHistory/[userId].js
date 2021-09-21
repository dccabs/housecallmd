import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SmsHistoryPage from './smsHistoryPage'

const SmsHistory = () => {
  const router = useRouter()
  const { query } = router

  const { userId } = query || {}

  return <SmsHistoryPage userId={userId} />
}

SmsHistory.propTypes = {}
SmsHistory.defaultProps = {}

export default SmsHistory
