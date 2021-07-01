import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Container from '../Container'
import ServicesCard from '../ServicesPage/ServicesCard'

const useStyles = makeStyles((theme) => ({
  content: {
    '& p': {
      maxWidth: '35rem',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '0 6em',
    },
  },
  services: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    maxWidth: '1400px',
  },
}))

const services = [
  {
    EAR: ['Ear infection', 'Swimmer’s ear', 'Earwax (cerumen impaction)'],
  },
  { EYE: ['Conjunctivitis (pinkeye)', 'Stye', 'Corneal abrasion'] },
  { NASAL: ['Nosebleed', 'Allergies', 'Sinus infection', 'Nasal congestion'] },
  {
    DENTAL: [
      'Toothache',
      'Dental abscess',
      'Gingivitis',
      'TMJ disorder',
      'Cold sores/fever blisters',
    ],
  },
  {
    THROAT: [
      'Strep throat',
      'Mononucleosis (mono)',
      'Tonsillitis',
      'Pharyngitis',
      'Sore throat',
    ],
  },
  {
    CHEST: [
      'Bronchitis',
      'Pneumonia',
      'Cough',
      'Influenza',
      'Upper respiratory infection',
      'Asthma',
      'Croup',
    ],
  },
  {
    ABDOMEN: [
      'Nausea & vomiting',
      'Gastroenteritis',
      'Reflux (GERD)',
      'Gastritis & stomach ulcer',
      'Food poisoning',
    ],
  },
  {
    MUSCULOSKELETAL: [
      'Back pain',
      'Neck pain',
      'Trigger points',
      'Sprains & strains',
      'Arthritis',
      'Sciatica',
      'Gout',
    ],
  },
  {
    UROLOGIC: [
      'UTI',
      'Bladder infection',
      'Kidney infection',
      'STDs (chlamydia/gonorrhea, etc.)',
      'Cystitis',
      'Urethritis',
      'Vaginitis',
      'Kidney stones',
    ],
  },
  { NEUROLOGIC: ['Headache', 'Migraine', 'Vertigo', 'Concussion'] },
  {
    SKIN: [
      'Cellulitis',
      'Abscess',
      'Folliculitis',
      'Ringworm',
      'Eczema',
      'Dermatitis',
      'Shingles',
      'Burns',
      'Abrasions',
      'Lacerations',
      'Animal Bites',
      'Insect Bites',
      'Psoriasis',
      'Acne',
      'Warts',
    ],
  },
]

const extraServices = {
  'We also offer the following services: ': [
    'Medical evaluation after minor car accidents',
    'Sports Physicals',
    'Pre-employment Physicals',
    'DOT physical exam (for commercial drivers license)',
    'Suture Placement and Removal',
    'STD screening',
    'Labor & industry injury evaluation and treatment on-site',
  ],
}

const ServicesItems = () => {
  const classes = useStyles()

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box className={classes.services}>
          <>
            {services.map((s, i) => {
              return (
                <ServicesCard
                  key={i}
                  category={Object.keys(s)[0]}
                  condition={s[Object.keys(s)]}
                />
              )
            })}

            <ServicesCard
              category={Object.keys(extraServices)[0]}
              condition={extraServices[Object.keys(extraServices)]}
            />
          </>
        </Box>
      </Box>
    </Container>
  )
}

export default ServicesItems
