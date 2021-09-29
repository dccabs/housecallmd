import sendMessage from './lib/services/sendMessage';

export default async (req, res) => {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    const result = await sendMessage(req);
      
    if (result.success) {
      res.send(result);
    } else {
      res.status(400).send(result);
    }
  } catch (error) {
    console.log(error);
  }
  
}
