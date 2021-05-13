import { sendMailToMe } from "../../utils/sendMailToMe";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // req.body carries all the data

    try {
      const { email, name_, subject, client_message } = req.body;

      if (
        typeof (email || name_ || subject || client_message) === "undefined"
      ) {
        console.log(" ************* Invalid Data received ************ ");

        return res
          .status(400)
          .send({ error: "bad request, missing required data!" });
      } else {
        //  Data received as expected
        try {
          const sendGridResponse = await sendMailToMe(
            "dan@craftbeerexports.com",
            name_,
            subject,
            client_message,
            email
          );

          console.log('sendGridResponse', sendGridResponse)

          return res.status(200).send({
            sg_response: sendGridResponse,
          });
        } catch (err) {
          console.log(
            "ERROR WHILE SENDING MAIL TO *YOU* THROUGH WEB API >> ",
            err
          );

          return res.status(400).send({
            err_message: "bad request",
          });
        }
      }
    } catch (err) {
      console.log("Err while sending Mail through send grid >> ", err);
      return res
        .status(400)
        .send({ error: "Error in sendgrid Service.", errMsg: err });
    }
  }

  res.status(400).send({ error: "bad request" });
}
