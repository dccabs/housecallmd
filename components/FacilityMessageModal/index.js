import { useContext, useEffect, useState } from 'react'
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Modal,
  TextField,
} from '@material-ui/core'
import { SnackBarContext } from 'components/SnackBar'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '../../utils/initSupabase'
const NEXT_PUBLIC_SUPABASE_STORAGE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  success: {
    color: '#008000',
    fontStyle: 'italic',
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  buttonLinks: {
    '@media screen and (max-width: 700px)': {
      '&:nth-child(2)': {
        order: -1,
      },
    },

    '& button': {
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const MessageModal = ({
  title,
  senderId,
  recipientId,
  patientId,
  patientName,
  open,
  onClose,
  callbackFn,
  notificationNumber,
}) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [imageData, setImageData] = useState({})
  const [isImageUploadSuccess, setIsImageUploadSuccess] = useState(false)

  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()

  const sendMessage = () => {
    const payload = {
      // created_at: new Date(),
      sender: senderId,
      recipient: recipientId,
      patient_id: patientId,
      message,
      viewed_by_recipient: false,
    }
    setLoading(true)

    fetch('/api/addFacilityMessage', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        onClose()
        callbackFn()
        if (data) {
          if (data.sentToHouseCall) {
            sendSMSToHouseCall(data)
          }
          openSnackBar({
            message: 'Message successfully sent',
            // error: 'error',
          })
          onClose()
        } else {
          openSnackBar({
            message: 'There was an error.  Please try again later',
            error: 'error',
          })
        }
      })
  }

  const sendSMSToHouseCall = async (data) => {
    const { facilityData } = data
    const message = `${facilityData[0].name} has just sent you a message. Please login to the portal to see it.`

    await fetch('/api/getPhoneNumbers', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const activePhones = data.filter((phone) => {
          return phone.isActive
        })

        const phones = activePhones.map((phone) => {
          return phone.phoneNumber
        })

        phones.forEach(async (phone) => {
          try {
            await fetch('/api/sendMessage', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: phone,
                body: message,
              }),
            })
          } catch (err) {
            throw err
          }
        })
      })
      .catch((error) => {
        openSnackBar({ message: error.toString(), snackSeverity: 'error' })
      })
  }

  const handleAdd = (args) => {
    const { val, type } = args
    if (type === 'fileUpload') {
      uploadPhoto(args)
      return false
    }

    const newImageData = {
      ...imageData,
    }
    setIsImageUploadSuccess(true)
    setImageData(newImageData)
  }

  const uploadPhoto = async (args) => {
    console.log('args', args)
    const { val } = args
    const type = val.type.split('/')[1]
    const uuid = uuidv4()
    const photo = val

    // set loading true
    setImageData({
      ...imageData,
      loading: true,
    })
    const { data, error } = await supabase.storage
      .from('card-information')
      .upload(`facility-message-images/${uuid}.${type}`, photo, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      setImageData({
        ...imageData,
        loading: false,
      })

      return error
      // return res.status(401).json({ error: error.message })
    } else {
      const newFormData = {
        ...imageData,
        loading: false,
        value: data.Key,
      }
      setImageData(newFormData)
      saveImageKeyData(newFormData?.value)
      setIsImageUploadSuccess(true)
    }
  }

  const saveImageKeyData = async (data) => {
    fetch('/api/addFacilityMessagesMediaUrl', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.error) {
          throw Error(data.error)
        } else {
          console.log('Image Url successfully save')
        }
      })
      .catch((error) => {
        openSnackBar({ message: error.toString(), snackSeverity: 'error' })
      })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          backgroundColor: '#fff',
          maxWidth: 700,
          width: '90%',
          margin: '10% auto',
          padding: 40,
          borderRadius: 10,
        }}
      >
        <Typography
          variant="h5"
          className={classes.h2}
          style={{ marginBottom: '1em' }}
        >
          <div>{title}:</div>
          {patientId && <div style={{ marginTop: 20 }}>{patientName}</div>}
        </Typography>
        {notificationNumber && (
          <Typography variant="body" className={classes.h2}>
            <div style={{ marginBottom: '1em' }}>
              A sms notification will be sent to{' '}
              <strong>{notificationNumber}</strong>.
            </div>
          </Typography>
        )}
        <TextField
          placeholder="Type your message here and click to send button."
          multiline
          rows={8}
          maxRows={8}
          fullWidth
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <Box mb="1em" mt="1em">
          <Button
            size="small"
            variant="contained"
            color="primary"
            component="label"
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                handleAdd({
                  val: e.target.files[0],
                  type: 'fileUpload',
                })
              }
            />
          </Button>
        </Box>
        {isImageUploadSuccess && (
          <Box>
            <Typography className={classes.success} variant="body2">
              *Image uploaded successfully
            </Typography>
          </Box>
        )}
        <Box mt="2em">
          <Button
            disabled={!message || loading}
            onClick={sendMessage}
            style={{ marginTop: '1em' }}
            size="small"
            variant="contained"
            color="secondary"
          >
            Send Message
          </Button>
        </Box>
        <div>
          {loading && (
            <Box
              my="2em"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <span style={{ marginRight: 10 }}>Sending Message</span>{' '}
              <CircularProgress />
            </Box>
          )}
        </div>
      </Box>
    </Modal>
  )
}

export default MessageModal
